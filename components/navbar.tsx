"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Navbar() {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
    >
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-sans font-bold text-xl tracking-tight">
        
          <span>MediChain</span>
        </Link>
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-primary">
          <Link href="#features" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#solutions" className="hover:text-primary transition-colors">
            Solutions
          </Link>
          <Link href="#technology" className="hover:text-primary transition-colors">
            Technology
          </Link>
          <Link href="#docs" className="hover:text-primary transition-colors">
            Docs
          </Link>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <Button size="sm" className="font-semibold">
          GET STARTED
        </Button>
      </div>
    </motion.nav>
  )
}
