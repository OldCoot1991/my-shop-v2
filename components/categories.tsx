import { Cpu, Gamepad2, Monitor, Box, Wrench, Cable } from 'lucide-react';
import * as motion from 'motion/react-client';

const categories = [
  { name: 'Boards', icon: Cpu, count: '24 Products' },
  { name: 'Controllers', icon: Gamepad2, count: '46 Products' },
  { name: 'Displays', icon: Monitor, count: '12 Products' },
  { name: 'Cases', icon: Box, count: '38 Products' },
  { name: 'DIY Kits', icon: Wrench, count: '15 Products' },
  { name: 'Accessories', icon: Cable, count: '112 Products' },
];

export function Categories() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950 border-y border-zinc-100 dark:border-zinc-800/50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-10 text-center"
        >
          Shop by Category
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700 transition-transform group-hover:scale-110 group-hover:text-zinc-900 dark:group-hover:text-white">
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{category.name}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{category.count}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
