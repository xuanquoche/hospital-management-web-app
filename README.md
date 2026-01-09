# 🏥 Hospital Management System - Web Application

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
</p>

<p align="center">
  <b>Giao diện web quản lý bệnh viện tích hợp AI & Blockchain</b>
  <br />
  <i>Hospital Management Web Interface with AI & Blockchain Integration</i>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [User Roles](#-user-roles)
- [Key Features Demo](#-key-features-demo)
- [Internationalization](#-internationalization)
- [Deployment](#-deployment)

---

## 🌟 Overview

A modern, responsive web application for hospital management that provides intuitive interfaces for patients, doctors, and administrators. Built with Next.js 14 App Router and featuring AI-powered booking assistance and blockchain verification.

### Key Highlights

- 🎨 **Modern UI/UX** - Beautiful, accessible interface with shadcn/ui components
- 🤖 **AI Booking Assistant** - Intelligent doctor recommendations based on symptoms
- ⛓️ **Blockchain Verification** - Verify payment and medical record integrity
- 🌐 **Multi-language** - Support for Vietnamese, English, and Japanese
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- ⚡ **Real-time Updates** - WebSocket integration for instant notifications

---

## ✨ Features

### 🏠 Landing Page
- Hospital introduction
- Service highlights
- Call-to-action for booking

### 👤 Authentication
- User registration with role selection
- Secure login with JWT
- Session management with NextAuth.js

### 🧑‍🤝‍🧑 Patient Features
- **Dashboard** - Overview of appointments, upcoming visits, recent transactions
- **AI Booking** - Describe symptoms → Get doctor recommendations → Book appointment
- **Health Records** - View medical history and documents
- **Payment** - QR code payment with real-time confirmation
- **Support Chat** - Real-time chat with hospital staff
- **Transaction History** - View all payments with blockchain verification

### 👨‍⚕️ Doctor Features
- **Dashboard** - Today's appointments, patient statistics
- **My Patients** - View and manage patient list
- **Consultation** - Examine patients, create prescriptions
- **Document Upload** - Upload medical documents with blockchain recording
- **Profile Management** - Update professional information

### 👨‍💼 Admin Features
- **Dashboard** - Hospital-wide statistics and analytics
- **Doctor Management** - CRUD operations, schedule management
- **Patient Management** - View patient records
- **Department & Specialty** - Organizational structure management
- **Medicine Management** - Inventory with batch tracking
- **Appointment Overview** - Monitor all appointments
- **Transaction Management** - Payment tracking
- **Support Center** - Handle patient inquiries

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3 |
| **UI Components** | shadcn/ui, Radix UI |
| **State Management** | Zustand |
| **Data Fetching** | SWR |
| **Authentication** | NextAuth.js |
| **Forms** | React Hook Form, Zod |
| **Real-time** | Socket.IO Client |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **i18n** | next-intl |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd hospital-management-web-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your configurations
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

### Environment Variables

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Blockchain
NEXT_PUBLIC_POLYGONSCAN_URL=https://amoy.polygonscan.com
```

---

## 📁 Project Structure

```
src/
├── app/
│   └── [locale]/              # Internationalized routes
│       ├── (admin)/           # Admin pages
│       │   ├── dashboard/
│       │   ├── admin-doctor/
│       │   ├── admin-patient/
│       │   ├── admin-appointments/
│       │   ├── admin-medicines/
│       │   ├── admin-departments/
│       │   ├── admin-specialties/
│       │   ├── admin-transactions/
│       │   └── admin-support/
│       ├── (doctor)/          # Doctor pages
│       │   └── doctor/
│       │       ├── dashboard/
│       │       ├── my-patient/
│       │       └── profile/
│       ├── (patient)/         # Patient pages
│       │   └── patient/
│       │       ├── dashboard/
│       │       ├── booking/
│       │       ├── appointments/
│       │       ├── health-record/
│       │       ├── transactions/
│       │       ├── payment-overview/
│       │       ├── support/
│       │       └── profile/
│       ├── (auth)/            # Authentication pages
│       │   ├── sign-in/
│       │   └── sign-up/
│       └── (landing)/         # Public pages
│           └── hospital/
│
├── components/
│   ├── modules/               # Feature-specific components
│   │   ├── admin/
│   │   ├── doctor/
│   │   ├── patient/
│   │   └── common/
│   ├── ui/                    # shadcn/ui components
│   └── layout/                # Layout components
│
├── hooks/                     # Custom React hooks
│   ├── use-me.ts             # Current user hook
│   ├── use-payment-socket.ts # Payment WebSocket
│   ├── use-chat-socket.ts    # Chat WebSocket
│   └── use-blockchain-verify.ts
│
├── lib/                       # Utilities
│   ├── fetcher.ts            # API client
│   ├── blockchain.ts         # Blockchain helpers
│   └── utils.ts              # General utilities
│
├── store/                     # Zustand stores
│   ├── use-user-store.ts
│   └── use-appointment-store.ts
│
├── types/                     # TypeScript types
│   ├── appointment.ts
│   ├── doctor.ts
│   ├── patient-api.ts
│   ├── ai-booking.ts
│   └── ...
│
├── i18n/                      # Internationalization config
├── const/                     # Constants
└── messages/                  # Translation files
    ├── en.json
    ├── vi.json
    └── ja.json
```

---

## 👥 User Roles

### Patient
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/patient/dashboard` | Overview & statistics |
| Booking | `/patient/booking` | AI-powered appointment booking |
| Appointments | `/patient/appointments` | Appointment history |
| Health Record | `/patient/health-record` | Medical documents |
| Transactions | `/patient/transactions` | Payment history |
| Support | `/patient/support` | Chat with staff |
| Profile | `/patient/profile` | Personal information |

### Doctor
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/doctor/dashboard` | Daily overview |
| My Patients | `/doctor/my-patient` | Patient management |
| Consultation | `/doctor/my-patient/detail/[id]/consultation/[appointmentId]` | Examine & prescribe |
| Profile | `/doctor/profile` | Professional info |

### Admin
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard` | Hospital analytics |
| Doctors | `/admin-doctor` | Doctor management |
| Patients | `/admin-patient` | Patient management |
| Appointments | `/admin-appointments` | All appointments |
| Medicines | `/admin-medicines` | Inventory management |
| Departments | `/admin-departments` | Department structure |
| Specialties | `/admin-specialties` | Medical specialties |
| Transactions | `/admin-transactions` | Payment records |
| Support | `/admin-support` | Customer support |

---

## 🎯 Key Features Demo

### 1. AI-Powered Booking Flow

```
Step 1: Patient enters symptoms
        ↓
Step 2: AI asks follow-up questions (if needed)
        ↓
Step 3: AI analyzes and recommends doctors
        - Match score
        - Reasons for recommendation
        - Available time slots
        ↓
Step 4: Patient selects doctor & time
        ↓
Step 5: Patient confirms & pays
        ↓
Step 6: Real-time payment confirmation
```

### 2. QR Payment Flow

```
┌─────────────────────────────────────────┐
│         Payment QR Modal                 │
├─────────────────────────────────────────┤
│                                         │
│          ┌───────────────┐              │
│          │   QR CODE     │              │
│          │   (SePay)     │              │
│          └───────────────┘              │
│                                         │
│  Amount: 500,000 VND                    │
│  Content: [PAYMENT_CODE]                │
│                                         │
│  ⏱️ Time remaining: 14:59              │
│                                         │
│  Status: Waiting for payment...         │
│                                         │
│  ✅ WebSocket connected                 │
│                                         │
└─────────────────────────────────────────┘
         │
         │ Bank transfer detected
         ▼
┌─────────────────────────────────────────┐
│  ✅ Payment Successful!                 │
│  Your appointment has been confirmed.   │
└─────────────────────────────────────────┘
```

### 3. Blockchain Verification

```
┌─────────────────────────────────────────┐
│       Blockchain Verification            │
├─────────────────────────────────────────┤
│                                         │
│  ✅ Verification Successful             │
│                                         │
│  Status: Recorded                       │
│  Recorded at: 01/09/2026 10:30          │
│  Data Hash: 0x1234...abcd               │
│                                         │
│  🔗 View on Polygonscan                 │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🌐 Internationalization

The application supports three languages:

| Language | Code | File |
|----------|------|------|
| Vietnamese | `vi` | `messages/vi.json` |
| English | `en` | `messages/en.json` |
| Japanese | `ja` | `messages/ja.json` |

### Usage

```typescript
import { useTranslations } from 'next-intl';

const t = useTranslations('Common');
return <h1>{t('welcome')}</h1>;
```

### Adding New Languages

1. Create new message file: `messages/[locale].json`
2. Add locale to `i18n/routing.ts`
3. Update middleware configuration

---

## 🐳 Deployment

### Docker

```bash
# Build image
docker build -t hospital-web:latest .

# Run container
docker run -d \
  --name hospital-web \
  -p 3000:3000 \
  --env-file .env.production \
  hospital-web:latest
```

### Docker Compose

```bash
docker-compose up -d
```

### Vercel (Recommended for Next.js)

1. Connect repository to Vercel
2. Configure environment variables
3. Deploy

---

## 📱 Screenshots

### Patient Dashboard
Modern dashboard showing appointment statistics, upcoming visits, and quick actions.

### AI Booking
Intelligent booking interface with symptom analysis and doctor recommendations.

### Doctor Consultation
Streamlined interface for patient examination and prescription creation.

### Admin Dashboard
Comprehensive analytics with charts and hospital-wide statistics.

---

## 🧪 Development

### Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Type check
npm run type-check
```

### Code Style

- ESLint configuration for Next.js
- Prettier for code formatting
- TypeScript strict mode enabled

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Hoang Van Nhat**

---

<p align="center">
  Made with ❤️ using Next.js, Tailwind CSS & shadcn/ui
</p>
