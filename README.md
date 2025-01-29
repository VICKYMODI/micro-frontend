# Micro Frontend Music Management System

A microfrontend architecture-based application for managing music libraries, built using Vite, React, and Module Federation.

## 🏗️ Architecture

The application is split into three main parts:
- **Host App** (Port 5000): Main application shell handling authentication and routing
- **Remote App** (Port 5001): Music management module with admin and user views
- **Server** (Port 3001): Backend API handling authentication and music data

### Key Design Decisions

1. **Module Federation**
   - Uses Vite Plugin Federation for microfrontend implementation
   - Remote components are lazy-loaded for better performance
   - Shared dependencies to avoid duplicate loading

2. **Authentication**
   - JWT-based authentication
   - Role-based access control (Admin/User)
   - Persistent auth state using localStorage

3. **State Management**
   - Custom hooks for data fetching and state management
   - Context API for auth state
   - Prop drilling avoided through proper component composition

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

1. Clone the repository:
bash
git clone https://github.com/VICKYMODI/micro-frontend.git
cd micro-frontend
2. Install dependencies for all applications:
3. bash
Install Host App dependencies
cd host
npm install
Install Remote App dependencies
cd ../remote
npm install
Install Server dependencies
cd ../server
npm install


### Running the Applications

1. Start the server (in server directory):
bash
npm run dev - this will start the server at port 3001

2. create a build for the remote app (in remote directory):
  bash

  npm run build   - this will allow http://localhost:5001/assets/remoteEntry.js to be accessible from host app
  This should create a dist directory inside remote app which will server the remote app

  npm run preview - to preview
  
         
3. Start the host app (in host directory):
  bash
  npm run dev - start the host app at http://localhost:5000
  login using two users :
  id/pass for user type - admin - admin/admin123
  id/pass for user type - user - user/user123


## 🧪 Testing

The project uses Vitest and React Testing Library for testing.

### Running Tests

In each application directory (host/remote):
bash
Run tests in watch mode
npm test
Run tests with coverage
npm run test:coverage

View the coverage report at:
- `host/coverage/index.html`
- `remote/coverage/index.html`

### Test Coverage Goals
- Statement coverage: 80%
- Branch coverage: 80%
- Function coverage: 80%
- Line coverage: 80%


## 🔄 CI/CD

The project uses GitHub Actions for:
- Automated builds on tag pushes
- Release artifact creation
- Test coverage verification

## 🛠️ Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Vite
  - Material-UI
  - Module Federation

- **Testing**
  - Vitest
  - React Testing Library
  - Jest DOM

- **Backend**
  - Node.js
  - Express
  - JWT Authentication

## 📝 Development Guidelines

1. **Code Style**
   - Use TypeScript for type safety
   - Follow ESLint configuration
   - Write tests for new features

2. **Git Workflow**
   - Create feature branches
   - Use conventional commits
   - Tag versions for releases

3. **Testing Requirements**
   - Write unit tests for components
   - Write integration tests for workflows
   - Maintain minimum 80% coverage

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details
 
