import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import Product from "@/pages/Product";
import About from "@/pages/About";
import Stores from "@/pages/Stores";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/kategori/:slug" component={Category}/>
      <Route path="/produkt/:slug" component={Product}/>  
      <Route path="/om-oss" component={About}/>
      <Route path="/butiker" component={Stores}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1">
            <Router />
          </div>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
