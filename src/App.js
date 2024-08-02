import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Home from './components/Home';
import './App.css';

function App() {
  const [selectedSection, setSelectedSection] = useState('Home');

  return (
    <div className="App">
      <Header />
      <div className="main">
        <Sidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
        {selectedSection === 'Home' ? (
          <Home />
        ) : (
          <Content selectedSection={selectedSection} />
        )}
      </div>
    </div>
  );
}

export default App;
