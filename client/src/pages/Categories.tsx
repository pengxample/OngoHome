import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { Category } from "@shared/schema";

export default function Categories() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
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

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Alla <span className="text-primary">kategorier</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upptäck vårt kompletta sortiment för hemmet och fritiden. 
            Allt du behöver finns här – alltid till rätt pris!
          </p>
        </motion.div>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(14)].map((_, i) => (
              <div key={i} className="ongo-card p-6 text-center animate-pulse">
                <div className="w-full h-32 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {categories?.map((category) => {
              const isDeals = category.slug === "veckans-erbjudanden";
              return (
                <motion.div key={category.id} variants={fadeInUp}>
                  <Link href={`/kategori/${category.slug}`}>
                    <Card className={`ongo-card cursor-pointer group h-full ${isDeals ? 'border-2 border-accent bg-accent/5' : ''}`}>
                      <CardContent className="p-6 text-center">
                        {isDeals && (
                          <div className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase mb-3 inline-block">
                            DEALS
                          </div>
                        )}
                        <img 
                          src={category.imageUrl || ""} 
                          alt={category.name} 
                          className="w-full h-32 object-cover rounded-xl mb-4" 
                        />
                        <h3 className={`font-semibold mb-2 ${isDeals ? 'text-accent' : 'text-foreground'}`}>
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 min-h-[2.5rem]">
                          {category.description}
                        </p>
                        <div className={`font-medium group-hover:text-secondary transition-colors flex items-center justify-center ${isDeals ? 'text-accent' : 'text-primary'}`}>
                          Utforska <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div className="mt-20 text-center" {...fadeInUp}>
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Hitta det du söker?
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Besök en av våra butiker för att se vårt kompletta sortiment och få personlig hjälp från våra medarbetare.
              </p>
              <Link href="/butiker">
                <div className="inline-block bg-primary text-white hover:bg-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
                  Hitta närmaste butik
                </div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}