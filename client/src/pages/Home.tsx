import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, MapPin, Store, Phone } from "lucide-react";
import type { Category, Campaign } from "@shared/schema";

export default function Home() {
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: campaigns, isLoading: campaignsLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
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
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-8" {...fadeInUp}>
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Allt du behöver för{" "}
                  <span className="text-primary">hemmet</span> och{" "}
                  <span className="text-secondary">fritiden</span>
                </h1>
                <p className="text-xl lg:text-2xl font-semibold text-primary mt-4">
                  – alltid till rätt pris!
                </p>
              </div>
              
              <p className="text-lg text-gray-600 max-w-lg">
                Prisvärd kvalitet utan krångel. Besök våra butiker från Göteborg till Sundsvall och upptäck vårt sortiment för hem och fritid.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="ongo-btn-primary">
                  Se våra erbjudanden i butik
                </Button>
                <Link href="/butiker">
                  <Button variant="outline" className="ongo-btn-secondary">
                    Hitta närmaste butik
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern Swedish home interior" 
                className="rounded-2xl shadow-2xl w-full" 
              />
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-accent text-white px-6 py-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-sm font-medium">Från</div>
                <div className="text-2xl font-bold">199:-</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="ongo-section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Utforska våra kategorier
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Allt du behöver för ett bättre hem och roligare fritid – samlat på ett ställe
            </p>
          </motion.div>

          {categoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
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
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {categories?.map((category) => {
                const isDeals = category.slug === "veckans-erbjudanden";
                return (
                  <motion.div key={category.id} variants={fadeInUp}>
                    <Link href={`/kategori/${category.slug}`}>
                      <Card className={`ongo-card cursor-pointer group ${isDeals ? 'border-2 border-accent bg-accent/5' : ''}`}>
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
                          <p className="text-sm text-gray-500 mb-4">{category.description}</p>
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
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="ongo-section-padding bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Veckans erbjudanden
            </h2>
            <p className="text-lg text-gray-600">
              Upptäck våra bästa priser - bara i butik!
            </p>
          </motion.div>

          {campaignsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="ongo-card animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {campaigns?.map((campaign) => (
                <motion.div key={campaign.id} variants={fadeInUp}>
                  <Card className="ongo-card overflow-hidden">
                    <img 
                      src={campaign.imageUrl || ""} 
                      alt={campaign.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                          {campaign.campaignType}
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {campaign.price}:-
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {campaign.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {campaign.description}
                      </p>
                      <Button className="bg-secondary text-white hover:bg-green-600 w-full">
                        Finns i butik
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="ongo-section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Så här fungerar det
            </h2>
            <p className="text-lg text-gray-600">
              Enkelt, prisvärt och utan krångel
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div className="text-center group" variants={fadeInUp}>
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                <Store className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Gå in i butik</h3>
              <p className="text-gray-600 mb-4">
                Hitta din närmaste ONGO-butik och kom förbi när det passar dig
              </p>
              <div className="inline-flex items-center text-secondary font-medium">
                <Check className="w-5 h-5 mr-2" />
                Enkelt
              </div>
            </motion.div>

            <motion.div className="text-center group" variants={fadeInUp}>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Ta del av våra låga priser</h3>
              <p className="text-gray-600 mb-4">
                Upptäck kvalitetsprodukter till riktigt bra priser för hem och fritid
              </p>
              <div className="inline-flex items-center text-secondary font-medium">
                <Check className="w-5 h-5 mr-2" />
                Prisvärt
              </div>
            </motion.div>

            <motion.div className="text-center group" variants={fadeInUp}>
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                <Check className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Inget medlemskap behövs</h3>
              <p className="text-gray-600 mb-4">
                Inga krångliga registreringar eller medlemsavgifter - bara bra priser direkt
              </p>
              <div className="inline-flex items-center text-secondary font-medium">
                <Check className="w-5 h-5 mr-2" />
                Utan krångel
              </div>
            </motion.div>

            <motion.div className="text-center group" variants={fadeInUp}>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Byggt för hela Sverige</h3>
              <p className="text-gray-600 mb-4">
                Med butiker från Göteborg till Sundsvall finns vi nära dig
              </p>
              <div className="inline-flex items-center text-secondary font-medium">
                <Check className="w-5 h-5 mr-2" />
                Nära dig
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Store Finder CTA */}
      <section className="ongo-section-padding bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Hitta din närmaste ONGO-butik
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Med butiker från Göteborg till Sundsvall finns vi nära dig. 
              Se öppettider och hitta din närmaste butik.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/butiker">
                <Button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <MapPin className="w-6 h-6 mr-2" />
                  Sök butiker
                </Button>
              </Link>
              
              <div className="text-white/90 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                eller ring <strong className="text-white ml-1">08-123 456 78</strong>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-white/80 mb-4">Populära orter:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Stockholm", "Göteborg", "Malmö", "Uppsala", "Västerås", "Sundsvall"].map((city) => (
                  <button key={city} className="text-white hover:text-white/80 transition-colors underline">
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
