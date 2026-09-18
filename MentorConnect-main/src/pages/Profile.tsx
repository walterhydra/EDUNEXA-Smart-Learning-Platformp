
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  bio: z.string().optional(),
  contact_number: z.string().optional(),
  skill: z.string().optional(),
  expertise: z.string().optional().nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile: React.FC = () => {
  const { user, userRole, updateProfile } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [mentorData, setMentorData] = useState<any>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      bio: '',
      contact_number: '',
      skill: '',
      expertise: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        // Fetch basic profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        // Initialize form with profile data
        const formData: ProfileFormValues = {
          first_name: profileData?.first_name || '',
          last_name: profileData?.last_name || '',
          bio: profileData?.bio || '',
          contact_number: profileData?.contact_number || '',
          skill: profileData?.skill || '',
          expertise: '',
        };

        // If user is a mentor, fetch mentor-specific data
        if (userRole === 'mentor') {
          const { data: mentorData, error: mentorError } = await supabase
            .from('mentors')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();

          if (mentorError && mentorError.code !== 'PGRST116') {
            // PGRST116 is "no rows returned" which is fine for a new user
            console.error('Error fetching mentor data:', mentorError);
          } else if (mentorData) {
            setMentorData(mentorData);
            formData.expertise = mentorData.expertise || '';
          }
        }

        form.reset(formData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      }
    };

    fetchProfile();
  }, [user, userRole, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);

      // Extract data for the profiles table
      const profileData = {
        first_name: values.first_name,
        last_name: values.last_name,
        bio: values.bio,
        contact_number: values.contact_number,
        skill: values.skill,
      };

      // Update the profiles table
      await updateProfile(profileData);

      // If user is a mentor, update the mentors table
      if (userRole === 'mentor' && values.expertise) {
        const { error: mentorError } = await supabase
          .from('mentors')
          .upsert({
            id: user.id,
            expertise: values.expertise,
          });

        if (mentorError) {
          throw mentorError;
        }
      }

      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-2xl mx-auto py-12 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Edit Your Profile</h1>
            <p className="text-gray-500 mt-2">
              Update your profile information below
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="contact_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="JavaScript, React, Node.js" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {userRole === 'mentor' && (
                <FormField
                  control={form.control}
                  name="expertise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Areas of Expertise</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your areas of expertise and experience" 
                          className="min-h-[100px]"
                          {...field} 
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={`Tell us about yourself${userRole === 'mentor' ? ' and your mentoring approach' : ''}`}
                        className="min-h-[150px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
