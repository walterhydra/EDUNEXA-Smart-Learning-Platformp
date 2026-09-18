
import React, { useState, useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import MentorCard from "@/components/MentorCard";
import MentorFilter, { FilterOptions } from "@/components/MentorFilter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

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

const Mentors = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    skills: [],
    onlyAvailable: false,
  });
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch mentors from Supabase
  useEffect(() => {
    async function fetchMentors() {
      try {
        setLoading(true);
        
        // Fetch mentors with their profiles
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
          `);

        if (error) throw error;

        // Transform data to match the expected mentor format
        const formattedMentors = data.map(mentor => {
          const skills = mentor.profiles?.skill ? 
            mentor.profiles.skill.split(',').map(skill => skill.trim()) : 
            ["Mentorship"];
            
          const expertise = mentor.expertise ? 
            mentor.expertise.split(',').map(exp => exp.trim()) : 
            ["Career Guidance"];

          return {
            id: mentor.id,
            name: `${mentor.profiles?.first_name || ''} ${mentor.profiles?.last_name || ''}`,
            bio: mentor.profiles?.bio || "Experienced mentor ready to guide you on your journey.",
            image: mentor.profiles?.image_url || "https://via.placeholder.com/300x200?text=Mentor",
            rate: "₹5,000/hour",
            available: true, // Default to available
            skills,
            expertise,
            background: "Professional with years of experience in the industry."
          };
        });

        setMentors(formattedMentors);
      } catch (error: any) {
        console.error("Error fetching mentors:", error);
        toast.error("Failed to load mentors. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMentors();
  }, []);

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      // Filter by search term
      if (
        filters.search &&
        !mentor.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !mentor.bio.toLowerCase().includes(filters.search.toLowerCase()) &&
        !mentor.expertise.some((exp) =>
          exp.toLowerCase().includes(filters.search.toLowerCase())
        )
      ) {
        return false;
      }

      // Filter by skills
      if (
        filters.skills.length > 0 &&
        !mentor.skills.some((skill) => filters.skills.includes(skill))
      ) {
        return false;
      }

      // Filter by availability
      if (filters.onlyAvailable && !mentor.available) {
        return false;
      }

      return true;
    });
  }, [filters, mentors]);

  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <div className="bg-mentor-light bg-opacity-30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Find Your Mentor</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our curated list of professional mentors and find the perfect
              match for your career goals.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with filters */}
          <aside className="md:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-6">Filter Mentors</h2>
            <MentorFilter onFilter={handleFilter} />
          </aside>

          {/* Main content with mentor cards */}
          <main className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {loading ? "Loading mentors..." : `${filteredMentors.length} Mentors Found`}
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mentor-primary"></div>
              </div>
            ) : filteredMentors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to find more mentors.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Mentors;
