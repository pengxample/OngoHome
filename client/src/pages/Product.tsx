import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import type { Product } from "@shared/schema";

export default function ProductPage() {
  const { slug } = useParams();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", slug],
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="w-full h-96 bg-gray-200 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-32"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                <div className="h-12 bg-gray-200 rounded w-48"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Produkt inte hittad</h1>
          <p className="text-lg text-gray-600 mb-8">Produkten du söker efter existerar inte.</p>
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
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img 
                src={product.imageUrl || ""} 
                alt={product.name} 
                className="w-full h-96 object-cover rounded-2xl shadow-lg" 
              />
            </div>
          </motion.div>

          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              {product.price && (
                <div className="text-3xl font-bold text-primary mb-6">
                  {product.price}:-
                </div>
              )}
            </div>

            {product.description && (
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Beskrivning</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <Card className="bg-secondary/5 border-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Tillgänglig i utvalda butiker</h3>
                    <p className="text-gray-600">Besök din närmaste ONGO-butik</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link href="/butiker">
                    <Button className="bg-secondary text-white hover:bg-green-600 w-full">
                      <Clock className="w-4 h-4 mr-2" />
                      Se öppettider
                    </Button>
                  </Link>
                  <Link href="/butiker">
                    <Button variant="outline" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Hitta närmaste butik
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-3">Varför handla hos ONGO?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Alltid rätt pris - inga dolda kostnader
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  Kvalitetsprodukter för hem och fritid
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Inget medlemskap behövs
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  Butiker från Göteborg till Sundsvall
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
