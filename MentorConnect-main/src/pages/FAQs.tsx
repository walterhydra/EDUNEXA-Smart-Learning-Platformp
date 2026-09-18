
import React from "react";
import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What is MentorConnect?",
    answer:
      "MentorConnect is a platform that connects aspiring professionals (mentees) with experienced industry experts (mentors) to foster career guidance and skill development. Our platform makes it easy to find, connect with, and learn from mentors in your field.",
  },
  {
    question: "How do I sign up as a mentee?",
    answer:
      "To sign up as a mentee, click on the 'Sign Up' button in the navigation bar, fill out the registration form, and select 'Mentee' as your role. Once registered, you can create your profile and start searching for mentors that match your interests and goals.",
  },
  {
    question: "How do I become a mentor?",
    answer:
      "To become a mentor, sign up by clicking the 'Sign Up' button and selecting 'Mentor' as your role. Complete your profile with your expertise, experience, and availability. Our team will review your application, and once approved, your profile will be visible to potential mentees.",
  },
  {
    question: "How does the booking system work?",
    answer:
      "As a mentee, you can browse mentor profiles and check their availability calendar. When you find a suitable time slot, you can request a booking. The mentor will receive a notification and can confirm the session. Once confirmed, you'll receive the details for connecting at the scheduled time.",
  },
  {
    question: "What types of mentoring sessions are available?",
    answer:
      "MentorConnect supports various session types, including one-on-one video calls, chat consultations, and document sharing. Mentors can specify their preferred session types in their profiles, and mentees can choose the format that best fits their needs.",
  },
  {
    question: "How much does it cost to use MentorConnect?",
    answer:
      "MentorConnect offers both free and paid mentoring options. Mentors set their own rates, which are displayed on their profiles. Some mentors offer pro-bono sessions or discounted rates for certain circumstances. As a platform, we charge a small service fee for paid sessions.",
  },
  {
    question: "Can I change my mentor after starting sessions?",
    answer:
      "Yes, you can work with multiple mentors or switch mentors at any time. There's no obligation to continue with the same mentor if you feel another mentor might be a better fit for your goals.",
  },
  {
    question: "How are mentors vetted?",
    answer:
      "All mentors go through a verification process that includes reviewing their professional experience, expertise, and credentials. We also collect feedback from mentees after sessions to ensure high-quality mentorship.",
  },
  {
    question: "What if I need to cancel a scheduled session?",
    answer:
      "You can cancel a scheduled session through your dashboard. Please note that each mentor has their own cancellation policy, which you can find on their profile. Generally, we recommend cancelling at least 24 hours in advance to avoid any cancellation fees.",
  },
  {
    question: "Is my information secure on MentorConnect?",
    answer:
      "Yes, we take data security and privacy seriously. All personal information and communications are encrypted and protected according to industry standards. We never share your personal information with third parties without your consent.",
  },
];

const FAQs = () => {
  return (
    <Layout>
      <div className="bg-mentor-light bg-opacity-30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about MentorConnect
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-semibold px-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 bg-gray-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              If you couldn't find an answer to your question, feel free to reach out to
              our support team.
            </p>
            <Button asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQs;
