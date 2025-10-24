import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertMaterialSchema, type InsertMaterial, type Material } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type MaterialDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material?: Material;
};

export function MaterialDialog({ open, onOpenChange, material }: MaterialDialogProps) {
  const { toast } = useToast();
  const isEdit = !!material;
  const [thicknessInput, setThicknessInput] = useState("");

  const form = useForm<InsertMaterial>({
    resolver: zodResolver(insertMaterialSchema),
    defaultValues: material || {
      name: "",
      pricePerUnit: "0",
      unit: "sq ft",
      availableThickness: [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertMaterial) => {
      if (isEdit) {
        return apiRequest("PUT", `/api/materials/${material.id}`, data);
      } else {
        return apiRequest("POST", "/api/materials", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/materials"] });
      toast({
        title: isEdit ? "Material updated" : "Material created",
        description: `${form.getValues("name")} has been ${isEdit ? "updated" : "created"} successfully.`,
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

  const addThickness = () => {
    if (thicknessInput.trim()) {
      const current = form.getValues("availableThickness");
      if (!current.includes(thicknessInput.trim())) {
        form.setValue("availableThickness", [...current, thicknessInput.trim()]);
      }
      setThicknessInput("");
    }
  };

  const removeThickness = (thickness: string) => {
    const current = form.getValues("availableThickness");
    form.setValue("availableThickness", current.filter(t => t !== thickness));
  };

  const handleSubmit = (data: InsertMaterial) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" data-testid="dialog-material">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Material" : "Create Material"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Acrylic" data-testid="input-material-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pricePerUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Per Unit (Rs.)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        step="0.01"
                        placeholder="0.00"
                        data-testid="input-material-price"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., sq ft" data-testid="input-material-unit" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="availableThickness"
              render={() => (
                <FormItem>
                  <FormLabel>Available Thickness</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      value={thicknessInput}
                      onChange={(e) => setThicknessInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addThickness();
                        }
                      }}
                      placeholder="e.g., 3mm"
                      data-testid="input-thickness"
                    />
                    <Button type="button" onClick={addThickness} data-testid="button-add-thickness">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("availableThickness").map((thickness) => (
                      <Badge key={thickness} variant="outline" className="gap-1" data-testid={`badge-thickness-${thickness}`}>
                        {thickness}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeThickness(thickness)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
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
                data-testid="button-save-material"
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
