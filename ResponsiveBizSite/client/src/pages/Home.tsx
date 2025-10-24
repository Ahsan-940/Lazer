import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scissors, Box, Home as HomeIcon, Gift, ChevronRight, Upload, Zap, Truck, CheckCircle2 } from "lucide-react";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function Home() {
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials/featured"],
  });

  const services = [
    {
      icon: Scissors,
      title: "Acrylic Cutting",
      description: "Precision cutting for signboards, décor & displays",
      href: "/products?category=home-decor"
    },
    {
      icon: Zap,
      title: "3D Signboards",
      description: "Illuminated LED signs for businesses",
      href: "/products?category=3d-signs"
    },
    {
      icon: HomeIcon,
      title: "Custom Décor",
      description: "Unique wall art and home decorations",
      href: "/products?category=home-decor"
    },
    {
      icon: Gift,
      title: "Corporate Gifts",
      description: "Personalized items for your team",
      href: "/products?category=gifts"
    },
  ];

  const howItWorks = [
    { icon: Upload, title: "Design", description: "Upload your design or use our configurator" },
    { icon: Scissors, title: "Cut", description: "We laser-cut with precision on premium materials" },
    { icon: CheckCircle2, title: "Quality Check", description: "Every piece is inspected for perfection" },
    { icon: Truck, title: "Deliver", description: "Fast delivery anywhere in Pakistan" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d9ff10_1px,transparent_1px),linear-gradient(to_bottom,#00d9ff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Precision Crafted.
            <br />
            Laser Perfected.
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Premium laser cutting services for acrylic, MDF, wood & metal in Islamabad, Pakistan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link href="/configurator">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 h-12" data-testid="button-hero-quote">
                Get Instant Quote
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/upload-quote">
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 h-12 backdrop-blur-sm" data-testid="button-hero-upload">
                Upload Your Design
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Professional laser cutting solutions for all your creative and business needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all cursor-pointer hover-elevate h-full" data-testid={`card-service-${index}`}>
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground mb-12">Simple process from design to delivery</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center" data-testid={`step-${index}`}>
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">What Our Clients Say</h2>
          <p className="text-center text-muted-foreground mb-12">Trusted by businesses across Pakistan</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 bg-card/50 backdrop-blur-sm border-white/10" data-testid={`testimonial-${testimonial.id}`}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm mb-4 italic text-foreground/90">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  {testimonial.role && <p className="text-xs text-muted-foreground">{testimonial.role}</p>}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get an instant quote or upload your design files today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/configurator">
              <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-cta-configurator">
                Try Our Configurator
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-primary/50 text-primary" data-testid="button-cta-contact">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
