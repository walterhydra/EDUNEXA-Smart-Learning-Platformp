
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import BookSession from "./BookSession";

interface Mentor {
  id: string;
  name: string;
  image: string;
  bio: string;
  rate: string;
  available: boolean;
  skills: string[];
  expertise?: string[];
}

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { user, userRole } = useAuth();
  const navigate = useNavigate();

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

  return (
    <>
      <Card className="card-hover overflow-hidden">
        <CardHeader className="p-0">
          <div className="h-48 overflow-hidden">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-xl">{mentor.name}</h3>
              <p className="text-gray-500 text-sm">{mentor.rate}</p>
            </div>
            <Badge variant={mentor.available ? "default" : "secondary"}>
              {mentor.available ? "Available" : "Unavailable"}
            </Badge>
          </div>
          <p className="text-gray-700 mb-4 line-clamp-3">{mentor.bio}</p>
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2">Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {mentor.skills.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          {mentor.expertise && mentor.expertise.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Expertise:</h4>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((item, index) => (
                  <Badge key={index} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 p-4 flex justify-between">
          <Button variant="outline" asChild>
            <Link to={`/mentors/${mentor.id}`}>View Profile</Link>
          </Button>
          <Button 
            disabled={!mentor.available}
            onClick={mentor.available ? handleBookNow : undefined}
          >
            {mentor.available ? "Book Session" : "Unavailable"}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <BookSession 
            mentorId={mentor.id} 
            mentorName={mentor.name} 
            onSuccess={() => setBookingOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MentorCard;
