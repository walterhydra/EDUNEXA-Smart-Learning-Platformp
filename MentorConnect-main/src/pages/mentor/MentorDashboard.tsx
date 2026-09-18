
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { CalendarCheck, User } from 'lucide-react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  bio: string | null;
  image_url: string | null;
  contact_number: string | null;
  skill: string | null;
}

interface MentorProfile {
  expertise: string | null;
}

interface Session {
  id: string;
  title: string;
  description: string;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  payment_status: string;
  mentee: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

const MentorDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [mentorProfile, setMentorProfile] = useState<MentorProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionLoading, setSessionLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Fetch basic profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        setProfile(profileData);

        // Fetch mentor-specific data
        const { data: mentorData, error: mentorError } = await supabase
          .from('mentors')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (mentorError && mentorError.code !== 'PGRST116') {
          // PGRST116 is "no rows returned" which is fine for a new user
          console.error('Error fetching mentor data:', mentorError);
        } else if (mentorData) {
          setMentorProfile(mentorData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Fetch sessions for the mentor
  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;

      try {
        setSessionLoading(true);
        
        // Fetch sessions with mentee profiles
        const { data, error } = await supabase
          .from('sessions')
          .select(`
            id,
            title,
            description,
            scheduled_at,
            duration_minutes,
            status,
            payment_status,
            mentees:mentee_id (
              profiles:id (
                first_name,
                last_name,
                email
              )
            )
          `)
          .eq('mentor_id', user.id)
          .order('scheduled_at', { ascending: true });

        if (error) throw error;

        // Process the data to match our Session interface
        const formattedSessions = data.map((session: any) => ({
          id: session.id,
          title: session.title,
          description: session.description,
          scheduled_at: session.scheduled_at,
          duration_minutes: session.duration_minutes,
          status: session.status,
          payment_status: session.payment_status,
          mentee: {
            first_name: session.mentees?.profiles?.first_name || 'Unknown',
            last_name: session.mentees?.profiles?.last_name || 'Mentee',
            email: session.mentees?.profiles?.email || '',
          },
        }));

        setSessions(formattedSessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setSessionLoading(false);
      }
    };

    fetchSessions();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mentor-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  // Split sessions into upcoming and past
  const currentTime = new Date();
  const upcomingSessions = sessions.filter(
    (session) => new Date(session.scheduled_at) > currentTime
  );
  const pastSessions = sessions.filter(
    (session) => new Date(session.scheduled_at) <= currentTime
  );

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Mentor Profile</CardTitle>
                <CardDescription>Manage your mentor profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {profile?.image_url ? (
                      <img 
                        src={profile.image_url} 
                        alt={`${profile.first_name}'s profile`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl text-gray-500">
                        {profile?.first_name?.charAt(0) || profile?.email?.charAt(0).toUpperCase() || 'M'}
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">
                      {profile?.first_name && profile?.last_name
                        ? `${profile.first_name} ${profile.last_name}`
                        : profile?.email}
                    </h3>
                    <p className="text-sm text-gray-500">Mentor</p>
                    {profile?.skill && (
                      <p className="text-xs text-gray-500 mt-1">{profile.skill}</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/profile">Edit Profile</a>
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-6">
              <Button variant="outline" className="w-full" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Your Mentor Dashboard</CardTitle>
                <CardDescription>
                  Manage your mentoring sessions and connect with mentees here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Welcome to MentorConnect! As a mentor, you'll be able to share your knowledge and experience with aspiring mentees.
                  {!profile?.first_name && !profile?.last_name && (
                    " Complete your profile to get started."
                  )}
                </p>

                {mentorProfile?.expertise && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-700">Your Expertise</h3>
                    <p className="text-gray-600 mt-1">{mentorProfile.expertise}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled mentoring sessions</CardDescription>
                </div>
                <CalendarCheck className="h-5 w-5 text-mentor-primary" />
              </CardHeader>
              <CardContent>
                {sessionLoading ? (
                  <div className="flex items-center justify-center h-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mentor-primary"></div>
                  </div>
                ) : upcomingSessions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Session</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Mentee</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingSessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">{session.title}</TableCell>
                          <TableCell>
                            {format(new Date(session.scheduled_at), "MMM d, yyyy h:mm a")}
                            <div className="text-xs text-gray-500">
                              {session.duration_minutes} minutes
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                              <div>
                                {session.mentee.first_name} {session.mentee.last_name}
                                <div className="text-xs text-gray-500">{session.mentee.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={session.status === 'confirmed' ? 'default' : 'outline'} 
                                className="capitalize"
                              >
                                {session.status}
                              </Badge>
                              <Badge 
                                variant={session.payment_status === 'paid' ? 'default' : 'outline'} 
                                className={`capitalize ${
                                  session.payment_status === 'paid' ? 'bg-green-500 hover:bg-green-600' : 'text-amber-500 border-amber-500'
                                }`}
                              >
                                {session.payment_status}
                              </Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You have no upcoming sessions.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Past Sessions */}
            {pastSessions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Past Sessions</CardTitle>
                  <CardDescription>Your completed mentoring sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Session</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Mentee</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastSessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">{session.title}</TableCell>
                          <TableCell>
                            {format(new Date(session.scheduled_at), "MMM d, yyyy h:mm a")}
                          </TableCell>
                          <TableCell>
                            {session.mentee.first_name} {session.mentee.last_name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {session.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentorDashboard;
