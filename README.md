# 🎥 Youllusion

Welcome to **Youllusion**, a full-stack project built with Angular (Frontend) and Node.js (Backend). This platform allows users to upload, view, and interact with video content. 🚀

---

## 📂 Project Structure

```
Youllusion/
├── BACK/                # Backend folder
│   ├── controllers/     # API controllers
│   ├── middleware/      # Middleware for authentication
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── uploads/         # File uploads (images/videos)
│   └── utils/           # Utility functions
├── FRONT/               # Frontend folder
│   ├── public/          # Static assets
│   ├── src/             # Angular source code
│   └── .vscode/         # VS Code settings
```

---

## 🌟 Features

### Frontend
- **Responsive Design**: Built with Angular and Bootstrap.
- **User Authentication**: Register, login, and manage profiles.
- **Video Uploads**: Upload and display video content.
- **Dynamic Components**: Reusable components like `video-card` and `nav-bar`.

### Backend
- **RESTful API**: Built with Express.js.
- **Database Integration**: MongoDB for data storage.
- **Authentication**: JWT-based authentication.
- **File Handling**: Multer for file uploads.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16+)
- **Angular CLI** (v19.1.4)
- **MongoDB**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/youllusion.git
   cd youllusion
   ```

2. Install dependencies for both `BACK` and `FRONT`:
   ```bash
   cd BACK
   npm install
   cd ../FRONT
   npm install
   ```

---

## 🖥️ Development

### Backend
1. Create a `.env` file in the `BACK` folder:
   ```
   PORT=your-port
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```

2. Start the backend server:
   ```bash
   cd BACK
   node index.js
   ```

### Frontend
1. Start the Angular development server:
   ```bash
   cd FRONT
   ng serve
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:4200/
   ```
