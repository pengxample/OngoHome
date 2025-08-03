import { type Category, type Product, type Campaign, type Store, type InsertCategory, type InsertProduct, type InsertCampaign, type InsertStore } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  
  // Products
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  
  // Campaigns
  getActiveCampaigns(): Promise<Campaign[]>;
  
  // Stores
  getStores(): Promise<Store[]>;
  getStoresByCity(city: string): Promise<Store[]>;
}

export class MemStorage implements IStorage {
  private categories: Map<string, Category>;
  private products: Map<string, Product>;
  private campaigns: Map<string, Campaign>;
  private stores: Map<string, Store>;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.campaigns = new Map();
    this.stores = new Map();
    this.seedData();
  }

  private seedData() {
    // Categories
    const categoriesData: InsertCategory[] = [
      {
        name: "Trädgård",
        slug: "tradgard",
        description: "Allt för utomhus",
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Städ",
        slug: "stad",
        description: "Rengöring & skötsel",
        imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5d854daa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Kök",
        slug: "kok",
        description: "Matlagning & förvaring",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Fritid",
        slug: "fritid",
        description: "Camping & utflykt",
        imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Badrum",
        slug: "badrum",
        description: "Sanitärt & tillbehör",
        imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Förvaring",
        slug: "forvaring",
        description: "Organisation & ordning",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      }
    ];

    categoriesData.forEach(cat => {
      const id = randomUUID();
      const category: Category = { 
        ...cat, 
        id,
        description: cat.description || null,
        imageUrl: cat.imageUrl || null
      };
      this.categories.set(id, category);
    });

    // Products
    const productsData: InsertProduct[] = [
      {
        name: "Trädgårdsset",
        slug: "tradgardsset",
        description: "Komplett set med de viktigaste verktygen för trädgården",
        price: 299,
        categoryId: Array.from(this.categories.values()).find(c => c.slug === "tradgard")?.id!,
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Köksredskap",
        slug: "koksredskap",
        description: "Kvalitetsverktyg som gör matlagningen enklare och roligare",
        price: 149,
        categoryId: Array.from(this.categories.values()).find(c => c.slug === "kok")?.id!,
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Förvaringslådor",
        slug: "forvaringslador",
        description: "Smarta förvaringslösningar för hemmet",
        price: 49,
        categoryId: Array.from(this.categories.values()).find(c => c.slug === "forvaring")?.id!,
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      }
    ];

    productsData.forEach(prod => {
      const id = randomUUID();
      const product: Product = { 
        ...prod, 
        id,
        description: prod.description || null,
        imageUrl: prod.imageUrl || null,
        price: prod.price || null,
        categoryId: prod.categoryId || null,
        available: prod.available ?? null
      };
      this.products.set(id, product);
    });

    // Campaigns
    const campaignsData: InsertCampaign[] = [
      {
        title: "Förvaringslösningar",
        description: "Skapa ordning hemma med våra smarta förvaringslösningar",
        price: 49,
        originalPrice: 89,
        campaignType: "KAMPANJ",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        title: "Trädgårdsset",
        description: "Komplett set med de viktigaste verktygen för trädgården",
        price: 299,
        originalPrice: 449,
        campaignType: "SPECIALPRIS",
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        title: "Köksredskap",
        description: "Kvalitetsverktyg som gör matlagningen enklare och roligare",
        price: 149,
        originalPrice: 199,
        campaignType: "KUNDFAVORIT",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      }
    ];

    campaignsData.forEach(camp => {
      const id = randomUUID();
      const campaign: Campaign = { 
        ...camp, 
        id,
        description: camp.description || null,
        imageUrl: camp.imageUrl || null,
        price: camp.price || null,
        originalPrice: camp.originalPrice || null,
        campaignType: camp.campaignType || null,
        active: camp.active ?? null
      };
      this.campaigns.set(id, campaign);
    });

    // Stores
    const storesData: InsertStore[] = [
      {
        name: "ONGO Stockholm",
        address: "Kungsgatan 12",
        city: "Stockholm",
        postalCode: "111 43",
        phone: "08-123 456 78",
        latitude: 59.3293,
        longitude: 18.0686,
        openingHours: "Mån-Fre 10-19, Lör 10-17, Sön 11-16"
      },
      {
        name: "ONGO Göteborg",
        address: "Avenyn 45",
        city: "Göteborg",
        postalCode: "411 36",
        phone: "031-123 456 78",
        latitude: 57.7089,
        longitude: 11.9746,
        openingHours: "Mån-Fre 10-19, Lör 10-17, Sön 11-16"
      },
      {
        name: "ONGO Malmö",
        address: "Södergatan 32",
        city: "Malmö",
        postalCode: "211 34",
        phone: "040-123 456 78",
        latitude: 55.6059,
        longitude: 13.0007,
        openingHours: "Mån-Fre 10-19, Lör 10-17, Sön 11-16"
      },
      {
        name: "ONGO Uppsala",
        address: "Stora Torget 8",
        city: "Uppsala",
        postalCode: "753 10",
        phone: "018-123 456 78",
        latitude: 59.8586,
        longitude: 17.6389,
        openingHours: "Mån-Fre 10-19, Lör 10-17, Sön 11-16"
      },
      {
        name: "ONGO Västerås",
        address: "Kopparbergsvägen 15",
        city: "Västerås",
        postalCode: "722 15",
        phone: "021-123 456 78",
        latitude: 59.6099,
        longitude: 16.5448,
        openingHours: "Mån-Fre 10-19, Lör 10-17, Sön 11-16"
      },
      {
        name: "ONGO Sundsvall",
        address: "Stora Gatan 22",
        city: "Sundsvall",
        postalCode: "852 30",
        phone: "060-123 456 78",
        latitude: 62.3908,
        longitude: 17.3069,
        openingHours: "Mån-Fre 10-19, Lör 10-17, Sön 11-16"
      }
    ];

    storesData.forEach(store => {
      const id = randomUUID();
      const storeRecord: Store = { 
        ...store, 
        id,
        phone: store.phone || null,
        latitude: store.latitude || null,
        longitude: store.longitude || null,
        openingHours: store.openingHours || null
      };
      this.stores.set(id, storeRecord);
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(prod => prod.categoryId === categoryId);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(prod => prod.slug === slug);
  }

  async getActiveCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).filter(camp => camp.active);
  }

  async getStores(): Promise<Store[]> {
    return Array.from(this.stores.values());
  }

  async getStoresByCity(city: string): Promise<Store[]> {
    return Array.from(this.stores.values()).filter(store => 
      store.city.toLowerCase().includes(city.toLowerCase())
    );
  }
}

export const storage = new MemStorage();
