import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Package, Layers, ShoppingCart, Mail, Star, Plus, Pencil, Trash2 } from "lucide-react";
import type { Product, Material, Order, Inquiry, ContactMessage, Testimonial } from "@shared/schema";
import { ProductDialog } from "@/components/admin/ProductDialog";
import { MaterialDialog } from "@/components/admin/MaterialDialog";
import { TestimonialDialog } from "@/components/admin/TestimonialDialog";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { toast } = useToast();
  const { data: products = [] } = useQuery<Product[]>({ queryKey: ["/api/products"] });
  const { data: materials = [] } = useQuery<Material[]>({ queryKey: ["/api/materials"] });
  const { data: orders = [] } = useQuery<Order[]>({ queryKey: ["/api/orders"] });
  const { data: inquiries = [] } = useQuery<Inquiry[]>({ queryKey: ["/api/inquiries"] });
  const { data: contacts = [] } = useQuery<ContactMessage[]>({ queryKey: ["/api/contact"] });
  const { data: testimonials = [] } = useQuery<Testimonial[]>({ queryKey: ["/api/testimonials"] });

  const [productDialog, setProductDialog] = useState<{ open: boolean; product?: Product }>({ open: false });
  const [materialDialog, setMaterialDialog] = useState<{ open: boolean; material?: Material }>({ open: false });
  const [testimonialDialog, setTestimonialDialog] = useState<{ open: boolean; testimonial?: Testimonial }>({ open: false });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type?: string; id?: string; name?: string }>({ open: false });

  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string; id: string }) => {
      return apiRequest("DELETE", `/api/${type}/${id}`);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [`/api/${variables.type}`] });
      if (variables.type === "testimonials") {
        queryClient.invalidateQueries({ queryKey: ["/api/testimonials/featured"] });
      }
      toast({
        title: "Deleted successfully",
        description: `Item has been removed.`,
      });
      setDeleteDialog({ open: false });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    if (deleteDialog.type && deleteDialog.id) {
      deleteMutation.mutate({ type: deleteDialog.type, id: deleteDialog.id });
    }
  };

  const stats = [
    { icon: ShoppingCart, label: "Total Orders", value: orders.length, color: "text-primary" },
    { icon: Mail, label: "Inquiries", value: inquiries.length, color: "text-blue-500" },
    { icon: Package, label: "Products", value: products.length, color: "text-green-500" },
    { icon: Layers, label: "Materials", value: materials.length, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your laser cutting business</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm" data-testid={`stat-${index}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="orders" data-testid="tab-orders">Orders</TabsTrigger>
            <TabsTrigger value="inquiries" data-testid="tab-inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="products" data-testid="tab-products">Products</TabsTrigger>
            <TabsTrigger value="materials" data-testid="tab-materials">Materials</TabsTrigger>
            <TabsTrigger value="contacts" data-testid="tab-contacts">Messages</TabsTrigger>
            <TabsTrigger value="testimonials" data-testid="tab-testimonials">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No orders yet</p>
                ) : (
                  orders.map((order) => (
                    <Card key={order.id} className="p-4 bg-background/50" data-testid={`order-${order.id}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{order.customerName}</h3>
                          <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                        </div>
                        <Badge variant="outline" className="border-primary/50 text-primary">
                          {order.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-3">
                        <div>
                          <span className="text-muted-foreground">Product:</span>
                          <p className="font-medium">{order.productType}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Material:</span>
                          <p className="font-medium">{order.material}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Quantity:</span>
                          <p className="font-medium">{order.quantity}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total:</span>
                          <p className="font-medium text-primary">Rs. {parseFloat(order.totalPrice).toLocaleString()}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Quote Requests</h2>
              <div className="space-y-4">
                {inquiries.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No inquiries yet</p>
                ) : (
                  inquiries.map((inquiry) => (
                    <Card key={inquiry.id} className="p-4 bg-background/50" data-testid={`inquiry-${inquiry.id}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{inquiry.name}</h3>
                          <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                        </div>
                        <Badge variant="outline">{inquiry.status}</Badge>
                      </div>
                      {inquiry.message && (
                        <p className="text-sm mt-2 text-muted-foreground">{inquiry.message}</p>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Product Catalog</h2>
                <Button
                  onClick={() => setProductDialog({ open: true })}
                  className="gap-2"
                  data-testid="button-add-product"
                >
                  <Plus className="h-4 w-4" /> Add Product
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="p-4 bg-background/50" data-testid={`admin-product-${product.id}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setProductDialog({ open: true, product })}
                          data-testid={`button-edit-product-${product.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteDialog({ open: true, type: "products", id: product.id, name: product.name })}
                          data-testid={`button-delete-product-${product.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-primary">
                      Rs. {parseFloat(product.basePrice).toLocaleString()}
                    </p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="materials">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Materials & Pricing</h2>
                <Button
                  onClick={() => setMaterialDialog({ open: true })}
                  className="gap-2"
                  data-testid="button-add-material"
                >
                  <Plus className="h-4 w-4" /> Add Material
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materials.map((material) => (
                  <Card key={material.id} className="p-4 bg-background/50" data-testid={`admin-material-${material.id}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{material.name}</h3>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setMaterialDialog({ open: true, material })}
                          data-testid={`button-edit-material-${material.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteDialog({ open: true, type: "materials", id: material.id, name: material.name })}
                          data-testid={`button-delete-material-${material.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Rs. {parseFloat(material.pricePerUnit).toLocaleString()}/{material.unit}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {material.availableThickness.map((thickness) => (
                        <Badge key={thickness} variant="outline" className="text-xs">
                          {thickness}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No messages yet</p>
                ) : (
                  contacts.map((contact) => (
                    <Card key={contact.id} className="p-4 bg-background/50" data-testid={`contact-${contact.id}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                        <Badge variant="outline">{contact.status}</Badge>
                      </div>
                      <p className="text-sm font-medium mt-2">{contact.subject}</p>
                      <p className="text-sm text-muted-foreground mt-1">{contact.message}</p>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Customer Testimonials</h2>
                <Button
                  onClick={() => setTestimonialDialog({ open: true })}
                  className="gap-2"
                  data-testid="button-add-testimonial"
                >
                  <Plus className="h-4 w-4" /> Add Testimonial
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="p-4 bg-background/50" data-testid={`admin-testimonial-${testimonial.id}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setTestimonialDialog({ open: true, testimonial })}
                          data-testid={`button-edit-testimonial-${testimonial.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteDialog({ open: true, type: "testimonials", id: testimonial.id, name: testimonial.name })}
                          data-testid={`button-delete-testimonial-${testimonial.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm mb-3 italic">"{testimonial.content}"</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        {testimonial.role && <p className="text-xs text-muted-foreground">{testimonial.role}</p>}
                      </div>
                      {testimonial.featured && (
                        <Badge variant="outline" className="text-xs">Featured</Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <ProductDialog
        open={productDialog.open}
        onOpenChange={(open) => setProductDialog({ open })}
        product={productDialog.product}
      />
      <MaterialDialog
        open={materialDialog.open}
        onOpenChange={(open) => setMaterialDialog({ open })}
        material={materialDialog.material}
      />
      <TestimonialDialog
        open={testimonialDialog.open}
        onOpenChange={(open) => setTestimonialDialog({ open })}
        testimonial={testimonialDialog.testimonial}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open })}>
        <AlertDialogContent data-testid="dialog-delete-confirm">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deleteDialog.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
