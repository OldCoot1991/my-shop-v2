import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Star } from "lucide-react";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/products";

export function ProductGrid() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Featured Gear
            </h2>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-2xl">
              Discover our handpicked selection of single-board computers, retro
              controllers, and maker accessories.
            </p>
          </div>
          <button className="mt-6 md:mt-0 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4">
            View all products &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col rounded-2xl bg-white dark:bg-zinc-900 p-4 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800 transition-all hover:shadow-md hover:ring-zinc-300 dark:hover:ring-zinc-700"
            >
              {/* Full-card link — sits behind all interactive elements */}
              <Link
                href={`/product/${product.id}`}
                className="absolute inset-0 z-0 rounded-2xl"
                aria-label={product.name}
              />

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-5">
                {product.badge && (
                  <Badge className="absolute top-3 left-3 z-10">
                    {product.badge}
                  </Badge>
                )}
                {/* Heart button must be above the card link */}
                <button className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-950/80 text-zinc-500 dark:text-zinc-400 backdrop-blur-sm transition-colors hover:text-red-500 dark:hover:text-red-400">
                  <Heart className="h-4 w-4" />
                </button>
                {/* Image wrapped in a link so clicking it also navigates */}
                <Link
                  href={`/product/${product.id}`}
                  className="absolute inset-0 z-[1]"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </Link>
              </div>

              <div className="flex flex-col flex-grow gap-3 relative z-10 pointer-events-none">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-medium text-lg leading-tight text-zinc-900 dark:text-zinc-100">
                    {product.name}
                  </h3>
                  <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                    {product.price}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    {product.rating}
                  </span>
                  <span>({product.reviews} reviews)</span>
                </div>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                  {product.specs.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-2 pointer-events-auto relative z-10">
                  <Button
                    variant="secondary"
                    shape="xl"
                    className="w-full gap-2 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
