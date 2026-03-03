import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 transition-colors">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-zinc-900 dark:text-white">RetroBoard</span>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mb-8">
              Your destination for Raspberry Pi, 8BitDo controllers, and maker electronics. Build your dream projects today.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Raspberry Pi</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">8BitDo</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Arduino</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">RetroPie</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Warranty</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Newsletter</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 pl-10 pr-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                  required
                />
              </div>
              <Button type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 dark:text-zinc-400">
          <p>&copy; {new Date().getFullYear()} RetroBoard Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
