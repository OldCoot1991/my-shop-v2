import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import * as motion from 'motion/react-client';
import { Button } from '@/components/ui/button';
import { badgeVariants } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-900 text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920"
          alt="Hero background"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-24 md:px-6 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={badgeVariants({ variant: "glass", className: "mb-6" })}
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
            New Arrival: Raspberry Pi 5
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl mb-6"
          >
            Build. Play. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Relive.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl text-lg text-zinc-400 mb-10"
          >
            The ultimate destination for makers and retro gamers. Discover the latest single-board computers, premium 8BitDo controllers, and DIY kits.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="white" size="lg" shape="pill">
              Shop Boards
            </Button>
            <Button variant="outlineDark" size="lg" shape="pill">
              View Controllers <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
