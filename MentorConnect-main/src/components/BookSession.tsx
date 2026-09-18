
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, addHours, setHours, setMinutes } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { CalendarIcon, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookSessionProps {
  mentorId: string;
  mentorName: string;
  onSuccess?: () => void;
}

const bookingSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  sessionDate: z.date({
    required_error: "Please select a date",
  }),
  sessionTime: z.string({
    required_error: "Please select a time",
  }),
  duration: z.coerce.number().int().positive().default(60),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

// Generate time slots from 9 AM to 9 PM
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 21; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    slots.push({
      value: time,
      label: `${displayHour}:00 ${period}`
    });
    
    // Add :30 slot except for 9 PM
    if (hour < 21) {
      const halfHourTime = `${hour.toString().padStart(2, '0')}:30`;
      slots.push({
        value: halfHourTime,
        label: `${displayHour}:30 ${period}`
      });
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const BookSession: React.FC<BookSessionProps> = ({ mentorId, mentorName, onSuccess }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      title: '',
      description: '',
      duration: 60,
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    if (!user) {
      toast.error('You must be logged in to book a session');
      navigate('/auth/login');
      return;
    }

    try {
      setIsSubmitting(true);

      // Parse the time string (HH:mm) and combine with the selected date
      const [hours, minutes] = data.sessionTime.split(':').map(num => parseInt(num, 10));
      const scheduledDateTime = setMinutes(setHours(data.sessionDate, hours), minutes);
      
      // Validate that the selected datetime is in the future
      if (scheduledDateTime <= new Date()) {
        toast.error('Please select a future date and time');
        setIsSubmitting(false);
        return;
      }

      // Create the session in the database
      const { data: sessionData, error } = await supabase
        .from('sessions')
        .insert({
          mentee_id: user.id,
          mentor_id: mentorId,
          title: data.title,
          description: data.description || '',
          scheduled_at: scheduledDateTime.toISOString(),
          duration_minutes: data.duration,
        })
        .select()
        .single();

      if (error) throw error;

      // Proceed to payment
      navigate(`/payment/${sessionData.id}`);
      
      if (onSuccess) {
        onSuccess();
      }
      
      toast.success('Session booked successfully! Proceeding to payment...');
    } catch (error: any) {
      toast.error(error.message || 'Failed to book session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Book a Session with {mentorName}</CardTitle>
        <CardDescription>Fill in the details below to schedule your mentoring session</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Career Guidance Session" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what you'd like to discuss in this session"
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="sessionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${
                              !field.value ? "text-muted-foreground" : ""
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sessionTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                    </SelectContent>
                  </Select>
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
                  Processing...
                </div>
              ) : 'Book Session'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookSession;
