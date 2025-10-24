import {
  type Product, type InsertProduct,
  type Material, type InsertMaterial,
  type Order, type InsertOrder,
  type Inquiry, type InsertInquiry,
  type Testimonial, type InsertTestimonial,
  type ContactMessage, type InsertContactMessage,
  type User, type InsertUser
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Materials
  getMaterials(): Promise<Material[]>;
  getMaterial(id: string): Promise<Material | undefined>;
  createMaterial(material: InsertMaterial): Promise<Material>;
  updateMaterial(id: string, material: Partial<InsertMaterial>): Promise<Material | undefined>;
  deleteMaterial(id: string): Promise<boolean>;

  // Orders
  getOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, order: Partial<InsertOrder>): Promise<Order | undefined>;

  // Inquiries
  getInquiries(): Promise<Inquiry[]>;
  getInquiry(id: string): Promise<Inquiry | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  updateInquiry(id: string, inquiry: Partial<InsertInquiry>): Promise<Inquiry | undefined>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;

  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  updateContactMessage(id: string, message: Partial<InsertContactMessage>): Promise<ContactMessage | undefined>;

  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product> = new Map();
  private materials: Map<string, Material> = new Map();
  private orders: Map<string, Order> = new Map();
  private inquiries: Map<string, Inquiry> = new Map();
  private testimonials: Map<string, Testimonial> = new Map();
  private contactMessages: Map<string, ContactMessage> = new Map();
  private users: Map<string, User> = new Map();

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample products
    const sampleProducts: Product[] = [
      { id: "1", name: "3D LED Signboard", description: "Illuminated acrylic signboard with LED backing", category: "3d-signs", basePrice: "15000", imageUrl: null, featured: true },
      { id: "2", name: "Acrylic Nameplate", description: "Premium custom nameplate for home or office", category: "corporate", basePrice: "2500", imageUrl: null, featured: true },
      { id: "3", name: "Wooden Wall Art", description: "Laser-cut decorative wall panel", category: "home-decor", basePrice: "8000", imageUrl: null, featured: true },
      { id: "4", name: "Custom Keychain", description: "Personalized acrylic or wood keychain", category: "gifts", basePrice: "500", imageUrl: null, featured: false },
    ];
    sampleProducts.forEach(p => this.products.set(p.id, p));

    // Sample materials
    const sampleMaterials: Material[] = [
      { id: "1", name: "Acrylic", pricePerUnit: "200", unit: "sqft", availableThickness: ["3mm", "5mm", "8mm", "10mm"] },
      { id: "2", name: "MDF", pricePerUnit: "150", unit: "sqft", availableThickness: ["3mm", "6mm", "12mm"] },
      { id: "3", name: "Wood", pricePerUnit: "250", unit: "sqft", availableThickness: ["3mm", "6mm", "9mm"] },
      { id: "4", name: "Metal", pricePerUnit: "400", unit: "sqft", availableThickness: ["1mm", "2mm", "3mm"] },
    ];
    sampleMaterials.forEach(m => this.materials.set(m.id, m));

    // Sample testimonials
    const sampleTestimonials: Testimonial[] = [
      { id: "1", name: "Ahmed Khan", role: "Restaurant Owner", content: "LaserCut.pk created an amazing LED signboard for my restaurant. The quality is exceptional!", rating: 5, imageUrl: null, featured: true },
      { id: "2", name: "Fatima Ali", role: "Interior Designer", content: "Their laser-cut wall art transformed my client's living room. Highly recommend!", rating: 5, imageUrl: null, featured: true },
      { id: "3", name: "Hassan Malik", role: "Business Owner", content: "Fast delivery and excellent craftsmanship. Perfect for corporate gifts!", rating: 5, imageUrl: null, featured: true },
    ];
    sampleTestimonials.forEach(t => this.testimonials.set(t.id, t));

    // Admin user
    this.users.set("admin", { id: "admin", email: "autoc639@gmail.com", password: "admin123", isAdmin: true });
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, update: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    const updated = { ...product, ...update };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // Materials
  async getMaterials(): Promise<Material[]> {
    return Array.from(this.materials.values());
  }

  async getMaterial(id: string): Promise<Material | undefined> {
    return this.materials.get(id);
  }

  async createMaterial(insertMaterial: InsertMaterial): Promise<Material> {
    const id = randomUUID();
    const material: Material = { ...insertMaterial, id };
    this.materials.set(id, material);
    return material;
  }

  async updateMaterial(id: string, update: Partial<InsertMaterial>): Promise<Material | undefined> {
    const material = this.materials.get(id);
    if (!material) return undefined;
    const updated = { ...material, ...update };
    this.materials.set(id, updated);
    return updated;
  }

  async deleteMaterial(id: string): Promise<boolean> {
    return this.materials.delete(id);
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { ...insertOrder, id, createdAt: new Date() };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: string, update: Partial<InsertOrder>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    const updated = { ...order, ...update };
    this.orders.set(id, updated);
    return updated;
  }

  // Inquiries
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getInquiry(id: string): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = { ...insertInquiry, id, createdAt: new Date() };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async updateInquiry(id: string, update: Partial<InsertInquiry>): Promise<Inquiry | undefined> {
    const inquiry = this.inquiries.get(id);
    if (!inquiry) return undefined;
    const updated = { ...inquiry, ...update };
    this.inquiries.set(id, updated);
    return updated;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.featured);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async updateTestimonial(id: string, update: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const testimonial = this.testimonials.get(id);
    if (!testimonial) return undefined;
    const updated = { ...testimonial, ...update };
    this.testimonials.set(id, updated);
    return updated;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { ...insertMessage, id, createdAt: new Date() };
    this.contactMessages.set(id, message);
    return message;
  }

  async updateContactMessage(id: string, update: Partial<InsertContactMessage>): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (!message) return undefined;
    const updated = { ...message, ...update };
    this.contactMessages.set(id, updated);
    return updated;
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
