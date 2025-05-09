# Customer Analytics Dashboard

Proyek ini menampilkan dashboard analisis pelanggan berdasarkan dataset CSV menggunakan:
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: Next.js, React, Chart.js
- **Dokumentasi API**: Swagger

---

## Fitur

### Backend
- REST API untuk ambil semua data customer
- Summary data berdasarkan `Gender` dan `Location`
- Dokumentasi API via Swagger

### Frontend
- Menampilkan ringkasan dalam bentuk Pie Chart
- Tabel semua pelanggan

---

## Instalasi

### Backend
```bash
cd backend
npm install
cp .env.example .env # atau isi langsung variabel lingkungan
node importData.js    # Import dataset.csv
node app.js
