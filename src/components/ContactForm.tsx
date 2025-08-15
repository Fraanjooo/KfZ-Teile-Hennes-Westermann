/**
 * ContactForm Component
 * 
 * Main contact form for customer inquiries featuring:
 * - Customer information fields (first name, last name, email, phone)
 * - Part description textarea for detailed requests
 * - Form validation and loading states
 * - Contact information display (email and phone)
 * 
 * Backend Integration Required:
 * - Form submission needs to send email to franzjoschmitt@gmail.com
 * - Currently shows placeholder functionality
 * - Requires Supabase integration for email sending capabilities
 * 
 * TODO: Implement actual email sending via Supabase Edge Functions
 * TODO: Add form validation feedback
 * TODO: Consider adding file upload for part images
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    // Using formsubmit.co for email sending - no JavaScript processing needed
    // The form will be submitted directly to formsubmit.co endpoint
    setIsLoading(true);
    
    // Show success message after brief delay (form will redirect)
    setTimeout(() => {
      toast({
        title: "Request Submitted!",
        description: "We'll get back to you within 24 hours with a quote.",
      });
    }, 500);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-corporate-light-gray to-corporate-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark-gray mb-4">
            Request a Quote
          </h2>
          <p className="text-xl text-corporate-medium-gray max-w-2xl mx-auto">
            Tell us what you need and we'll provide you with a competitive quote and availability information.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="h-full border-0 bg-corporate-primary text-corporate-white">
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription className="text-corporate-highlight/80">
                  Multiple ways to reach our team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-corporate-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-corporate-highlight/80">parts@yourcompany.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-corporate-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-corporate-highlight/80">(555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-corporate-dark-gray">Request Your Part</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you with pricing and availability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form 
                  action="https://formsubmit.co/franzjoschmitt@gmail.com" 
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
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
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Submitting..." : "Submit Request"}
                  </Button>
                  
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