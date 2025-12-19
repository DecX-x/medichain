"use client";

import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { client, wallets } from "@/lib/thirdWeb";
import { Building2, Users, FileText, Activity } from "lucide-react";

export default function HospitalDashboard() {
  const account = useActiveAccount();
  const router = useRouter();

  useEffect(() => {
    if (!account) {
      router.push("/auth");
    }
  }, [account, router]);

  if (!account) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header with Account Info */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground">Hospital Portal</span>
          </div>
          
          {/* Thirdweb Account Button */}
          <ConnectButton
            client={client}
            wallets={wallets}
            connectButton={{
              style: {
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "13px",
              },
            }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Hospital Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage patient records and hospital operations securely.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
            <Users className="w-8 h-8 text-primary mb-3" />
            <p className="text-2xl font-bold text-foreground">1,234</p>
            <p className="text-sm text-muted-foreground">Registered Patients</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
            <FileText className="w-8 h-8 text-primary mb-3" />
            <p className="text-2xl font-bold text-foreground">8,567</p>
            <p className="text-sm text-muted-foreground">Medical Records</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
            <Activity className="w-8 h-8 text-primary mb-3" />
            <p className="text-2xl font-bold text-foreground">45</p>
            <p className="text-sm text-muted-foreground">Active Sessions</p>
          </div>
        </div>

        {/* Connected Wallet Card */}
        <div className="p-4 bg-card border border-border rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Hospital Wallet</p>
          <p className="text-sm font-mono text-foreground break-all">
            {account.address}
          </p>
        </div>
      </main>
    </div>
  );
}