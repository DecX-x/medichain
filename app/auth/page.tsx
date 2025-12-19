"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, wallets } from "@/lib/thirdWeb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, User, ArrowLeft, ChevronRight } from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

type UserRole = "patient" | "hospital" | null;

export default function AuthPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const account = useActiveAccount();
  const router = useRouter();

  useEffect(() => {
    if (account && selectedRole) {
    router.push(`/dashboard/${selectedRole}`);
  }

  }, [account, selectedRole, router])  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle Dot Pattern */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "opacity-40"
        )}
      />

      {/* Minimal gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Back to Home */}
        <Link 
          href="/" 
          className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>

        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <RoleSelection onSelectRole={setSelectedRole} />
          ) : (
            <WalletConnection
              role={selectedRole}
              onBack={() => setSelectedRole(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RoleSelection({
  onSelectRole,
}: {
  onSelectRole: (role: UserRole) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Welcome to MediChain
        </h1>
        <p className="text-muted-foreground text-sm">
          Select how you want to continue
        </p>
      </div>

      {/* Role Options */}
      <div className="space-y-3">
        <motion.button
          onClick={() => onSelectRole("patient")}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 text-left group"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Patient</p>
            <p className="text-xs text-muted-foreground">Access your medical records</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.button>

        <motion.button
          onClick={() => onSelectRole("hospital")}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 text-left group"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Hospital</p>
            <p className="text-xs text-muted-foreground">Manage patient records</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.button>
      </div>

      
    </motion.div>
  );
}

function WalletConnection({
  role,
  onBack,
}: {
  role: UserRole;
  onBack: () => void;
}) {
  const isPatient = role === "patient";
  const Icon = isPatient ? User : Building2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm"
    >
      {/* Card */}
      <div className="p-6 bg-card border border-border rounded-2xl">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Icon & Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Continue as {isPatient ? "Patient" : "Hospital"}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Connect your wallet to sign in
          </p>
        </div>

        {/* Thirdweb Connect Button */}
        <ConnectButton
          client={client}
          wallets={wallets}
          connectModal={{
            size: "compact",
            title: "Connect to MediChain",
            showThirdwebBranding: false,
          }}
          connectButton={{
            label: "Connect Wallet",
            style: {
              width: "100%",
              padding: "12px 20px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "500",
              background: "hsl(220 80% 45%)",
              border: "none",
              color: "white",
            },
          }}
        />

        {/* Help Link */}
        <p className="text-center text-muted-foreground text-xs mt-4">
          New to crypto?{" "}
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Get a wallet
          </a>
        </p>
      </div>
    </motion.div>
  );
}