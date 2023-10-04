import './App.css'
import React, { useState, useEffect } from 'react';
import Header from './compoenets/Header';
import Prompt from './compoenets/Prompt';
import { emptySuResponses, files, hostname } from './data';

const App = () => {
  const [user, setUser] = useState('guest');
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const changeUser = (username) => {
    setUser(username);
  }
  // const [content, setContent] = useState([<Header />])
  const [content, setContent] = useState([<Header />])

  useEffect(() => {
    document.body.className = theme; // Set the body's className to the current theme
  }, [theme]);

  const themeLogo = theme === 'light' ? '/moon-tpbg.svg' : '/sun-tp.svg';

  return (
    <div className='App'>
      <button id='theme' onClick={toggleTheme} style={{ backgroundColor: "transparent" }}>
        <img src={themeLogo} alt={theme === 'light' ? 'Sun' : 'Moon'} />
      </button>

      {/* Content */}
      <ul>
        {content}
        <Prompt
          user={user}
          setContent={setContent}
          changeUser={changeUser}
          emptySuResponses={emptySuResponses}
          files={files}
          hostname={hostname}
        />
      </ul>
    </div>
  );
};

export default App;