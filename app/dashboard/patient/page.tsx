"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useActiveAccount, ConnectButton } from "thirdweb/react"
import { client, wallets } from "@/lib/thirdWeb"
import { useRouter } from "next/navigation"
import { PatientRegistrationForm } from "@/components/patient-registration-form"
import { getPatientData, PatientData } from "@/lib/patientStorage"
import { 
  User, 
  ShieldCheck, 
  Fingerprint, 
  Key, 
  ChevronRight, 
  CreditCard,
  Info,
  FileText,
  Calendar,
  Loader2
} from "lucide-react"

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState<"profile" | "history">("profile")
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const account = useActiveAccount()
  const router = useRouter()

  useEffect(() => {
    if (!account) {
      router.push("/auth")
      return
    }

    // Check if patient is already registered
    const existingData = getPatientData(account.address)
    setPatientData(existingData)
    setIsLoading(false)
  }, [account, router])

  if (!account) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  // Show registration form if patient is not registered
  if (!patientData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <PatientRegistrationForm
            walletAddress={account.address}
            onComplete={(data) => setPatientData(data)}
          />
        </div>
      </div>
    )
  }

  // Show dashboard if patient is registered
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">MediChain Patient</h1>
              <p className="text-xs text-muted-foreground">Decentralized Health Record</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="hidden sm:flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "profile"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Profil & Akun
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "history"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Riwayat Medis
            </button>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{patientData.name}</p>
              <span className="text-xs text-emerald-500 flex items-center justify-end gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>
            <ConnectButton
              client={client}
              wallets={wallets}
              connectButton={{
                style: {
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                },
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-6">
        {activeTab === "profile" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Card */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-muted to-muted/50 border-4 border-background shadow-lg flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-muted-foreground" />
                  </div>

                  {/* Name & NIK */}
                  <h2 className="text-xl font-bold text-foreground mb-1">{patientData.name}</h2>
                  <p className="text-sm text-muted-foreground font-mono mb-6">{patientData.nik}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 w-full mb-6">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Darah</p>
                      <p className="text-lg font-bold text-foreground">{patientData.bloodType}</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Gender</p>
                      <p className="text-lg font-bold text-foreground">{patientData.gender}</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Usia</p>
                      <p className="text-lg font-bold text-foreground">{patientData.age}</p>
                    </div>
                  </div>

                  {/* View Card Button */}
                  <Button className="w-full gap-2">
                    <CreditCard className="w-4 h-4" />
                    Lihat Kartu Pasien
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Pengaturan Keamanan</h3>
                </div>

                <div className="space-y-4">
                  {/* Biometric Login */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Fingerprint className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Login Biometrik</p>
                        <p className="text-xs text-muted-foreground">FaceID / Fingerprint aktif</p>
                      </div>
                    </div>
                    <Switch
                      checked={biometricEnabled}
                      onCheckedChange={setBiometricEnabled}
                    />
                  </div>

                  {/* Backup Private Key */}
                  <button className="w-full flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Key className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Backup Private Key</p>
                        <p className="text-xs text-muted-foreground">Cadangkan kunci akses Anda</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>

                  {/* Info Box */}
                  <div className="flex gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Kunci pribadi tersimpan aman di perangkat ini. Pastikan Anda melakukan backup untuk pemulihan di perangkat lain.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Riwayat Medis Tab */
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Riwayat Medis</h3>
              </div>
              
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Belum ada riwayat medis</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Riwayat medis Anda akan muncul di sini setelah kunjungan ke rumah sakit
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Wallet Address */}
        <div className="mt-6 p-4 bg-card border border-border rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
          <p className="text-sm font-mono text-foreground break-all">{account.address}</p>
        </div>
      </main>
    </div>
  )
}