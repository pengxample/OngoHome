import { Link } from "wouter";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <Logo className="text-white" />
            </div>
            <p className="text-gray-400 mb-4">
              Allt du behöver för hemmet och fritiden – alltid till rätt pris!
            </p>
            <p className="text-sm text-gray-500">
              Butiker från Göteborg till Sundsvall
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produkter</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/kategori/tradgard"><span className="hover:text-primary transition-colors cursor-pointer">Trädgård</span></Link></li>
              <li><Link href="/kategori/stad"><span className="hover:text-primary transition-colors cursor-pointer">Städ</span></Link></li>
              <li><Link href="/kategori/kok"><span className="hover:text-primary transition-colors cursor-pointer">Kök</span></Link></li>
              <li><Link href="/kategori/fritid"><span className="hover:text-primary transition-colors cursor-pointer">Fritid</span></Link></li>
              <li><Link href="/kategori/badrum"><span className="hover:text-primary transition-colors cursor-pointer">Badrum</span></Link></li>
              <li><Link href="/kategori/forvaring"><span className="hover:text-primary transition-colors cursor-pointer">Förvaring</span></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Företaget</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/om-oss"><span className="hover:text-primary transition-colors cursor-pointer">Om oss</span></Link></li>
              <li><Link href="/butiker"><span className="hover:text-primary transition-colors cursor-pointer">Våra butiker</span></Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Karriär</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pressrum</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kundservice</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Öppettider</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Reklamation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integritetspolicy</a></li>
            </ul>
            
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Ring oss:</p>
              <p className="font-semibold text-primary">08-123 456 78</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ONGO AB. Alla rättigheter förbehållna.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
