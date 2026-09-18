import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { QrCode, Check, CreditCard } from 'lucide-react';

interface SessionDetails {
  id: string;
  title: string;
  description: string;
  scheduled_at: string;
  duration_minutes: number;
  mentor: {
    first_name: string;
    last_name: string;
  };
}

interface PaymentDetails {
  id: string;
  amount: number;
  currency: string;
  status: string;
  qr_code_url: string | null;
  transaction_id?: string | null;
}

const PRICE_PER_MINUTE = 5000; // ₹50 per minute (in paisa)

const Payment = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStep, setPaymentStep] = useState(1);
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  
  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId || !user) return;
      
      try {
        setLoading(true);
        
        // Fetch session details with mentor info - updated query
        const { data, error } = await supabase
          .from('sessions')
          .select(`
            id, 
            title, 
            description, 
            scheduled_at, 
            duration_minutes,
            mentor_id
          `)
          .eq('id', sessionId)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Session not found');
        
        // Now fetch the mentor's profile separately
        const { data: mentorData, error: mentorError } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', data.mentor_id)
          .single();

        if (mentorError) throw mentorError;
        
        // Transform the data to match the expected structure
        const sessionData: SessionDetails = {
          id: data.id,
          title: data.title,
          description: data.description,
          scheduled_at: data.scheduled_at,
          duration_minutes: data.duration_minutes,
          mentor: {
            first_name: mentorData.first_name || 'Unknown',
            last_name: mentorData.last_name || 'Mentor',
          }
        };
        
        setSessionDetails(sessionData);
        
        // Check if a payment exists for this session
        const { data: paymentData, error: paymentError } = await supabase
          .from('payments')
          .select('*')
          .eq('session_id', sessionId)
          .maybeSingle();
          
        if (paymentError && paymentError.code !== 'PGRST116') throw paymentError;
        
        if (paymentData) {
          setPaymentDetails(paymentData);
          
          // If payment is completed, skip to last step
          if (paymentData.status === 'completed') {
            setPaymentStep(3);
          } else if (paymentData.qr_code_url) {
            setPaymentStep(2);
            setQrCodeGenerated(true);
          }
        }
      } catch (error: any) {
        console.error('Error fetching session details:', error);
        toast.error(error.message || 'Failed to load session details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSessionDetails();
  }, [sessionId, user]);
  
  const handleInitiatePayment = async () => {
    if (!sessionDetails || !user) return;
    
    try {
      const amount = sessionDetails.duration_minutes * PRICE_PER_MINUTE;
      
      // Create a new payment record if one doesn't exist
      if (!paymentDetails) {
        // Generate a fake QR code for demo purposes
        // In a production app, you would integrate with a payment gateway here
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=example@upi&pn=MentorConnect&am=${amount/100}&cu=INR&tn=Session%20Payment`;
        
        const { data, error } = await supabase
          .from('payments')
          .insert({
            session_id: sessionId,
            amount,
            currency: 'inr',
            qr_code_url: qrCodeUrl,
          })
          .select()
          .single();
          
        if (error) throw error;
        
        setPaymentDetails(data);
        setQrCodeGenerated(true);
      }
      
      setPaymentStep(2);
    } catch (error: any) {
      console.error('Error initiating payment:', error);
      toast.error(error.message || 'Failed to initiate payment');
    }
  };
  
  const handleCompletePayment = async () => {
    if (!paymentDetails || !sessionId) return;
    
    try {
      const { error } = await supabase
        .from('payments')
        .update({
          status: 'completed',
          payment_method: 'UPI',
          transaction_id: `DEMO-${Date.now()}`,
          updated_at: new Date().toISOString(),
        })
        .eq('id', paymentDetails.id);
        
      if (error) throw error;
      
      // Also update the session payment status
      const { error: sessionError } = await supabase
        .from('sessions')
        .update({
          payment_status: 'paid',
          status: 'confirmed',
        })
        .eq('id', sessionId);
        
      if (sessionError) throw sessionError;
      
      setPaymentStep(3);
      toast.success('Payment completed successfully! Your session has been booked.');
    } catch (error: any) {
      console.error('Error completing payment:', error);
      toast.error(error.message || 'Failed to complete payment');
    }
  };
  
  const renderPaymentStep = () => {
    switch (paymentStep) {
      case 1:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Session Summary</CardTitle>
              <CardDescription>Review your booking details below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-2">{sessionDetails?.title}</h3>
                <p className="text-gray-500">{sessionDetails?.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p>{new Date(sessionDetails?.scheduled_at || '').toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p>{sessionDetails?.duration_minutes} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mentor</p>
                  <p>{sessionDetails?.mentor.first_name} {sessionDetails?.mentor.last_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-bold">
                    ₹{sessionDetails ? (sessionDetails.duration_minutes * PRICE_PER_MINUTE / 100).toFixed(2) : '0.00'}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleInitiatePayment}
                className="w-full bg-mentor-primary hover:bg-mentor-primary/90"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        );
        
      case 2:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Payment</CardTitle>
              <CardDescription>Scan the QR code to complete payment</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {qrCodeGenerated && paymentDetails?.qr_code_url && (
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <img 
                    src={paymentDetails.qr_code_url} 
                    alt="Payment QR Code" 
                    className="w-64 h-64" 
                  />
                </div>
              )}
              
              <div className="mt-6 text-center">
                <p className="font-medium">Total Amount: ₹{paymentDetails ? (paymentDetails.amount / 100).toFixed(2) : '0.00'}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Scan this QR code with any UPI app to complete the payment.<br />
                  (PhonePe, Google Pay, Paytm, etc.)
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                onClick={handleCompletePayment}
                className="w-full bg-mentor-primary hover:bg-mentor-primary/90"
              >
                I've Completed the Payment
              </Button>
              <Button
                variant="outline"
                onClick={() => setPaymentStep(1)}
                className="w-full"
              >
                Go Back
              </Button>
            </CardFooter>
          </Card>
        );
        
      case 3:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-center text-green-600">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              
              <h3 className="text-xl font-medium mb-2">Thank you for your payment</h3>
              <p className="text-center text-gray-500 mb-6">
                Your session has been confirmed and added to your schedule.
              </p>
              
              <div className="w-full border rounded-lg p-4 bg-gray-50">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Session:</span>
                    <span>{sessionDetails?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date & Time:</span>
                    <span>{new Date(sessionDetails?.scheduled_at || '').toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount Paid:</span>
                    <span className="font-medium">₹{paymentDetails ? (paymentDetails.amount / 100).toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transaction ID:</span>
                    <span className="text-xs">{paymentDetails?.transaction_id || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate('/mentee-dashboard')}
                className="w-full"
              >
                Go to Dashboard
              </Button>
            </CardFooter>
          </Card>
        );
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container max-w-2xl mx-auto py-12 px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mentor-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container max-w-2xl mx-auto py-12 px-4">
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="steps flex justify-between mb-8">
                <div className={`step flex flex-col items-center ${paymentStep >= 1 ? 'text-mentor-primary' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${paymentStep >= 1 ? 'border-mentor-primary bg-mentor-primary text-white' : 'border-gray-300'}`}>
                    1
                  </div>
                  <span className="text-sm mt-2">Review</span>
                </div>
                <div className={`step flex flex-col items-center ${paymentStep >= 2 ? 'text-mentor-primary' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${paymentStep >= 2 ? 'border-mentor-primary bg-mentor-primary text-white' : 'border-gray-300'}`}>
                    <QrCode className="h-4 w-4" />
                  </div>
                  <span className="text-sm mt-2">Pay</span>
                </div>
                <div className={`step flex flex-col items-center ${paymentStep >= 3 ? 'text-mentor-primary' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${paymentStep >= 3 ? 'border-mentor-primary bg-mentor-primary text-white' : 'border-gray-300'}`}>
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm mt-2">Confirmed</span>
                </div>
              </div>
              
              {renderPaymentStep()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
