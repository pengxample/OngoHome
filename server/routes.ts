import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Products
  app.get("/api/categories/:categoryId/products", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.categoryId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Campaigns
  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getActiveCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  // Stores
  app.get("/api/stores", async (req, res) => {
    try {
      const { city } = req.query;
      let stores;
      
      if (city && typeof city === 'string') {
        stores = await storage.getStoresByCity(city);
      } else {
        stores = await storage.getStores();
      }
      
      res.json(stores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stores" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
