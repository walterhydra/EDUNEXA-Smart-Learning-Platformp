# 🧑🏻‍🏫 MentorConnect

> Empowering students and mentors to connect, collaborate, and grow together.

**MentorConnect** is a modern web-based platform designed to bridge the gap between university students and academic mentors. With features like appointment scheduling, real-time notifications, and seamless profile management, it simplifies mentorship for both students and mentors.



## 🚀 Features

### 🎓 Student Experience
- 🔍 Browse and filter mentors by course or name  
- 📨 Send appointment requests with personalized notes  
- 🔔 Receive real-time SMS notifications on request status  
- 📅 View session history for easy follow-up  

### 🧑‍🏫 Mentor Experience
- 💼 Define hourly rates and set available time slots  
- ✅ Accept or ❌ reject appointment requests with a reason  
- 📊 Track interaction history for better mentoring continuity  



## 🛠 Tech Stack

| Layer            | Technologies                               |
|------------------|--------------------------------------------|
| **Frontend**     | React, TypeScript, Tailwind CSS            |
| **Backend**      | Supabase (PostgreSQL + Auth)               |
| **Notifications**| Supabase Edge Functions, Webhooks          |
| **Build Tools**  | Vite, Bun (alternative to npm)             |
| **Deployment**   | Vercel / Netlify *(configurable)*          |


## 📁 Project Structure

```
MentorConnect/
├── public/                    # Static files and index.html
├── src/
│   ├── components/            # Reusable UI elements
│   ├── pages/                 # Main route components
│   ├── services/              # API and helper utilities
│   ├── supabase/              # Supabase client configuration
│   ├── App.tsx                # Root application component
│   └── index.tsx              # React entry point
├── .gitignore                 # Ignored files for Git
├── README.md                  # Project documentation
├── bun.lockb                  # Bun lock file
├── eslint.config.js           # Linting configuration
├── package.json               # Project metadata and scripts
├── postcss.config.js          # PostCSS plugins
├── tailwind.config.ts         # Tailwind theme and setup
├── tsconfig.*.json            # TypeScript configurations
└── vite.config.ts             # Vite bundler configuration
```


## ⚙️ Setup Instructions

### 🔧 Prerequisites
- ✅ [Bun](https://bun.sh) installed  
  *(Install via terminal: `curl https://bun.sh/install | bash`)*
- ✅ A Supabase project with Auth + Database setup
- ✅ (Optional) Twilio account for SMS notifications

---

### 🔨 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/pruthvi2602/MentorConnect.git
   cd MentorConnect
   ```

2. **Install Dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory with:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Run the App**
   ```bash
   bun dev
   ```

   Visit: [http://localhost:5173](http://localhost:5173)


## 🧠 Challenges Faced

- ⚙ Transitioning from traditional backend to Supabase (serverless-first)
- 🔄 Adapting to the new Bun ecosystem for package management
- 💅 Achieving pixel-perfect responsiveness with Tailwind CSS
- 🔐 Ensuring secure and real-time updates via webhooks and edge functions



## 📈 Future Roadmap

- ⭐ **Mentor rating and review system**  
- 🎥 **Built-in video call feature with scheduling**  
- 💰 **Credit/token-based session system**  
- 🧠 **Skill quizzes and onboarding tests**  
- 📆 **Push notifications and calendar integrations**



## 🤝 Contributing

We welcome all contributors! To get started:

1. **Fork** this repo  
2. Create a **feature branch**  
   ```bash
   git checkout -b feature-name
   ```
3. **Make your changes**  
4. **Commit and push**
   ```bash
   git commit -m "Add feature"
   git push origin feature-name
   ```
5. **Submit a Pull Request** 🚀



## 📬 Contact

- 📧 Email: [pruthvubhudhecha02@gmail.com](mailto:pruthvubhudhecha02@gmail.com)  
- 🐙 GitHub: [@pruthvi2602](https://github.com/pruthvi2602)
