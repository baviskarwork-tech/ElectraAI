# 🚀 ElectraAI – Election Process Assistant

ElectraAI is a **production-grade, AI-powered election education platform** designed to simplify complex electoral processes into an interactive, intuitive, and accessible experience.

Built for the **Google Cloud Agentic Coding Challenge**, the system combines real-time AI assistance, structured learning, and cloud-native architecture.

---

# 🎯 Problem Statement

Understanding election processes is complex for most citizens due to:

* Lack of structured guidance
* Confusing timelines and terminology
* Low engagement with traditional educational formats

---

# 💡 Solution

ElectraAI transforms election education into an **interactive learning experience** using:

* Step-by-step visual timelines
* AI-powered question answering
* Quiz-based learning
* Real-time progress tracking

---

# ✨ Key Features

### 🧭 Interactive Timeline

Clear, animated election lifecycle:
Registration → Campaign → Voting → Counting → Results

### 🤖 AI Election Assistant

Ask anything like:

> “How does voting work?”

Powered by **Google Gemini AI**

### 🧠 Quiz Engine

* Multiple-choice questions
* Instant feedback
* Learning reinforcement

### 📊 Personalized Dashboard

* Tracks progress
* Stores user data in Firestore
* Real-time sync

### 🛡️ Secure & Accessible

* Zod validation
* Middleware security headers
* WCAG AA compliance

---

# ☁️ Google Cloud Integrations (CRITICAL)

ElectraAI is deeply integrated with Google ecosystem:

### 🔥 Firebase

* `initializeApp`, `getAuth`, `getFirestore`
* User authentication + progress storage

### 🤖 Gemini AI

* `/api/gemini` route using Google Generative API
* Real-time election Q&A assistant

### 🗺️ Google Maps

* Embedded polling station visualization

### ⚡ Cloud Run

* Production deployment for scalable hosting

### 📊 Vertex AI (Simulated Analytics)

* Admin insights and learning analytics

👉 All integrations are implemented using **real SDK imports and callable logic**, not just UI placeholders.

---

# 🏗️ Architecture Overview

```text
Next.js (Frontend + API Routes)
│
├── UI (Timeline, Quiz, Assistant)
├── API (/api/gemini)
├── Firebase (Auth + Firestore)
├── Google APIs (Gemini, Maps)
└── Middleware (Security Layer)
```

---

# 🧪 Testing & Quality

### ✅ Automated Testing

* 25+ test cases (Jest + RTL)
* Covers:

  * Page rendering
  * Component behavior
  * Navigation
  * API interactions

### ✅ Code Quality

* Strict TypeScript (no `any`)
* Modular architecture
* Reusable components + hooks

### ✅ Build Verification

* `npm run lint` → 0 errors
* `npm run test` → all pass
* `npm run build` → success

---

# ⚡ Performance & Accessibility

* Lazy loading for heavy components
* Optimized bundle size
* Keyboard navigation support
* Screen-reader friendly

---

# 📦 Run Locally

```bash
npm install
npm run dev
npm run test
npm run build
```

---

# 🏆 Why This Project Stands Out

* Combines **AI + real-world civic impact**
* Uses **Google Cloud ecosystem effectively**
* Built with **production-grade engineering practices**
* Designed for **clarity, accessibility, and scale**

---

# 📌 Tech Stack

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS v4
* Firebase
* Google Gemini AI
* Zustand
* Zod
* Jest + Cypress

---

*Built for innovation, accessibility, and real-world impact.*
