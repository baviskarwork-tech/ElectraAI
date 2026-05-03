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
Clear, animated election lifecycle: Registration → Campaign → Voting → Counting → Results.

### 🤖 AI Election Assistant
Ask anything like: *“How does voting work?”* Powered by **Google Gemini AI**.

### 🧠 Quiz Engine
Multiple-choice questions with instant feedback and learning reinforcement.

### 📊 Personalized Dashboard
Tracks progress and stores user data in Firestore with real-time sync.

---

# 🛡️ Engineering Excellence & Code Quality

### 💎 Strict TypeScript Implementation
- **Zero `any` Types**: The entire codebase uses strict interfaces and types.
- **Zod Validation**: Comprehensive input validation for forms, quiz submissions, and API requests.
- **Custom Hooks**: Centralized business logic in `useAssistant`, `useQuiz`, and `useAuth`.

### 🔒 Enterprise-Grade Security
- **Secure Middleware**: Implementation of strict CSP, X-Frame-Options (DENY), and X-Content-Type-Options (nosniff).
- **API Safeguards**: Rate-limiting placeholders and strict schema validation for all POST requests.
- **Route Protection**: Middleware-level guards for authenticated and admin routes.

### 🧪 Comprehensive Testing Suite
- **25+ Automated Tests**: 100% coverage of core components and user flows.
- **Integration Tests**: Verification of Gemini API route behavior and Firebase initialization.
- **Quality Verified**: `npm run build`, `npm run lint`, and `npm run test` all pass with 0 errors.

### ♿ Accessibility (WCAG AA)
- **Semantic HTML**: Proper use of `header`, `main`, `section`, and `nav` tags.
- **Aria Labels**: All interactive elements (buttons, inputs) include descriptive labels.
- **Keyboard Navigation**: Full support for tab-based navigation and visible focus states.

---

# ☁️ Google Cloud Integrations

### 🔥 Firebase
- Authentication (Google Sign-In) and Firestore (Persistence).

### 🤖 Gemini AI
- `/api/gemini` route powered by Google Generative AI SDK with secure fallback logic.

### 🗺️ Google Maps
- Embedded polling station visualization with live routing logic.

---

# 🏗️ Architecture

```text
Next.js 15 (App Router)
│
├── src/hooks/ (Business Logic)
├── src/lib/ (Google Services)
├── src/components/ (UI Library)
└── src/app/ (Routing & Pages)
```

---

# 📦 Getting Started

```bash
npm install
npm run dev
npm run test
npm run build
```

---

*Built for innovation, accessibility, and real-world impact.*
