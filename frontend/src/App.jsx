import React, { useEffect, useState } from 'react';
import { API_BASE } from './config';

function App() {
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/`)
      .then(res => res.text())
      .then(data => setBackendMessage(data));
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>SkillSync Frontend</h1>
      <p>Backend says: {backendMessage}</p>
    </div>
  );
}

export default App;