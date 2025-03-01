

# Collaborative Code Playground 🖥️

A real-time collaborative code editing platform where developers can code together, share knowledge, and learn from each other. 

This is a personal side project of Team ByteBlaster **[Aditya Ghosh](https://www.linkedin.com/in/adityaghosh2992/) [Ankan Misra](https://www.linkedin.com/in/ankanmisra/) [Suman Jain](https://www.linkedin.com/in/suman-naresh-jain/)** and now is part of **[Apertre 2.0](https://s2apertre.resourcio.in/)**

## Project Overview
The Collaborative Code Playground consists of two main components:
- **Frontend**: A lightweight, intuitive code editing interface built with React
- **Backend**: A robust TypeScript-based server handling real-time collaboration

## Tech Stack
### Frontend
- React.js
- Tailwind CSS
- Code Mirror (for code editor)
- Socket.io-client (for real-time collaboration)

### Backend
- TypeScript
- Node.js
- Express.js
- Socket.io
- MongoDB (for data persistence)

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## How Can you Help?
- **Feature Requests**: Share your ideas through GitHub issues.
- **Bug Fixes & Improvements**: Pick an existing issue or report one.
- **UI/UX Enhancements**: Help refine the user interface for a smoother experience.
- **Docs & Tutorials**: Improve our documentation or create tutorials for new users.
- **Community Engagement**: Spread the word and help others discover the platform

### By contributing, you’ll not only gain experience with real-world collaborative development but also leave a lasting impact on an evolving open-source project

## Running the Project Locally

1. Clone the repository
```bash
git clone <repository-url>
```

2. Navigate to the project directory
```bash
cd Collaborative-Code-Playground
```

3. Install dependencies for both frontend and backend
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

4. Start the development servers

For Backend:
```bash
cd backend
npm run dev
```

For Frontend:
```bash
cd frontend
npm run dev
```

The frontend application will be available at `http://localhost:5173`
The backend server will run on `http://localhost:3000`

## Project Structure
```plaintext
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   └── services/
    └── package.json
```

## Features
- Real-time collaborative code editing
- Multiple programming language support
- Code execution capability
- Chat functionality
- User authentication
- Session management

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Keeping Your Fork Updated
1. Add the main repo to your upstream remote:
```bash
git remote add upstream https://github.com/original-owner/Collaborative-Code-Playground.git
```

2. Fetch the latest changes:
```bash
git fetch upstream
```

3. Merge the changes into your local main branch:
```bash
git merge upstream/main
```

## Need Help?
If you have any questions or need assistance:
- Open an issue in the repository
- Contact the project maintainers
- Join our community discussion


Happy Coding! 🚀

