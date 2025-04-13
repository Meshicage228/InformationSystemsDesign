import React from 'react';
import Poetry from './components/Poetry';
import './components/style.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Коллекция русской поэзии</h1>
      </header>
      <main>
        <Poetry />
      </main>
    </div>
  );
}

export default App;