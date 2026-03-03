import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Share2,
} from "lucide-react";
import { getProductById } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import * as motion from "motion/react-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-8 pb-12 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 mb-8 transition-colors"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800"
            >
              {product.badge && (
                <Badge className="absolute top-6 left-6 z-10 px-3 py-1 text-sm">
                  {product.badge}
                </Badge>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-zinc-300 dark:text-zinc-700"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {product.rating}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      ({product.reviews} verified reviews)
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="icon" shape="pill">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon" shape="pill">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
                {product.price}
              </div>

              <div className="space-y-6 mb-10">
                <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {product.longDescription}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  shape="xl"
                  className="flex-1 gap-2 h-14 text-lg"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  shape="xl"
                  className="flex-1 h-14 text-lg"
                >
                  Buy Now
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-8 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="h-6 w-6 text-zinc-400" />
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                    Free Shipping
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RotateCcw className="h-6 w-6 text-zinc-400" />
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                    30-Day Returns
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-zinc-400" />
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                    2-Year Warranty
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Technical Specs Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-24 pt-24 border-t border-zinc-200 dark:border-zinc-800"
          >
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-12">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
              {product.specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between py-4 border-b border-zinc-100 dark:border-zinc-900"
                >
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {spec.split(":")[0]}
                  </span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {spec.split(":")[1] || "Included"}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
