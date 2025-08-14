import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    desiredPart: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: IMPLEMENT EMAIL SENDING FUNCTIONALITY
    // This is where you'll need to add your backend logic to send emails
    // You can either:
    // 1. Connect to a backend API endpoint
    // 2. Use a service like EmailJS
    // 3. Implement server-side email sending
    
    try {
      // PLACEHOLDER: Replace this with actual email sending logic
      console.log("Form data to be sent:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Replace this with actual email sending
      // Example API call structure:
      // const response = await fetch('/api/send-email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });
      
      toast({
        title: "Request Submitted!",
        description: "We'll get back to you within 24 hours with a quote.",
      });
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        desiredPart: ""
      });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-automotive-light to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-automotive-dark mb-4">
            Request a Quote
          </h2>
          <p className="text-xl text-automotive-gray max-w-2xl mx-auto">
            Tell us what you need and we'll provide you with a competitive quote and availability information.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="h-full border-0 bg-automotive-blue text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription className="text-blue-100">
                  Multiple ways to reach our team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-automotive-orange mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-blue-100">parts@yourcompany.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-automotive-orange mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-blue-100">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-automotive-orange mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-blue-100">
                      123 Auto Parts Blvd<br />
                      Your City, State 12345
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-blue-400">
                  <h4 className="font-semibold mb-2">Business Hours</h4>
                  <div className="text-blue-100 text-sm space-y-1">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-automotive-dark">Request Your Part</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you with pricing and availability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="desiredPart">Desired Part Description *</Label>
                    <Textarea
                      id="desiredPart"
                      name="desiredPart"
                      value={formData.desiredPart}
                      onChange={handleInputChange}
                      required
                      className="mt-1 min-h-[100px]"
                      placeholder="Please describe the part you need (e.g., brake pads for 2018 Honda Civic, alternator for Ford F-150, etc.)"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="automotive" 
                    size="lg" 
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Submitting..." : "Submit Request"}
                  </Button>
                  
                  {/* TODO: REMOVE THIS COMMENT BLOCK WHEN IMPLEMENTING EMAIL */}
                  <div className="text-sm text-automotive-gray bg-automotive-light p-4 rounded-lg">
                    <strong>Developer Note:</strong> The form is ready but needs email functionality. 
                    Check the handleSubmit function in ContactForm.tsx for implementation details.
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;