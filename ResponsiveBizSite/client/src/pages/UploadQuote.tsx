import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CheckCircle2, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function UploadQuote() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    material: "",
    dimensions: "",
    quantity: "1",
    message: "",
  });

  const inquiryMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/inquiries", {
        ...formData,
        quantity: parseInt(formData.quantity),
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "We'll send you a detailed quote via email shortly.",
      });
      setSubmitted(true);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inquiryMutation.mutate();
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <Card className="p-12 max-w-2xl mx-4 text-center bg-card/50 backdrop-blur-sm">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Quote Request Received!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your inquiry. We've received your design files and requirements. 
            Our team will review your project and send you a detailed quote within 24 hours.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Check your email at <strong className="text-foreground">{formData.email}</strong>
          </p>
          <Button onClick={() => window.location.href = "/"} data-testid="button-back-home">
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upload & Get Quote</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your design files and get a custom quote for your laser cutting project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 bg-card/50 backdrop-blur-sm text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">1. Upload Design</h3>
            <p className="text-sm text-muted-foreground">
              SVG, DXF, or PDF format
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">2. Provide Details</h3>
            <p className="text-sm text-muted-foreground">
              Material & specifications
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">3. Get Quote</h3>
            <p className="text-sm text-muted-foreground">
              Within 24 hours
            </p>
          </Card>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  data-testid="input-quote-name"
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
                  data-testid="input-quote-email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  data-testid="input-quote-phone"
                />
              </div>
              <div>
                <Label htmlFor="material">Preferred Material</Label>
                <Select value={formData.material} onValueChange={(v) => setFormData({ ...formData, material: v })}>
                  <SelectTrigger data-testid="select-quote-material">
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Acrylic">Acrylic</SelectItem>
                    <SelectItem value="MDF">MDF</SelectItem>
                    <SelectItem value="Wood">Wood</SelectItem>
                    <SelectItem value="Metal">Metal</SelectItem>
                    <SelectItem value="Not Sure">Not Sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="dimensions">Approximate Dimensions</Label>
                <Input
                  id="dimensions"
                  placeholder="e.g., 12x8 inches"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  data-testid="input-quote-dimensions"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  data-testid="input-quote-quantity"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="file-upload">Upload Design Files (SVG, DXF, PDF)</Label>
              <div className="mt-2 border-2 border-dashed border-white/10 rounded-md p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your files here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported formats: SVG, DXF, PDF (Max 10MB)
                </p>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".svg,.dxf,.pdf"
                  className="hidden"
                  data-testid="input-file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  data-testid="button-browse-files"
                >
                  Browse Files
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="message">Additional Notes</Label>
              <Textarea
                id="message"
                rows={4}
                placeholder="Tell us more about your project, special requirements, deadlines, etc."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                data-testid="input-quote-message"
              />
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-md p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> After submitting, you'll receive an auto-confirmation email. 
                Our team will review your files and send a detailed quote within 24 hours.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
              disabled={inquiryMutation.isPending}
              data-testid="button-submit-quote"
            >
              {inquiryMutation.isPending ? "Submitting..." : "Submit Quote Request"}
              <Send className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Card>

        {/* Alternative Contact Methods */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-[#25D366]/10 to-transparent border-[#25D366]/20">
            <h3 className="font-semibold mb-2">Prefer WhatsApp?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Send your design files directly via WhatsApp
            </p>
            <a
              href="https://wa.me/923217000586?text=Hi! I want to upload my design files for a quote."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#25D366] hover:bg-[#20BA5A] w-full" data-testid="button-whatsapp-quote">
                Send via WhatsApp
              </Button>
            </a>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">Email Directly</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Send files to our email address
            </p>
            <a href="mailto:autoc639@gmail.com?subject=Design Files for Quote">
              <Button variant="outline" className="border-primary/50 text-primary w-full" data-testid="button-email-quote">
                Email Design Files
              </Button>
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
