import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

const categories = [
  { value: "all", label: "All Products" },
  { value: "home-decor", label: "Home Décor" },
  { value: "3d-signs", label: "3D Signs" },
  { value: "corporate", label: "Corporate" },
  { value: "gifts", label: "Gifts" },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of laser-cut products and custom solutions
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              className={selectedCategory === category.value ? "bg-primary" : "border-primary/30"}
              onClick={() => setSelectedCategory(category.value)}
              data-testid={`filter-${category.value}`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-96 animate-pulse bg-card/50" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden bg-card/50 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all hover-elevate"
                data-testid={`product-${product.id}`}
              >
                {/* Product Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-6xl text-primary/20">✦</div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    {product.featured && (
                      <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Starting from</p>
                      <p className="text-xl font-bold text-primary">
                        Rs. {parseFloat(product.basePrice).toLocaleString()}
                      </p>
                    </div>
                    <Link href="/configurator">
                      <Button size="sm" className="bg-primary hover:bg-primary/90" data-testid={`button-order-${product.id}`}>
                        Order Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Don't see what you're looking for?</h3>
            <p className="text-muted-foreground mb-6">
              We create custom laser-cut solutions for any project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/configurator">
                <Button className="bg-primary hover:bg-primary/90" data-testid="button-custom-configurator">
                  Use Custom Configurator
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-primary/50 text-primary" data-testid="button-contact-us">
                  Contact Us
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
