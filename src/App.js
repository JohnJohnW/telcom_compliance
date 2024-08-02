// App.js

import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Home from './components/Home';
import './App.css';

function App() {
  const [selectedSection, setSelectedSection] = useState('Home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <Header />
      <div className="main">
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
        <Sidebar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className={`content-wrapper ${isSidebarOpen ? 'shifted' : ''}`}>
          {selectedSection === 'Home' ? (
            <Home />
          ) : (
            <Content selectedSection={selectedSection} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
