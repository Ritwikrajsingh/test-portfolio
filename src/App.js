import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./compoenets/Header";
import Prompt from "./compoenets/Prompt";

const App = () => {
  const [user, setUser] = useState("guest");
  const [theme, setTheme] = useState("dark");
  const [history, setHistory] = useState([]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const changeUser = (username) => {
    setUser(username);
  };
  const [content, setContent] = useState([<Header />]);
  // const [content, setContent] = useState([]);

  useEffect(() => {
    document.body.className = theme; // Set the body's className to the current theme
  }, [theme]);

  const themeLogo = theme === "light" ? "/moon-tpbg.svg" : "/sun-tp.svg";

  return (
    <div className="App">
      <button
        id="theme"
        onClick={toggleTheme}
        style={{ backgroundColor: "transparent" }}
      >
        <img src={themeLogo} alt={theme === "light" ? "Sun" : "Moon"} />
      </button>
      <ul>
        {content}
        <Prompt
          user={user}
          setContent={setContent}
          changeUser={changeUser}
          history={history}
          setHistory={setHistory}
        />
      </ul>
    </div>
  );
};

export default App;
