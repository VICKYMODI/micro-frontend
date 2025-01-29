import React from 'react';
import SongManager from './components/SongManager';

const App: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Song Manager</h1>
      <SongManager />
    </div>
  );
};

export default App;