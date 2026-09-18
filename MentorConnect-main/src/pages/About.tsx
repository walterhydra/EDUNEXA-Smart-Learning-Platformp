
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <div className="bg-mentor-light bg-opacity-30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About MentorConnect</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging the gap between aspiring professionals and industry experts
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              At MentorConnect, we believe that mentorship is a critical factor in
              educational and professional success. Our mission is to create a platform
              that enables easy, efficient, and valuable mentor-mentee connections.
            </p>
            <p className="text-lg text-gray-700">
              We're dedicated to fostering career guidance and skill development by
              connecting aspiring candidates with experienced professionals who can
              provide insights, advice, and support tailored to individual needs.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1499892477393-f675706cbe6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Our Mission"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Our Vision"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 mb-6">
              We envision a world where everyone has access to personalized
              mentorship that can transform their personal and professional lives,
              regardless of their background or current circumstances.
            </p>
            <p className="text-lg text-gray-700">
              Our platform aims to break down barriers to mentorship, making it more
              accessible, efficient, and impactful for both mentors eager to share
              their knowledge and mentees looking to grow.
            </p>
          </div>
        </div>

        <div className="mt-20 py-16 bg-gray-50 rounded-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at MentorConnect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-mentor-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We believe mentorship should be available to everyone, regardless of
                their background or resources.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-mentor-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Quality</h3>
              <p className="text-gray-600">
                We are committed to providing high-quality mentorship experiences by
                connecting mentees with experienced, knowledgeable mentors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-mentor-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Impact</h3>
              <p className="text-gray-600">
                We measure our success by the positive impact we create in the
                professional journeys of our users.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Whether you're looking to find a mentor or become one, MentorConnect
            provides the platform you need to make meaningful connections.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
