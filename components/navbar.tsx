"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// NavLink component with soft blue block hover
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group py-2">
      <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
      {children}
      </span>
      {/* Animated underline */}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
    </Link>
  )
}

export function Navbar() {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-background/80 backdrop-blur-md border-b border-border/50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-12 font-sans">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-sans font-bold text-xl tracking-tight text-foreground">
          
          <span>MediChain</span>
        </Link>
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#solutions">Solutions</NavLink>
          <NavLink href="#technology">Technology</NavLink>
          <NavLink href="#docs">Docs</NavLink>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button size="sm" className="font-semibold px-6 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
            Get Started
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  )
}
