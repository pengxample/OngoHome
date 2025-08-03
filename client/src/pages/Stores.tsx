import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Clock, Search } from "lucide-react";
import type { Store } from "@shared/schema";

export default function Stores() {
  const [searchCity, setSearchCity] = useState("");

  const { data: stores, isLoading } = useQuery<Store[]>({
    queryKey: ["/api/stores", searchCity],
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

  const filteredStores = stores?.filter(store => 
    searchCity === "" || 
    store.city.toLowerCase().includes(searchCity.toLowerCase()) ||
    store.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  const popularCities = ["Stockholm", "Göteborg", "Malmö", "Uppsala", "Västerås", "Sundsvall"];

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Hitta din <span className="text-primary">ONGO</span>-butik
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Med butiker från Göteborg till Sundsvall finns vi nära dig. 
            Välj den butik som passar dig bäst.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Sök efter stad eller butik..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </motion.div>

        {/* Popular Cities */}
        {!searchCity && (
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <p className="text-gray-600 mb-4">Populära orter:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularCities.map((city) => (
                <Button
                  key={city}
                  variant="outline"
                  onClick={() => setSearchCity(city)}
                  className="hover:bg-primary hover:text-white hover:border-primary"
                >
                  {city}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stores Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-10 bg-gray-200 rounded mt-4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredStores && filteredStores.length > 0 ? (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredStores.map((store) => (
              <motion.div key={store.id} variants={fadeInUp}>
                <Card className="ongo-card h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground flex items-center">
                      <MapPin className="w-5 h-5 text-primary mr-2" />
                      {store.name}
                    </CardTitle>
                    <p className="text-lg font-semibold text-secondary">
                      {store.city}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-gray-600">{store.address}</p>
                          <p className="text-gray-600">{store.postalCode} {store.city}</p>
                        </div>
                      </div>

                      {store.phone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-400 mr-3" />
                          <a 
                            href={`tel:${store.phone}`}
                            className="text-primary hover:underline"
                          >
                            {store.phone}
                          </a>
                        </div>
                      )}

                      {store.openingHours && (
                        <div className="flex items-start">
                          <Clock className="w-4 h-4 text-gray-400 mr-3 mt-1" />
                          <p className="text-gray-600 text-sm">
                            {store.openingHours}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 space-y-2">
                      {store.latitude && store.longitude && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => window.open(`https://maps.google.com/?q=${store.latitude},${store.longitude}`, '_blank')}
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Visa på karta
                        </Button>
                      )}
                      
                      {store.phone && (
                        <Button 
                          className="w-full bg-secondary text-white hover:bg-green-600"
                          onClick={() => window.open(`tel:${store.phone}`)}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Ring butiken
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div className="text-center py-20" {...fadeInUp}>
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Inga butiker hittades
              </h3>
              <p className="text-gray-600 mb-6">
                Vi hittade inga butiker som matchar din sökning. Prova att söka efter en annan stad.
              </p>
              <Button 
                variant="outline"
                onClick={() => setSearchCity("")}
              >
                Visa alla butiker
              </Button>
            </div>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div className="mt-20 text-center" {...fadeInUp}>
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Har du frågor?
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Kontakta oss så hjälper vi dig att hitta rätt eller svarar på dina frågor om våra produkter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button className="bg-primary text-white hover:bg-orange-600">
                  <Phone className="w-4 h-4 mr-2" />
                  Ring 08-123 456 78
                </Button>
                <p className="text-gray-600">
                  Vardagar 9-17, Helger stängt
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
