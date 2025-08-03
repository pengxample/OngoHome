import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { MapPin, DollarSign, Package, Users, Check } from "lucide-react";
import type { Store } from "@shared/schema";

export default function About() {
  const { data: stores } = useQuery<Store[]>({
    queryKey: ["/api/stores"],
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Create Google Maps embed URL showing Sweden with ONGO store locations
  const createMapsUrl = () => {
    // Center map on Sweden and show general area where ONGO stores are located
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2016128.2948634438!2d13.064453159648805!3d59.32932049314647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f763119640bcb%3A0xa80d27d3679d7766!2sSweden!5e0!3m2!1sen!2sse!4v1754245400000!5m2!1sen!2sse";
  };

  const values = [
    {
      icon: DollarSign,
      title: "Rätt pris",
      description: "Vi erbjuder kvalitetsprodukter till riktigt bra priser - utan dolda kostnader eller krångel."
    },
    {
      icon: Package,
      title: "Brett sortiment", 
      description: "Allt du behöver för hemmet och fritiden samlat på ett ställe - från trädgård till förvaring."
    },
    {
      icon: MapPin,
      title: "Fysiska butiker",
      description: "Med butiker från Göteborg till Sundsvall finns vi nära dig när du behöver oss."
    },
    {
      icon: Users,
      title: "Kundfokus",
      description: "Ingen registrering, inga medlemsavgifter - bara bra produkter och bra service."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center max-w-4xl mx-auto" {...fadeInUp}>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Om <span className="text-primary">ONGO</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Vi är den svenska butikskedjan som erbjuder allt för hemmet och fritiden 
              – alltid till rätt pris och utan krångel.
            </p>
            <Link href="/butiker">
              <Button className="ongo-btn-primary">
                Hitta din närmaste butik
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="ongo-section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Vår historia
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  ONGO grundades med en enkel vision: att göra kvalitetsprodukter för hemmet 
                  och fritiden tillgängliga för alla svenskar, oavsett var i landet de bor.
                </p>
                <p>
                  Vi tror på enkla lösningar. Därför hittar du allt du behöver i våra butiker 
                  - från praktiska förvaringslösningar till trädgårdsredskap och fritidsartiklar. 
                  Alltid till rätt pris, utan medlemskap eller krångel.
                </p>
                <p>
                  Idag har vi butiker från Göteborg till Sundsvall och fortsätter att växa 
                  för att vara nära våra kunder när de behöver oss.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="ONGO butik interiör" 
                className="rounded-2xl shadow-2xl w-full" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="ongo-section-padding bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Våra värderingar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Det här är vad som driver oss och vad du kan förvänta dig när du handlar hos ONGO
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {values.map((value, index) => (
              <motion.div key={value.title} variants={fadeInUp}>
                <Card className="ongo-card text-center h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="ongo-section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Vårt uppdrag
            </h2>
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12">
              <p className="text-xl lg:text-2xl text-foreground leading-relaxed mb-8">
                "Att göra vardagen enklare för svenska familjer genom att erbjuda 
                kvalitetsprodukter för hemmet och fritiden till rätt pris - 
                alltid nära dig, alltid utan krångel."
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="flex items-center justify-center">
                  <Check className="w-6 h-6 text-secondary mr-3" />
                  <span className="font-semibold text-foreground">Prisvärt</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-6 h-6 text-secondary mr-3" />
                  <span className="font-semibold text-foreground">Enkelt</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-6 h-6 text-secondary mr-3" />
                  <span className="font-semibold text-foreground">Nära dig</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Store Locations Map */}
      <section className="ongo-section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Våra butiker
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ONGO finns på strategiska platser från Göteborg till Sundsvall. 
              Hitta din närmaste butik på kartan nedan.
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="overflow-hidden shadow-2xl">
              <div className="h-96 lg:h-[500px] w-full">
                <iframe
                  src={createMapsUrl()}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ONGO Butiker"
                ></iframe>
              </div>
            </Card>
          </motion.div>

          {stores && (
            <motion.div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6" {...fadeInUp}>
              {stores.map((store, index) => (
                <Card key={store.id} className="ongo-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center">
                      <MapPin className="w-4 h-4 text-primary mr-2" />
                      {store.name}
                    </h3>
                    <p className="text-gray-600 mb-1">{store.address}</p>
                    <p className="text-gray-600 mb-3">{store.postalCode} {store.city}</p>
                    <p className="text-sm text-gray-500">{store.openingHours}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="ongo-section-padding bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Välkommen till ONGO
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Upptäck vårt sortiment och hitta din närmaste butik idag
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/butiker">
                <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Hitta butik
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold">
                  Se produkter
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
