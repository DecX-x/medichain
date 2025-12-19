"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User, CreditCard, Droplets, Users, Calendar, ArrowRight, Loader2 } from "lucide-react"
import { savePatientData, PatientData } from "@/lib/patientStorage"

interface PatientRegistrationFormProps {
  walletAddress: string;
  onComplete: (data: PatientData) => void;
}

export function PatientRegistrationForm({ walletAddress, onComplete }: PatientRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    bloodType: "",
    gender: "",
    age: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call / blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const patientData: PatientData = {
      name: formData.name,
      nik: formData.nik,
      bloodType: formData.bloodType,
      gender: formData.gender,
      age: parseInt(formData.age),
      walletAddress: walletAddress,
      registeredAt: new Date().toISOString(),
    }

    savePatientData(patientData)
    onComplete(patientData)
    setIsSubmitting(false)
  }

  const isFormValid =
    formData.name &&
    formData.nik &&
    formData.bloodType &&
    formData.gender &&
    formData.age

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="p-6 bg-card border border-border rounded-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <User className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Lengkapi Data Diri</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Isi data berikut untuk melanjutkan
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Lengkap */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              Nama Lengkap
            </Label>
            <Input
              id="name"
              placeholder="Masukkan nama lengkap"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* NIK / Nomor KTP */}
          <div className="space-y-2">
            <Label htmlFor="nik" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              Nomor KTP (NIK)
            </Label>
            <Input
              id="nik"
              placeholder="Masukkan 16 digit NIK"
              value={formData.nik}
              onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
              minLength={16}
              maxLength={16}
              required
            />
          </div>

          {/* Golongan Darah */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-muted-foreground" />
              Golongan Darah
            </Label>
            <Select
              value={formData.bloodType}
              onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih golongan darah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              Jenis Kelamin
            </Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pria">Pria</SelectItem>
                <SelectItem value="Wanita">Wanita</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Usia */}
          <div className="space-y-2">
            <Label htmlFor="age" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              Usia
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Masukkan usia"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              min={1}
              max={120}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full gap-2 mt-6"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                Lanjutkan
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Wallet Info */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Terhubung: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}