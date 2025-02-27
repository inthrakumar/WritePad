'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { EnhancedTypewriterEffect } from '@/components/ui/Home/typewriter';
import logo from '../../public/assest.jpeg';
import MarqueeSection from '@/components/ui/Home/marqueesection';
import { FeaturesSection } from '@/components/ui/Home/featuresection';
import StatsShowcase from '@/components/ui/Home/statssection';
import { HyperText } from '@/components/magicui/hyper-text';
export default function LandingPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const words = [
    {
      text: 'Write',
    },
    {
      text: 'Collabarate',
    },
    {
      text: 'Create',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-orange-50 to-white px-4 pt-16">
        <div className="container relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <motion.h1
              className="mb-10 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EnhancedTypewriterEffect repeat={true} words={words} />
            </motion.h1>
            <motion.p
              className="mb-8 text-lg text-neutral-600 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A powerful text editor designed for modern teams.
            </motion.p>
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/documents">
                <Button
                  size="lg"
                  className="gap-2 bg-orange-600 text-white hover:bg-orange-700"
                >
                  Start Writing <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative aspect-square w-full rounded-2xl bg-white p-4 shadow-2xl">
              <Image
                src={logo}
                alt="Editor Preview"
                fill
                className="rounded-xl object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-orange-600 p-4" />
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl bg-neutral-900 p-4" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={ref} className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto mb-16 max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-4xl font-bold sm:text-4xl">
              <HyperText> Everything you need to write better </HyperText>
            </h2>
            <p className="text-neutral-600">
              Powerful features that help you write, edit, and collaborate with
              ease.
            </p>
          </motion.div>
          <FeaturesSection />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">
            <HyperText>Our Impact in Numbers</HyperText>
          </h2>
          <StatsShowcase />
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">
            <HyperText> Loved by Writers WorldWide </HyperText>
          </h2>
          <MarqueeSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12 pt-4">
        <div className="container mx-auto px-4">
          <div className="mt-12 text-center text-sm text-neutral-600">
            © {new Date().getFullYear()} Write Pad. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
