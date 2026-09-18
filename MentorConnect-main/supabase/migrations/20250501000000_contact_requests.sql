
-- Create contact_requests table
CREATE TABLE public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on contact_requests
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact requests (public form)
CREATE POLICY "Anyone can submit contact requests" 
  ON public.contact_requests
  FOR INSERT
  WITH CHECK (true);

-- Create policy for admins to view contact requests (future use)
CREATE POLICY "Admins can select contact requests" 
  ON public.contact_requests
  FOR SELECT
  USING (auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin'));
