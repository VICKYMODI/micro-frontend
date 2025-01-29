// host/src/App.tsx
import React, { lazy, Suspense } from 'react';
import { useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { ErrorBoundary } from './components/ErrorBoundary';

// सीधा डिफ़ॉल्ट इम्पोर्ट का उपयोग करें
const RemoteSongManager = lazy(() => import('remote/SongManager'));

const AppContent: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteSongManager />
      </Suspense>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;