
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BookSession from "@/components/BookSession";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Mentor {
  id: string;
  name: string;
  bio: string;
  image: string;
  rate: string;
  available: boolean;
  skills: string[];
  expertise: string[];
  background: string;
}

const MentorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMentor() {
      if (!id) return;

      try {
        setLoading(true);
        
        // Fetch mentor with profile
        const { data, error } = await supabase
          .from('mentors')
          .select(`
            id,
            expertise,
            profiles:id (
              first_name,
              last_name,
              bio,
              image_url,
              skill
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;

        if (data) {
          const skills = data.profiles?.skill ? 
            data.profiles.skill.split(',').map(skill => skill.trim()) : 
            ["Mentorship"];
            
          const expertise = data.expertise ? 
            data.expertise.split(',').map(exp => exp.trim()) : 
            ["Career Guidance"];

          const mentorData: Mentor = {
            id: data.id,
            name: `${data.profiles?.first_name || ''} ${data.profiles?.last_name || ''}`,
            bio: data.profiles?.bio || "Experienced mentor ready to guide you on your journey.",
            image: data.profiles?.image_url || "https://via.placeholder.com/300x200?text=Mentor",
            rate: "₹5,000/hour",
            available: true, // Default to available
            skills,
            expertise,
            background: "Professional with years of experience in the industry."
          };

          setMentor(mentorData);
        }
      } catch (error: any) {
        console.error("Error fetching mentor:", error);
        toast.error("Failed to load mentor details.");
      } finally {
        setLoading(false);
      }
    }

    fetchMentor();
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      toast.error("You need to log in as a mentee to book a session");
      navigate("/auth/login");
      return;
    }

    if (userRole !== "mentee") {
      toast.error("Only mentees can book sessions");
      return;
    }

    setBookingOpen(true);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mentor-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!mentor) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Mentor not found</h2>
          <p className="mb-8">The mentor you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/mentors">Back to Mentors</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-mentor-light bg-opacity-30 py-12">
        <div className="container mx-auto px-4">
          <Link
            to="/mentors"
            className="inline-flex items-center text-mentor-primary hover:underline mb-6"
          >
            ← Back to Mentors
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">{mentor.name}</h1>
                    <Badge variant={mentor.available ? "default" : "secondary"}>
                      {mentor.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  <p className="text-lg text-mentor-primary font-medium mb-4">
                    {mentor.rate}
                  </p>
                  <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                    <DialogTrigger asChild>
                      <Button
                        disabled={!mentor.available}
                        className="w-full"
                        size="lg"
                        onClick={handleBookNow}
                      >
                        {mentor.available ? "Book a Session" : "Currently Unavailable"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px]">
                      <BookSession 
                        mentorId={id || ''} 
                        mentorName={mentor.name} 
                        onSuccess={() => setBookingOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">About Me</h2>
                <p className="text-gray-700 mb-6">{mentor.bio}</p>
                <h3 className="font-semibold mb-2">Background</h3>
                <p className="text-gray-700 mb-6">{mentor.background}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentor.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((exp, index) => (
                        <Badge key={index} variant="secondary">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {mentor.available && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Availability</h2>
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="mx-auto h-12 w-12 text-mentor-primary mb-2" />
                      <p className="text-gray-700 mb-4">
                        Book a session to see available time slots
                      </p>
                      <Button 
                        onClick={handleBookNow}
                      >Check Availability</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentorDetail;
