
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      phone: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Store contact request in Supabase using type assertion to bypass TypeScript error
      // This is safe because we have created the contact_requests table in our migration
      const { error } = await supabase
        .from('contact_requests' as any)
        .insert({
          name: data.name,
          email: data.email,
          message: data.message,
          phone: data.phone,
        } as any);
      
      if (error) throw error;
      
      toast.success('Your message has been sent! We will get back to you soon.');
      form.reset();
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-mentor-primary">Contact Us</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Have questions or feedback? Get in touch with our team and we'll be happy to help.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <div className="w-full lg:w-1/2">
            <Card className="border-mentor-primary/20">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="resize-none" 
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-mentor-primary hover:bg-mentor-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                          Sending...
                        </div>
                      ) : 'Send Message'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Information */}
          <div className="w-full lg:w-1/2">
            <Card className="bg-mentor-primary text-white h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
                <CardDescription className="text-white/80">
                  Reach out to us using any of the following methods.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-8">
                  {/* Email Contacts */}
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-white/80">pruthvibuhecha@gmail.com</p>
                      <p className="text-white/80">naikdhruv@gmail.com</p>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-white/80">9909400958</p>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-white/80">College Road, Nadiad, Gujarat</p>
                    </div>
                  </div>
                  
                  {/* LinkedIn */}
                  <div className="flex items-start">
                    <Linkedin className="h-6 w-6 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">LinkedIn</h3>
                      <a href="https://www.linkedin.com/in/pruthvibuhecha/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white block">Pruthvi Buhecha</a>
                      <a href="https://www.linkedin.com/in/dhruvnaik03/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white block">Dhruv Naik</a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/20">
                  <h3 className="font-medium mb-2">Office Hours</h3>
                  <p className="text-white/80">Monday-Friday: 9:00 AM - 5:00 PM IST</p>
                  <p className="text-white/80">Saturday-Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
