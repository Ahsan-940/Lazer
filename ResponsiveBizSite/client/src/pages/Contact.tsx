import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/contact", formData);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate();
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question or ready to start your project? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm text-center hover-elevate" data-testid="card-phone">
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-sm text-muted-foreground">Call us anytime</p>
            <a href="tel:+923217000586" className="text-primary hover:underline mt-2 inline-block">
              +92 321 7000586
            </a>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm text-center hover-elevate" data-testid="card-email">
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-muted-foreground">Send us a message</p>
            <a href="mailto:autoc639@gmail.com" className="text-primary hover:underline mt-2 inline-block">
              autoc639@gmail.com
            </a>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm text-center hover-elevate" data-testid="card-location">
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-sm text-muted-foreground">Visit our workshop</p>
            <p className="text-primary mt-2">Islamabad, Pakistan</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  data-testid="input-contact-name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  data-testid="input-contact-email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  data-testid="input-contact-phone"
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  data-testid="input-contact-subject"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  data-testid="input-contact-message"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={contactMutation.isPending}
                data-testid="button-send-message"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>

          {/* Map */}
          <Card className="p-0 overflow-hidden bg-card/50 backdrop-blur-sm">
            <div className="h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212270.0484220267!2d72.88093587968755!3d33.61652470000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df948974419acb%3A0x984357e1632d30f!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LaserCut.pk Location - Islamabad, Pakistan"
              />
            </div>
          </Card>
        </div>

        {/* WhatsApp CTA */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-[#25D366]/10 to-transparent border-[#25D366]/20 text-center">
          <h3 className="text-2xl font-bold mb-4">Prefer WhatsApp?</h3>
          <p className="text-muted-foreground mb-6">
            Chat with us directly for instant responses
          </p>
          <a
            href="https://wa.me/923217000586?text=Hi! I'm interested in your laser cutting services."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-[#25D366] hover:bg-[#20BA5A]" data-testid="button-whatsapp-contact">
              <Send className="mr-2 h-4 w-4" />
              Message on WhatsApp
            </Button>
          </a>
        </Card>
      </div>
    </div>
  );
}
