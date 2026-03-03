import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Categories } from '@/components/categories';
import { ProductGrid } from '@/components/product-grid';
import { Promo } from '@/components/promo';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <ProductGrid />
        <Promo />
      </main>
      <Footer />
    </div>
  );
}
