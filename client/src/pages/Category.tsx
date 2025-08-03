import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Category, Product } from "@shared/schema";

export default function CategoryPage() {
  const { slug } = useParams();

  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: ["/api/categories", slug],
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/categories", category?.id, "products"],
    enabled: !!category?.id,
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (categoryLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-card">
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Kategori inte hittad</h1>
          <p className="text-lg text-gray-600 mb-8">Kategorin du söker efter existerar inte.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tillbaka till startsidan
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp}>
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tillbaka
            </Button>
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600">
              {category.description}
            </p>
          </div>
        </motion.div>

        {productsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-card animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-20 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <Link href={`/produkt/${product.slug}`}>
                  <Card className="ongo-card cursor-pointer group overflow-hidden">
                    <div className="relative">
                      <img 
                        src={product.imageUrl || ""} 
                        alt={product.name} 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="bg-white/90 text-foreground px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Finns i butik
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      {product.price && (
                        <p className="text-2xl font-bold text-primary mb-4">
                          {product.price}:-
                        </p>
                      )}
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-secondary group-hover:text-white group-hover:border-secondary"
                      >
                        Se mer
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div className="text-center py-20" {...fadeInUp}>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Inga produkter hittades
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Vi arbetar på att fylla denna kategori med fler produkter.
            </p>
            <Link href="/butiker">
              <Button className="bg-primary text-primary-foreground hover:bg-orange-600">
                Besök våra butiker
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}
