import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import * as motion from 'motion/react-client';
import { Button } from '@/components/ui/button';

export function Promo() {
  return (
    <section className="bg-zinc-950 text-zinc-50 py-24 md:py-32 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              The ultimate <br />
              <span className="text-emerald-400">retro console kit.</span>
            </h2>
            <p className="text-lg text-zinc-400 mb-8">
              Bundle the Raspberry Pi 5 with two 8BitDo SN30 Pro controllers and the Argon ONE case. Save 15%. Everything you need to build your dream arcade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="emerald" size="lg" shape="pill">
                Shop the Bundle
              </Button>
              <Button variant="outlineDark" size="lg" shape="pill">
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent mix-blend-overlay z-10" />
            <Image
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"
              alt="Retro Console Kit"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
