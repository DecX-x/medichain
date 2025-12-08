# health-record-dapps

## Deskripsi Proyek

Proyek ini adalah aplikasi Decentralized Health Record (DHR) yang terdiri dari dua komponen utama:

1. **Smart Contract (Solidity, Foundry)**
2. **Backend Server/API (Node.js, Express, ethers.js, IPFS, JWT, Swagger)**

Sistem ini memungkinkan manajemen rekam medis yang aman, terdesentralisasi, dan dapat diakses lintas institusi dengan kontrol penuh oleh pasien.

---

## 1. Smart Contract

Terdapat di folder `back-end/smart-contract/`.

### Fitur Utama
- **Manajemen Identitas Terdesentralisasi (DID):**
	- Pasien mendaftarkan dan mengelola identitas digital mereka sendiri.
- **Pembuatan & Penyimpanan Rekam Medis:**
	- Data medis dienkripsi & disimpan off-chain (misal: IPFS), hash-nya dicatat di blockchain.
- **Jaringan Validator:**
	- Validator (RS, klinik, lab) memverifikasi data sebelum dicatat.
- **Akses & Perizinan:**
	- Pasien dapat memberi/mencabut izin akses data ke dokter/RS.
- **Sistem Insentif (Token):**
	- Validator & kontributor data mendapat reward token.
- **Ekosistem Data & Riset:**
	- Peneliti dapat mengajukan permintaan data anonim untuk analisis statistik.

### Struktur Kontrak
- `DecentralizedHealthRecord.sol` – Manajemen identitas, pencatatan hash rekam medis, dan akses data pasien.
- `PermissionAccessControl.sol` – Pengelolaan izin akses data pasien ke pihak lain.
- `ValidatorManagement.sol` – Pendaftaran, penghapusan, dan log verifikasi validator.
- `DHRToken.sol` – Kontrak ERC20 untuk reward/insentif validator & kontributor data.
- `ResearchAnalytics.sol` – Permintaan data anonim/statistik oleh peneliti dan publikasi hasil analisis.

### Alur Penggunaan
1. Pasien mendaftar DID melalui aplikasi → data DID dicatat di blockchain.
2. Validator (RS/lab) menambahkan hash rekam medis pasien ke blockchain.
3. Pasien dapat memberi/mencabut izin akses data ke dokter/RS.
4. Dokter/RS dapat mengakses riwayat medis pasien jika diizinkan.
5. Peneliti mengajukan permintaan data anonim, sistem mengagregasi & mempublikasikan hasil statistik.
6. Reward token didistribusikan ke validator & kontributor data.

### Integrasi Off-Chain
- Enkripsi data medis, upload ke IPFS, dan agregasi statistik dilakukan di aplikasi (off-chain), bukan di smart contract.
- Smart contract hanya menyimpan hash, mengelola izin, dan mendistribusikan reward.

### Build & Test
1. Pastikan sudah install [Foundry](https://book.getfoundry.sh/).
2. Build: `forge build`
3. Test: `forge test`

---

## 2. Backend Server/API

Terdapat di folder `back-end/server/`.

### Fitur Utama
- **RESTful API** untuk interaksi aplikasi dengan smart contract dan IPFS.
- **Autentikasi JWT** untuk keamanan akses endpoint.
- **Swagger UI** untuk dokumentasi dan eksplorasi API.
- **Integrasi ethers.js** untuk komunikasi dengan smart contract di blockchain.
- **Integrasi IPFS** untuk upload/download data medis terenkripsi.

### Struktur Folder
- `src/app.js` – Entry point Express server, setup Swagger, routing.
- `src/routes/` – Routing endpoint API (identity, access, data, research).
- `src/controllers/` – Logika bisnis tiap endpoint (register/login DID, grant/revoke akses, upload/download data, riset).
- `src/middleware/auth.js` – Middleware autentikasi JWT.
- `swagger.yaml` – Dokumentasi API (Swagger/OpenAPI).

### Alur Backend
1. User melakukan register/login DID → backend generate JWT.
2. User upload data medis → backend enkripsi, upload ke IPFS, simpan hash ke smart contract.
3. User grant/revoke akses data → backend update izin di smart contract.
4. Dokter/RS akses data jika punya izin → backend cek izin di smart contract, ambil data dari IPFS.
5. Peneliti request data anonim/statistik → backend agregasi & ambil hasil dari smart contract.

### Konfigurasi Environment
- Gunakan file `.env` untuk menyimpan:
	- `PRIVATE_KEY` (akun backend untuk sign tx)
	- `RPC_URL` (endpoint node blockchain)
	- `CONTRACT_ADDRESS` (alamat smart contract)
	- `JWT_SECRET` (secret JWT)

### Menjalankan Backend
1. Install dependency: `npm install`
2. Jalankan server: `npm run dev` atau `npm start`
3. Akses dokumentasi API di: `http://localhost:3000/api-docs`

---

## Catatan
- Backend dan smart contract saling terintegrasi, namun data medis tetap terenkripsi dan disimpan off-chain (IPFS).
- Pastikan private key dan data sensitif tidak di-commit ke repository.
- Untuk pengembangan lebih lanjut, tambahkan fitur granular permission, audit log, multi-role, dsb.

---

**Kontribusi & pertanyaan silakan diajukan melalui repository ini.**