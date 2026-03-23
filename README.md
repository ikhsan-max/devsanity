# DevSanity

DevSanity adalah aplikasi sederhana untuk membantu developer mencatat resource yang benar-benar digunakan, bukan sekadar dikoleksi.

Banyak developer menyimpan banyak link (docs, tools, tutorial), tapi jarang dipakai.  
DevSanity membantu memfilter mana yang benar-benar dipakai dan mana yang hanya jadi “dopamine collection”.

---

## ✨ Features

- ➕ Add resource (title, url, category, notes)
- ✏️ Edit resource (inline edit)
- 🗑️ Delete resource (dengan konfirmasi)
- ✅ Mark resource as used / unused
- 🔍 Search (title, url, notes)
- 🏷️ Filter by category
- 📊 Usage statistics (total, used, ratio)
- ⏳ Loading state saat submit
- 🔔 Toast notification (success & error)
- ♻️ Auto reset form setelah submit

---

## 🧠 Philosophy

> "Tambahkan link yang benar-benar kamu pakai. Bukan koleksi dopamin."

DevSanity bukan bookmark manager biasa.  
Fokusnya adalah **kualitas penggunaan, bukan jumlah resource**.

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Prisma ORM**
- **SQLite**
- **Tailwind CSS**
- **shadcn/ui**
- **Sonner (toast)**

---

## 🚀 Getting Started

### 1. Clone repository
```bash
git clone https://github.com/ikhsan-max/devsanity.git
cd devsanity
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup database 
```bash
npx prisma migrate dev
```
### 4. Run development Server
```bash
npm run dev
```
App akan berjalan di 
http://localhost:3000

📁 Project Structure
src/
├── app/
│   └── resources/       # main feature (CRUD + filters)
├── components/ui/       # reusable UI components
├── types/               # shared TypeScript types
├── lib/                 # utilities (categories, helpers)
prisma/
├── schema.prisma        # database schema

### Example Use Case
1. Simpan docs yang sering dipakai (React, Next.js, Prisma)
2. Tandai mana yang benar-benar digunakan
3. Filter berdasarkan kategori (Frontend, Backend, Tools)
4. Lihat rasio penggunaan resource

### Roadmap
1. Simpan docs yang sering dipakai (React, Next.js, Prisma)
2. Tandai mana yang benar-benar digunakan
3. Filter berdasarkan kategori (Frontend, Backend, Tools)
4. Lihat rasio penggunaan resource

### Author
Radiatul Ikhsan
Programmer & builder

### Notes
Project ini dibuat sebagai latihan untuk:
* memahami Next.js App Router
* membangun CRUD dengan Prisma
* memisahkan server & client logic dengan benar
* membangun reusable UI component
