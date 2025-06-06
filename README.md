Here’s your full professional-grade `README.md` file for the **Birthday Reminder App**, covering how to:

* 🎯 Clone the project
* 🚀 Run frontend + backend locally
* 🛠️ Configure `.env` files
* 🧑‍💻 Deploy to Vercel (frontend) and Render (backend)
* ⚙️ Schedule birthday emails

---

## 📁 File: `README.md`

```md
# 🎂 Birthday Reminder Email System

A fullstack automation system to schedule birthday wishes with greeting cards via email. Built with:

- Frontend: React + Tailwind CSS
- Backend: Python Flask + MongoDB Atlas
- Scheduler: Python script via PythonAnywhere
- Deployment: Vercel (frontend), Render (backend)

---

## 📦 Folder Structure

```

birthday-reminder-app/
├── backend/      ← Flask API
└── frontend/     ← React Admin Panel

````

---

## 🚀 How to Run Locally

### ✅ 1. Clone Repositories

```bash
git clone https://github.com/gopichand1939/birthday-reminder-backend.git
git clone https://github.com/gopichand1939/birthday-reminder-frontend.git
````

---

### 🧪 2. Setup Backend (Flask)

```bash
cd birthday-reminder-backend
python -m venv venv
.\venv\Scripts\activate     # Windows

pip install -r requirements.txt
```

#### 🔐 Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_16_digit_app_password
```

#### ▶ Run Server

```bash
python app.py
```

Server running at `http://localhost:5000`

---

### 💻 3. Setup Frontend (React + Vite)

```bash
cd birthday-reminder-frontend
npm install
```

#### 🔐 Create `.env` file

```env
VITE_API_URL=http://localhost:5000
```

#### ▶ Run Frontend

```bash
npm run dev
```

Panel opens at `http://localhost:5173`

---

## 📨 How Email Sending Works

* Admin enters birthday entry with future `sendAt` datetime
* A background script checks every minute for matching birthdays
* If matched, it sends a birthday email + greeting card

---

## ⚙️ How to Run Scheduler (Locally)

```bash
cd backend
python utils/scheduler_runner.py
```

> Or host it on [https://www.pythonanywhere.com](https://www.pythonanywhere.com) to run every day automatically.

---

## 🌍 Deployment

### ✅ Frontend (Vercel)

1. Push frontend repo to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import repo
4. Set env var:

   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
5. Click **Deploy**

---

### ✅ Backend (Render)

1. Push backend repo to GitHub

2. Go to [https://render.com](https://render.com)

3. Create new Web Service

4. Set Build Command:

   ```
   pip install -r requirements.txt
   ```

5. Set Start Command:

   ```
   python app.py
   ```

6. Set environment variables:

   ```
   PORT=10000
   MONGO_URI=...
   GMAIL_USER=...
   GMAIL_PASS=...
   ```

7. Deploy → get backend URL like `https://birthday-api.onrender.com`

---

## ✨ Features

* Modern React UI with Tailwind
* Year, hour, and minute dropdowns using `react-datepicker`
* Real-time birthday list refresh after adding entries
* Automatically sends email at exact `sendAt` time
* Status badge: ✅ Sent or ⏳ Pending
* Deploy-ready configuration for production

---

## 🙌 Author

Made with ❤️ by Gopichand
🔗 GitHub: [@gopichand1939](https://github.com/gopichand1939)

```

---

Let me know if you want:
- PDF version of this README
- Include screenshots of the UI
- Pre-filled `.env.example` templates

All set for public or private release!
```
