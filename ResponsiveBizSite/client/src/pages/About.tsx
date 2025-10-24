import { Card } from "@/components/ui/card";
import { CheckCircle2, Zap, Award, Clock } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: CheckCircle2,
      title: "Precision & Quality",
      description: "State-of-the-art laser cutting technology ensuring perfect cuts every time"
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "Quick production times without compromising on quality"
    },
    {
      icon: Award,
      title: "Expert Craftsmanship",
      description: "Years of experience in laser cutting and design consultation"
    },
    {
      icon: Clock,
      title: "Reliable Delivery",
      description: "On-time delivery across Pakistan with careful packaging"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About LaserCut.pk</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pakistan's leading laser cutting service provider, bringing precision and creativity to life
          </p>
        </div>

        {/* Mission */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At LaserCut.pk, we're committed to delivering exceptional laser cutting services that transform your creative visions into reality. 
            Using cutting-edge technology and premium materials, we serve businesses and individuals across Islamabad and Pakistan with 
            precision-crafted products that exceed expectations.
          </p>
        </Card>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LaserCut.pk</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-white/10 text-center" data-testid={`feature-${index}`}>
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Technology</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We utilize state-of-the-art laser cutting machines capable of working with various materials including 
                acrylic, MDF, wood, and metal. Our equipment ensures precision cuts down to the millimeter, making even 
                the most intricate designs possible.
              </p>
              <p>
                Whether you need a large-scale 3D LED signboard for your business or delicate custom nameplates, 
                our technology and expertise guarantee outstanding results.
              </p>
              <p>
                From design consultation to final delivery, we maintain strict quality control at every step to ensure 
                your complete satisfaction.
              </p>
            </div>
          </div>
          <div>
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-transparent rounded-md border border-primary/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl text-primary/30 mb-4">⚡</div>
                <p className="text-muted-foreground">Workshop Video Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <Card className="p-8 bg-card/50 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Commercial Solutions</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  3D LED Signboards for businesses
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Corporate branding materials
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Custom office nameplates
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Promotional displays
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Personal Projects</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Custom home décor and wall art
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Personalized gifts and keychains
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Wedding and event decorations
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Custom furniture accents
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
