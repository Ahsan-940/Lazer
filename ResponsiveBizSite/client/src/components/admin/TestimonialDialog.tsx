import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { insertTestimonialSchema, type InsertTestimonial, type Testimonial } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type TestimonialDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial?: Testimonial;
};

export function TestimonialDialog({ open, onOpenChange, testimonial }: TestimonialDialogProps) {
  const { toast } = useToast();
  const isEdit = !!testimonial;

  const form = useForm<InsertTestimonial>({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: testimonial || {
      name: "",
      role: "",
      content: "",
      rating: 5,
      featured: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertTestimonial) => {
      if (isEdit) {
        return apiRequest("PUT", `/api/testimonials/${testimonial.id}`, data);
      } else {
        return apiRequest("POST", "/api/testimonials", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials/featured"] });
      toast({
        title: isEdit ? "Testimonial updated" : "Testimonial created",
        description: `Review from ${form.getValues("name")} has been ${isEdit ? "updated" : "created"} successfully.`,
      });
      onOpenChange(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertTestimonial) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" data-testid="dialog-testimonial">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Testimonial" : "Create Testimonial"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Ahmed Khan" data-testid="input-testimonial-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role/Company (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} placeholder="e.g., CEO at XYZ" data-testid="input-testimonial-role" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="What did the customer say..." 
                      rows={4}
                      data-testid="input-testimonial-content"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (1-5)</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="number" 
                      min="1"
                      max="5"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      data-testid="input-testimonial-rating"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Featured on Homepage</FormLabel>
                    <FormDescription>
                      Display this testimonial on the homepage
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                      data-testid="switch-testimonial-featured"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={mutation.isPending}
                data-testid="button-save-testimonial"
              >
                {mutation.isPending ? "Saving..." : isEdit ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
