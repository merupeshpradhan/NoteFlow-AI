# 📝 Note-Space

**Note-Space** is a full-stack note-taking application built with Next.js that helps users create, manage, update, and organize their notes in one place. It also includes AI-powered features to make editing and improving notes easier.

## ✨ Features

- 🔐 **User Authentication** — Register and log in securely.
- 🔑 **Google Login** — Sign in using a Google account.
- 📝 **Create Notes** — Create and save personal notes.
- 📚 **Manage Notes** — View and access saved notes anytime.
- ✏️ **Update Notes** — Edit existing notes whenever needed.
- 🤖 **AI-Powered Editing** — Get AI assistance to improve, rewrite, or update notes.
- 💾 **Persistent Storage** — Save notes in a database for future access.
- 📱 **Responsive Design** — Use the application across different screen sizes.

## 🛠️ Tech Stack

The following technologies are planned for this project:

- **Frontend:** Next.js, React.js
- **Language:** JavaScript
- **Styling:** CSS / Tailwind CSS
- **Backend:** Next.js Server Components, Server Actions, or API Routes, depending on the implementation
- **Database:** To be selected
- **Authentication:** Email/password and Google authentication
- **AI Integration:** AI API
- **Package Manager:** pnpm
- **Version Control:** Git and GitHub

*Update this section as the project implementation evolves.*

## 📂 Project Structure

The project structure may look like this as development progresses:

```text
note-space/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── globals.css
│   ├── components/
│   ├── lib/
│   └── services/
├── .env
├── .gitignore
├── package.json
├── pnpm-lock.yaml
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone [YOUR_REPOSITORY_URL](https://github.com/merupeshpradhan/NoteFlow-AI.git)
```

### 2. Navigate to the project folder

```bash
cd note-space
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add the environment variables required by your authentication provider, database, and AI service.

```env
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AI_API_KEY=
```

The variable names above are examples. Use the exact names required by the services and libraries selected for the project.

**Important:** Never commit your `.env` file or expose secret API keys in frontend code.

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 How It Works

1. A user creates an account or signs in using Google.
2. The user creates and saves notes.
3. Saved notes can be viewed whenever needed.
4. Notes can be edited and updated.
5. AI assistance helps improve note content.
6. Updated notes are saved for future access.

## 🔒 Security

- Protect private notes so users can access only their own data.
- Validate user input on the server.
- Store credentials and API keys securely in environment variables.
- Use secure authentication and session management.

## 🗺️ Future Improvements

- [ ] Search and filter notes.
- [ ] Categorize notes with tags.
- [ ] Mark important notes as favorites.
- [ ] Add a dark mode.
- [ ] Add note-sharing functionality.
- [ ] Improve AI-powered note suggestions.
- [ ] Deploy the application online.

## 👨‍💻 Developer

**Rupesh Pradhan**

- GitHub: https://github.com/merupeshpradhan
- Portfolio: https://merupeshpradhan.vercel.app/
- LinkedIn: https://www.linkedin.com/in/merupeshpradhan/

## 📄 License

This project is currently under development. A license can be added when the project is ready for public release.
