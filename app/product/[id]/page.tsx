import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { dictionaries, Lang } from "@/lib/i18n/dictionaries";
import {
  ChevronLeft,
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  Cpu,
  Zap,
  MonitorPlay,
  Wifi,
  Gamepad2,
  Sprout,
  Home,
  Bot,
  Play,
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

  const cookieStore = await cookies();
  const langCookie = cookieStore.get("NEXT_LOCALE");
  const lang = (langCookie?.value === "en" ? "en" : "ru") as Lang;
  const dict = dictionaries[lang];
  
  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = dict;
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    return typeof value === "string" ? value : key;
  };

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

          {/* Raspberry Pi 5 Presentation Section */}
          {product.id === 1 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-24 mb-12 rounded-3xl overflow-hidden bg-zinc-950 dark:bg-black text-white relative flex flex-col ring-1 ring-zinc-800 shadow-2xl"
            >
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-fuchsia-600/20 blur-[100px] opacity-70 pointer-events-none transition-opacity duration-700"></div>
              <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[100px] opacity-70 pointer-events-none transition-opacity duration-700"></div>

              <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 flex flex-col items-center text-center">
                <span className="inline-flex items-center rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-fuchsia-400 mb-8 uppercase">
                  {t("pi5.nextGen")}
                </span>
                
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 font-display bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-600">
                  {t("pi5.title1")}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-500">{t("pi5.title2")}</span>
                </h2>
                
                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-16 leading-relaxed">
                  {t("pi5.subtitle")}
                </p>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
                  {/* Card 1 */}
                  <div className="col-span-1 md:col-span-2 bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 md:p-10 hover:bg-zinc-900 transition-colors group">
                    <div className="h-12 w-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-8 border border-rose-500/20 group-hover:scale-110 transition-transform">
                      <Cpu className="h-6 w-6 text-rose-500" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3 text-white">{t("pi5.cpuBoost")}</h3>
                    <p className="text-zinc-400 text-lg">{t("pi5.cpuDesc")}</p>
                  </div>

                  {/* Card 2 */}
                  <div className="col-span-1 bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 md:p-10 hover:bg-zinc-900 transition-colors group flex flex-col justify-between">
                    <div>
                      <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-8 border border-amber-500/20 group-hover:scale-110 transition-transform">
                        <Zap className="h-6 w-6 text-amber-500" />
                      </div>
                      <p className="text-zinc-500 font-semibold uppercase tracking-wider text-sm mb-2">{t("pi5.gpuLabel")}</p>
                    </div>
                    <div>
                      <h3 className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">800<span className="text-2xl">MHz</span></h3>
                      <p className="text-zinc-300 font-medium">{t("pi5.gpuDesc")}</p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="col-span-1 bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 md:p-10 hover:bg-zinc-900 transition-colors group flex flex-col justify-between">
                    <div>
                      <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform">
                        <MonitorPlay className="h-6 w-6 text-blue-500" />
                      </div>
                      <p className="text-zinc-500 font-semibold uppercase tracking-wider text-sm mb-2">{t("pi5.displayLabel")}</p>
                    </div>
                    <div>
                      <h3 className="text-4xl font-black mb-2 text-blue-400">Dual 4K</h3>
                      <p className="text-zinc-300 font-medium">{t("pi5.displayDesc")}</p>
                    </div>
                  </div>

                  {/* Card 4 - Wide Area */}
                  <div className="col-span-1 md:col-span-4 bg-gradient-to-r from-zinc-900/80 to-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 md:p-12 mb-6 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none"></div>
                    <div className="max-w-2xl relative z-10">
                      <div className="flex gap-4 mb-8">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                          <Wifi className="h-6 w-6 text-indigo-400" />
                        </div>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">{t("pi5.connTitle")}</h3>
                      <p className="text-zinc-400 text-lg leading-relaxed">
                        {t("pi5.connDesc")}
                      </p>
                    </div>
                    <div className="relative z-10 flex-shrink-0">
                      <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_80px_rgba(99,102,241,0.2)]">
                        <div className="absolute inset-0 rounded-full border border-indigo-400/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                        <span className="text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 to-purple-400">PCIe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Raspberry Pi 5 Use Cases & Video Ad Section */}
          {product.id === 1 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-24 flex flex-col gap-12"
            >
              <div className="text-center max-w-3xl mx-auto mb-8">
                <h2 className="text-3xl md:text-5xl font-black mb-6 text-zinc-900 dark:text-zinc-50 tracking-tight">{t("pi5.possibilities")}</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  {t("pi5.possSubtitle")}
                </p>
              </div>

              {/* Use Cases Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-3xl p-8 hover:shadow-lg transition-all group">
                  <div className="h-12 w-12 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                    <Gamepad2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">{t("pi5.retroTitle")}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t("pi5.retroDesc")}
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-3xl p-8 hover:shadow-lg transition-all group">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <Sprout className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">{t("pi5.agriTitle")}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t("pi5.agriDesc")}
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-3xl p-8 hover:shadow-lg transition-all group">
                  <div className="h-12 w-12 rounded-2xl bg-sky-100 dark:bg-sky-500/10 flex items-center justify-center mb-6 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                    <Home className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">{t("pi5.homeTitle")}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t("pi5.homeDesc")}
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-3xl p-8 hover:shadow-lg transition-all group">
                  <div className="h-12 w-12 rounded-2xl bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center mb-6 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                    <Bot className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">{t("pi5.roboTitle")}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t("pi5.roboDesc")}
                  </p>
                </div>

              </div>

              {/* Video Ad Mockup */}
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-800 group cursor-pointer shadow-xl mt-8">
                <Image
                  src="/images/pi5_video_thumb.png"
                  alt="Raspberry Pi 5 Promotional Video"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-8 w-8 text-white fill-white ml-2" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 rounded-full">
                    {t("pi5.videoBadge")}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white shadow-sm">{t("pi5.videoTitle")}</h3>
                  <p className="text-zinc-200 mt-2 font-medium">{t("pi5.videoDesc")}</p>
                </div>
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </>
  );
}
