
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarCheck, User } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  bio: string | null;
  image_url: string | null;
  contact_number: string | null;
  skill: string | null;
}

interface MenteeProfile {
  selected_mentors: string[] | null;
}

interface Session {
  id: string;
  title: string;
  description: string;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  payment_status: string;
  mentor: {
    first_name: string;
    last_name: string;
  };
}

const MenteeDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [menteeProfile, setMenteeProfile] = useState<MenteeProfile | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

        // Fetch mentee-specific data
        const { data: menteeData, error: menteeError } = await supabase
          .from('mentees')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (menteeError && menteeError.code !== 'PGRST116') {
          // PGRST116 is "no rows returned" which is fine for a new user
          console.error('Error fetching mentee data:', menteeError);
        } else if (menteeData) {
          // Convert the JSON selected_mentors to a string array
          const selectedMentors = menteeData.selected_mentors ? 
            (Array.isArray(menteeData.selected_mentors) ? 
              menteeData.selected_mentors.map(m => String(m)) : 
              [String(menteeData.selected_mentors)]) 
            : [];
            
          setMenteeProfile({
            selected_mentors: selectedMentors
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Fetch sessions for the mentee
  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;

      try {
        setSessionLoading(true);
        
        // Fetch sessions with mentor profiles
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
            mentor_id
          `)
          .eq('mentee_id', user.id)
          .order('scheduled_at', { ascending: true });

        if (error) throw error;

        // Fetch mentor profiles for the sessions
        const sessionsWithMentors = await Promise.all(data.map(async (session) => {
          const { data: mentorData, error: mentorError } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', session.mentor_id)
            .single();
            
          if (mentorError) {
            console.error('Error fetching mentor profile:', mentorError);
            return {
              ...session,
              mentor: {
                first_name: 'Unknown',
                last_name: 'Mentor'
              }
            };
          }
          
          return {
            ...session,
            mentor: {
              first_name: mentorData.first_name,
              last_name: mentorData.last_name
            }
          };
        }));

        setSessions(sessionsWithMentors);
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
  const pendingPaymentSessions = sessions.filter(
    (session) => session.payment_status === 'pending'
  );
  
  const hasSelectedMentors = menteeProfile?.selected_mentors && menteeProfile.selected_mentors.length > 0;

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Mentee Profile</CardTitle>
                <CardDescription>Manage your mentee profile</CardDescription>
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
                    <p className="text-sm text-gray-500">Mentee</p>
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
                <CardTitle>Welcome to Your Mentee Dashboard</CardTitle>
                <CardDescription>
                  Find mentors and manage your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Welcome to MentorConnect! As a mentee, you can connect with experienced mentors
                  to accelerate your learning and career growth. Start by browsing available mentors.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-mentor-primary hover:bg-mentor-primary/90">
                  <Link to="/mentors">Find Mentors</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Pending Payment Sessions */}
            {pendingPaymentSessions.length > 0 && (
              <Card className="border-amber-300">
                <CardHeader className="bg-amber-50 border-b border-amber-200">
                  <CardTitle className="text-amber-800">Pending Payments</CardTitle>
                  <CardDescription className="text-amber-700">
                    Complete payment to confirm these sessions
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {pendingPaymentSessions.map((session) => (
                      <div key={session.id} className="flex justify-between items-center border-b pb-4">
                        <div>
                          <h3 className="font-medium">{session.title}</h3>
                          <p className="text-sm text-gray-500">
                            with {session.mentor.first_name} {session.mentor.last_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(new Date(session.scheduled_at), "MMM d, yyyy h:mm a")}
                          </p>
                        </div>
                        <Button asChild className="bg-amber-500 hover:bg-amber-600">
                          <Link to={`/payment/${session.id}`}>Complete Payment</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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
                        <TableHead>Mentor</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingSessions
                        .filter(session => session.payment_status === 'paid')
                        .map((session) => (
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
                                {session.mentor.first_name} {session.mentor.last_name}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={session.status === 'confirmed' ? 'default' : 'outline'} 
                              className="capitalize"
                            >
                              {session.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You have no upcoming sessions. Book a session with a mentor to get started!</p>
                  </div>
                )}
              </CardContent>
              {upcomingSessions.length === 0 && (
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to="/mentors">Find a Mentor</Link>
                  </Button>
                </CardFooter>
              )}
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Explore Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  {hasSelectedMentors ? (
                    <p className="text-gray-600">You have selected {menteeProfile?.selected_mentors?.length} mentors.</p>
                  ) : (
                    <p className="text-gray-500">Explore learning paths and roadmaps for your tech career.</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open("https://roadmap.sh/", "_blank")}
                  >
                    Show Roadmap
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Learning Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Access helpful resources shared by mentors.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Browse Resources</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MenteeDashboard;
