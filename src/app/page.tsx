"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Edit3, Share2, Shield, Zap, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: <Edit3 className="h-6 w-6" />,
      title: "Rich Text Editing",
      description: "Powerful WYSIWYG editor with markdown support and formatting tools.",
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time, see changes as they happen.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Storage",
      description: "Your documents are encrypted and securely stored in the cloud.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Optimized for performance, loads instantly, works offline.",
    },
  ]

  const testimonials = [
    {
      quote: "Write Pad has transformed how our team collaborates on documents. It's incredibly intuitive!",
      author: "Sarah Johnson",
      role: "Product Manager",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      quote: "The real-time editing feature is a game-changer. Best writing tool I've used in years.",
      author: "Michael Chen",
      role: "Content Creator",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      quote: "Clean interface, powerful features. Write Pad is now an essential part of my workflow.",
      author: "Emma Davis",
      role: "Technical Writer",
      avatar: "/placeholder.svg?height=64&width=64",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-orange-50 to-white px-4 pt-16">
        <div className="container relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <motion.h1
              className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Write, Collaborate, Create{" "}
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Together
              </span>
            </motion.h1>
            <motion.p
              className="mb-8 text-lg text-neutral-600 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A powerful text editor designed for modern teams. Create beautiful documents, collaborate in real-time,
              and bring your ideas to life.
            </motion.p>
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/documents">
                <Button size="lg" className="gap-2 bg-orange-600 text-white hover:bg-orange-700">
                  Start Writing <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button size="lg" variant="outline" className="gap-2">
                  Try Demo
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
                src="/placeholder.svg?height=600&width=600"
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
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Everything you need to write better</h2>
            <p className="text-neutral-600">Powerful features that help you write, edit, and collaborate with ease.</p>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mb-4 inline-block rounded-lg bg-orange-100 p-3 text-orange-600">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-orange-600 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-4xl font-bold">
                <Users className="h-8 w-8" /> 100k+
              </div>
              <p className="text-orange-100">Active Users</p>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-4xl font-bold">
                <Star className="h-8 w-8" /> 4.9/5
              </div>
              <p className="text-orange-100">User Rating</p>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-4xl font-bold">
                <Edit3 className="h-8 w-8" /> 1M+
              </div>
              <p className="text-orange-100">Documents Created</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Loved by writers worldwide</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.author}
                className="rounded-xl bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mb-4 flex items-center gap-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-neutral-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-neutral-600">{testimonial.quote}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready to start writing?</h2>
          <p className="mb-8 text-neutral-400">Join thousands of writers and teams who trust Write Pad</p>
          <Link href="/sign-in">
            <Button size="lg" className="gap-2 bg-orange-600 text-white hover:bg-orange-700">
              Get Started for Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase">Product</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>Enterprise</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase">Company</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase">Resources</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Community</li>
                <li>Templates</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase">Legal</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center text-sm text-neutral-600">
            © {new Date().getFullYear()} Write Pad. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}


