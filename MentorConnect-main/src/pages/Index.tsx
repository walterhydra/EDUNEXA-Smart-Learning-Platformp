
import React from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { mentors } from "@/data/mentors";
import MentorCard from "@/components/MentorCard";

const Index = () => {
  const featuredMentors = mentors.filter(mentor => mentor.available).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Find Your Perfect <span className="text-mentor-primary">Mentor</span>
              </h1>
              <p className="text-xl mb-8 text-gray-700 max-w-lg">
                Connect with industry experts who can guide you through your
                career journey and help you achieve your professional goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/mentors">Browse Mentors</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Mentorship"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MentorConnect makes it easy to find the right mentor and start your
              journey to success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="bg-mentor-light rounded-full w-16 h-16 flex items-center justify-center text-mentor-primary text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Find a Mentor</h3>
              <p className="text-gray-600">
                Browse our extensive directory of experienced mentors and filter
                based on skills, industry, and availability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="bg-mentor-light rounded-full w-16 h-16 flex items-center justify-center text-mentor-primary text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">Book a Session</h3>
              <p className="text-gray-600">
                Schedule a one-on-one session with your chosen mentor at a time
                that works for both of you.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="bg-mentor-light rounded-full w-16 h-16 flex items-center justify-center text-mentor-primary text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Grow Your Skills</h3>
              <p className="text-gray-600">
                Connect with your mentor via our platform and start your journey
                towards achieving your professional goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Mentors</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet some of our top mentors who are ready to help you succeed in
              your career journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/mentors">View All Mentors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-mentor-light bg-opacity-30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from mentees who have found success through MentorConnect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-mentor-primary text-white flex items-center justify-center font-bold text-xl">
                    JP
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Jessica Parker</h4>
                  <p className="text-gray-600 text-sm">UX Designer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Finding a mentor through MentorConnect has been a game-changer for my
                career. The guidance I received helped me secure my dream job."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-mentor-secondary text-white flex items-center justify-center font-bold text-xl">
                    AK
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Alex Kim</h4>
                  <p className="text-gray-600 text-sm">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "My mentor provided insights that I couldn't find anywhere else.
                Their experience in the industry was invaluable to my growth."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-mentor-primary text-white flex items-center justify-center font-bold text-xl">
                    MJ
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Michelle Johnson</h4>
                  <p className="text-gray-600 text-sm">Marketing Specialist</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The personalized guidance I received through MentorConnect was
                exactly what I needed to advance in my marketing career."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-mentor-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join MentorConnect today and connect with experienced mentors who can
            help you achieve your professional goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-mentor-primary hover:bg-gray-100"
              asChild
            >
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-mentor-primary"
              asChild
            >
              <Link to="/mentors">Browse Mentors</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
