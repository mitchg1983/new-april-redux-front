import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Users } from './features/users/Users'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Mitch's App
        <Users />
      </header>
    </div>
  );
}

export default App;
