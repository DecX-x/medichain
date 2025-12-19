export interface PatientData {
    name: string;
    nik: string;
    bloodType: string;
    gender: string;
    age: number;
    walletAddress: string;
    registeredAt: string;
}


const STORAGE_KEY = "medichain_patient_data";

export function getPatientData(walletAddress: string): PatientData | null {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    try {
        return JSON.parse(data);
    } catch {
        return null;
    }
}

export function savePatientData(data: PatientData): void {
    if (typeof window === "undefined") return;

    localStorage.setItem(
        `${STORAGE_KEY}_${data.walletAddress}`,
        JSON.stringify(data)
    );
}

export function isPatientRegistered(walletAddress: string): boolean {
    return getPatientData(walletAddress) !== null;
}