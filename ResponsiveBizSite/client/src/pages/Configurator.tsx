import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import type { Material, Product } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Configurator() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    productType: "",
    material: "",
    customText: "",
    width: "",
    height: "",
    thickness: "",
    quantity: "1",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
  });

  const { data: products = [] } = useQuery<Product[]>({ queryKey: ["/api/products"] });
  const { data: materials = [] } = useQuery<Material[]>({ queryKey: ["/api/materials"] });

  const selectedMaterial = materials.find((m) => m.name === config.material);
  const selectedProduct = products.find((p) => p.name === config.productType);

  // Calculate price
  const calculatePrice = () => {
    if (!selectedProduct || !selectedMaterial || !config.width || !config.height) return 0;
    const basePrice = parseFloat(selectedProduct.basePrice);
    const materialPricePerUnit = parseFloat(selectedMaterial.pricePerUnit);
    const area = (parseFloat(config.width) * parseFloat(config.height)) / 144; // convert to sqft
    const quantity = parseInt(config.quantity) || 1;
    return (basePrice + materialPricePerUnit * area) * quantity;
  };

  const totalPrice = calculatePrice();

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/orders", {
        customerName: config.customerName,
        customerEmail: config.customerEmail,
        customerPhone: config.customerPhone,
        productType: config.productType,
        material: config.material,
        dimensions: `${config.width}x${config.height} inches`,
        thickness: config.thickness,
        quantity: parseInt(config.quantity),
        customText: config.customText,
        totalPrice: totalPrice.toString(),
        notes: config.notes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({
        title: "Order Submitted!",
        description: "We'll contact you shortly with a detailed quote.",
      });
      setStep(7);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const nextStep = () => setStep(Math.min(step + 1, 7));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  const canProceed = () => {
    switch (step) {
      case 1:
        return config.productType !== "";
      case 2:
        return config.material !== "";
      case 3:
        return true; // Optional text
      case 4:
        return config.width && config.height && config.thickness && config.quantity;
      case 5:
        return true; // Preview
      case 6:
        return config.customerName && config.customerEmail && config.customerPhone;
      default:
        return false;
    }
  };

  const progress = (step / 6) * 100;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Custom Order Configurator</h1>
          <p className="text-muted-foreground">Build your perfect laser-cut product in 6 easy steps</p>
        </div>

        <Progress value={progress} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">Step 1: Choose Product Type</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {products.map((product) => (
                      <Card
                        key={product.id}
                        className={`p-4 cursor-pointer transition-all hover-elevate ${
                          config.productType === product.name
                            ? "border-primary bg-primary/10"
                            : "border-white/10"
                        }`}
                        onClick={() => setConfig({ ...config, productType: product.name })}
                        data-testid={`select-product-${product.id}`}
                      >
                        <h3 className="font-semibold mb-1">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">{product.description}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">Step 2: Choose Material</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {materials.map((material) => (
                      <Card
                        key={material.id}
                        className={`p-4 cursor-pointer transition-all hover-elevate ${
                          config.material === material.name
                            ? "border-primary bg-primary/10"
                            : "border-white/10"
                        }`}
                        onClick={() => setConfig({ ...config, material: material.name })}
                        data-testid={`select-material-${material.id}`}
                      >
                        <h3 className="font-semibold mb-1">{material.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Rs. {parseFloat(material.pricePerUnit).toLocaleString()}/{material.unit}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">Step 3: Add Custom Text (Optional)</h2>
                  <div>
                    <Label htmlFor="customText">Enter your text or design description</Label>
                    <Textarea
                      id="customText"
                      placeholder="e.g., Company Name, Custom Message"
                      value={config.customText}
                      onChange={(e) => setConfig({ ...config, customText: e.target.value })}
                      className="mt-2"
                      data-testid="input-custom-text"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You can also upload your design files in the next step
                  </p>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">Step 4: Dimensions & Quantity</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width">Width (inches)</Label>
                      <Input
                        id="width"
                        type="number"
                        placeholder="12"
                        value={config.width}
                        onChange={(e) => setConfig({ ...config, width: e.target.value })}
                        data-testid="input-width"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (inches)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="8"
                        value={config.height}
                        onChange={(e) => setConfig({ ...config, height: e.target.value })}
                        data-testid="input-height"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="thickness">Thickness</Label>
                    <Select value={config.thickness} onValueChange={(v) => setConfig({ ...config, thickness: v })}>
                      <SelectTrigger data-testid="select-thickness">
                        <SelectValue placeholder="Select thickness" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedMaterial?.availableThickness.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={config.quantity}
                      onChange={(e) => setConfig({ ...config, quantity: e.target.value })}
                      data-testid="input-quantity"
                    />
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">Step 5: Preview & Confirm</h2>
                  <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-md border border-primary/20">
                    <h3 className="font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Product:</span>
                        <span className="font-medium">{config.productType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Material:</span>
                        <span className="font-medium">{config.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dimensions:</span>
                        <span className="font-medium">{config.width} x {config.height} inches</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Thickness:</span>
                        <span className="font-medium">{config.thickness}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quantity:</span>
                        <span className="font-medium">{config.quantity}</span>
                      </div>
                      {config.customText && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Custom Text:</span>
                          <span className="font-medium">{config.customText}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">Step 6: Your Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customerName">Full Name</Label>
                      <Input
                        id="customerName"
                        value={config.customerName}
                        onChange={(e) => setConfig({ ...config, customerName: e.target.value })}
                        data-testid="input-customer-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerEmail">Email</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={config.customerEmail}
                        onChange={(e) => setConfig({ ...config, customerEmail: e.target.value })}
                        data-testid="input-customer-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerPhone">Phone Number</Label>
                      <Input
                        id="customerPhone"
                        type="tel"
                        placeholder="+92 300 1234567"
                        value={config.customerPhone}
                        onChange={(e) => setConfig({ ...config, customerPhone: e.target.value })}
                        data-testid="input-customer-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special requirements?"
                        value={config.notes}
                        onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                        data-testid="input-notes"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Order Submitted Successfully!</h2>
                  <p className="text-muted-foreground mb-6">
                    We've received your custom order request. Our team will contact you shortly with a detailed quote.
                  </p>
                  <Button onClick={() => window.location.href = "/"} data-testid="button-back-home">
                    Back to Home
                  </Button>
                </div>
              )}

              {step < 7 && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    data-testid="button-prev-step"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  {step < 6 ? (
                    <Button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      data-testid="button-next-step"
                    >
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => createOrderMutation.mutate()}
                      disabled={!canProceed() || createOrderMutation.isPending}
                      className="bg-primary hover:bg-primary/90"
                      data-testid="button-submit-order"
                    >
                      {createOrderMutation.isPending ? "Submitting..." : "Submit Order"}
                    </Button>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/50 backdrop-blur-sm sticky top-24">
              <h3 className="font-semibold mb-4">Live Preview</h3>
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-transparent rounded-md border border-primary/20 flex items-center justify-center mb-4">
                <div className="text-center p-4">
                  <div className="text-6xl text-primary/30 mb-2">✦</div>
                  {config.customText && (
                    <p className="text-sm font-medium">{config.customText}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Price:</span>
                  <span className="text-2xl font-bold text-primary" data-testid="text-estimated-price">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Final price may vary based on design complexity
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
