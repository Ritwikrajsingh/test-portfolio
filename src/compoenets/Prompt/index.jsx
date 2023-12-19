import React, { useRef, useState, useEffect } from "react";
import Threads from "./Threads";
import FileList from "../FileList";
import WhoAmI from "../WhoAmI";
import Skills from "../Skills";
import Help from "../Help";
import Email from "../Email";
import InvalidCommand from "../InvalidCommand";
import Successful from "../Login/Successful";

const files = ["portfolio.md", "skills.json", "contact.md"];
const contact = [
  {
    title: "ritwikrajsingh2 @ twitter",
    url: "https://twitter.com/ritwikrajsingh2",
  },
  {
    title: "ritwikrajsingh @ linkedin",
    url: "https://linkedin.com/in/ritwikrajsingh",
  },
  {
    title: "ritwik_raj_singh @ telegram",
    url: "https://t.me/ritwik_raj_singh",
  },
  {
    title: "the_demon @ discord",
    url: "https://discordapp.com/users/742510458811973712",
  },
];
const hostname = "ritwik.s";

//
let repositories;

const fetchRepositories = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/users/ritwik/repos?per_page=100",
      { method: "GET" }
    );

    if (response.status !== 200) {
      console.error("Error:", response.status);
      return;
    }

    const result = await response.json();
    repositories = result.length;
  } catch (error) {
    console.error("Error:", error);
  }
};

(async () => {
  try {
    await fetchRepositories();
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
})();

const portfolio = async () => {
  try {
    await fetchRepositories();

    const portfolioData = [
      {
        title: "GitHub",
        description: "My github profile",
        additionalInfo: repositories
          ? repositories > 1
            ? `${repositories} repos`
            : `${repositories} repo`
          : "",
        url: "https://github.com/ritwikrajsingh",
      },
      {
        title: "CodeDemon",
        description: "My previous portfolio website",
        additionalInfo: "which which doesn't work",
        url: "https://ritwikrajsingh.github.io",
      },
      {
        title: "Tunica.tech",
        description: "My page on their website",
        additionalInfo: null,
        url: "https://tunicalabsmedia.com/meet/ritwik-raj-singh",
      },
    ];
    return portfolioData;
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
};
//

const portfolioData = await portfolio();

const emptySuResponses = [
  "An empty 'su'? Clearly, you're a master of the command line arts. 🧐",
  "Empty 'su'? You've truly embraced the minimalist approach to computing. 👏",
  "An empty 'su'... Pure poetry in the world of command lines. 📜",
  "Ah, an empty 'su' A masterpiece of command line ambiguity. Bravo! 👑",
  "Empty 'su'? You've stumbled into the virtual land of whimsy! 🌈",
  "No 'su' command? It's a sign to dance like nobody's watching! 💃🕺",
  "Empty 'su,' but brimming with virtual awesomeness! Let's make magic happen! ✨",
  "An empty 'su'? Are you trying to achieve coding Nirvana, one command at a time? 🧘‍♂️",
  "Empty 'su' commands are like debugging mysteries waiting to be solved. 🔍🐞",
  "Empty 'su'? Clearly, you're optimizing for maximum suspense in your coding journey. ⏳",
  "Empty 'su' commands are like code comments: full of potential but somewhat cryptic. 🤔📝",
  "An empty 'su'? You've just written a null pointer exception in the coding universe. 🌌💥",
  "When life gives you an empty 'su,' make it an opportunity for coding humor! 😄💻",
  "An empty 'su'? A true hacker's way of keeping secrets in plain sight. 🕵️‍♂️🔒",
  "Empty 'su' commands are like hidden Easter eggs in the world of coding. 🐣🍫",
];

export default function Prompt(props) {
  const { user, setContent, changeUser, history, setHistory } = props;

  const [prompt, setPrompt] = useState("");
  const inputRef = useRef(null);
  const threads = <Threads user={user} prompt={prompt} hostname={hostname} />;

  // regular expressionsconst suRegex = /\bsu\b/
  const suRegex = /^su$/;
  const emptySuRegex = /\bsu\s+\s*$/;
  const suValidation = /su\s+[a-zA-Z0-9]+/;
  const catRegex = /\bcat\b/;
  const catValidation = /cat\s+([^\s]+)/;
  const validLsCommand = prompt.trim(" ") === "ls";
  const validExitCommand = prompt.trim(" ") === "exit";
  const validHelpCommand = prompt.trim(" ") === "help";
  const validEmailCommand = prompt.trim(" ") === "email";
  const validClearCommand = prompt.trim(" ") === "clear";
  const validWhoAmICommand = prompt.trim(" ") === "whoami";
  const validRebootCommand = prompt.trim(" ") === "reboot";

  useEffect(() => {
    // Focus the input field when the component mounts
    inputRef.current.focus();

    // Add an event listener to the window to listen for focus
    const onFocus = () => {
      inputRef.current.focus();
    };

    window.addEventListener("focus", onFocus);

    // Add an event listener to the input field to prevent blur
    const onInputFocus = () => {
      inputRef.current.addEventListener("blur", onBlurPrevent);
    };

    const onBlurPrevent = (event) => {
      event.preventDefault();
      inputRef.current.focus();
    };

    inputRef.current.addEventListener("focus", onInputFocus);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener("focus", onFocus);
      inputRef.current.removeEventListener("focus", onInputFocus);
      inputRef.current.removeEventListener("blur", onBlurPrevent);
    };
  }, []);

  const executeCommand = (e) => {
    e.preventDefault();

    if (prompt.trim() !== "") {
      setHistory((prev) => [...prev, prompt.trim()]);
      setCurrentIndex(history.length + 1);
    }

    if (prompt.trim() === "") {
      setContent((prev) => [...prev, threads]);
    } else if (suRegex.test(prompt.trim(" ").split(" ")[0])) {
      if (suValidation.test(prompt.trim(" "))) {
        const username = prompt
          .trim(" ")
          .split(" ")
          .filter((i) => i !== "")[1];
        changeUser(username);
        setContent((prev) => [
          ...prev,
          threads,
          <Successful username={username} />,
        ]);
        console.log(`Hey ${username}!`);
      } else if (emptySuRegex.test(prompt)) {
        // Handle space after 'su '
        changeUser("");
        setContent((prev) => [
          ...prev,
          threads,
          <li>
            {
              emptySuResponses[
                Math.floor(Math.random() * emptySuResponses.length)
              ]
            }
          </li>,
        ]);
        console.warn("Oh! hacker!!!");
      } else {
        // Handle single 'su'
        setContent((prev) => [
          ...prev,
          threads,
          <ul class="list">
            <li>su: authentication failure</li>
            <li>login with a valid username</li>
          </ul>,
        ]);
        console.error("Authentication Failure!");
      }
      // changeUser(username)
      // setContent(prev => [...prev, threads, <li>Logged in as <i className='user'>{username}</i>.</li>])
    } else if (catRegex.test(prompt)) {
      if (catValidation.test(prompt.trim(" "))) {
        if (
          files.includes(
            prompt
              .trim(" ")
              .split(" ")
              .filter((word) => word !== "")[1]
          )
        ) {
          switch (
            prompt
              .trim(" ")
              .split(" ")
              .filter((word) => word !== "")[1]
          ) {
            case "skills.json":
              setContent((prev) => [
                ...prev,
                threads,
                <li>
                  <Skills />
                </li>,
              ]);
              break;
            case "portfolio.md":
              setContent((prev) => [
                ...prev,
                threads,
                <p className="portfolio">
                  {portfolioData.map((item) => (
                    <ul className="item">
                      <li className="spacing">
                        <a href={item.url}>{item.title}</a>
                      </li>
                      <li className="usage">
                        <p>{item.description}</p>
                        {item.additionalInfo && <p>{item.additionalInfo}</p>}
                      </li>
                    </ul>
                  ))}
                </p>,
              ]);
              break;
            case "contact.md":
              setContent((prev) => [
                ...prev,
                threads,
                contact.map((item) => (
                  <li>
                    <a href={item.url}>{item.title}</a>
                  </li>
                )),
              ]);
              break;
            default:
              setContent((prev) => [
                ...prev,
                threads,
                <li>
                  cat:{" "}
                  {
                    prompt
                      .trim(" ")
                      .split(" ")
                      .filter((word) => word !== "")[1]
                  }
                  : No such file or directory
                </li>,
              ]);
              break;
          }
        } else {
          setContent((prev) => [
            ...prev,
            threads,
            <li>
              cat{" "}
              {
                prompt
                  .trim(" ")
                  .split(" ")
                  .filter((word) => word !== "")[1]
              }
              : No such file or directory
            </li>,
          ]);
        }
      } else {
        setContent((prev) => [
          ...prev,
          threads,
          <li>cat: missing file operand</li>,
        ]);
      }
    } else if (validLsCommand) {
      // Handle 'ls' command
      setContent((prev) => [...prev, threads, <FileList files={files} />]);
    } else if (validEmailCommand) {
      // Handle 'email' command
      setContent((prev) => [...prev, threads, <Email />]);
    } else if (validHelpCommand) {
      // Handle 'help' command
      setContent((prev) => [...prev, <Help threads={threads} />]);
    } else if (validWhoAmICommand) {
      // Handle 'whoami' command
      setContent((prev) => [...prev, threads, <WhoAmI user={user} />]);
    } else if (validRebootCommand) {
      // Handle 'reboot' command
      window.location.reload();
    } else if (validClearCommand) {
      // Handle 'clear' command
      setContent([]);
    } else if (validExitCommand) {
      // Handle 'exit' command
      window.close();
    } else {
      setContent((prev) => [
        ...prev,
        threads,
        <InvalidCommand prompt={prompt} />,
      ]);
    }

    // Clear the input field after handling the command
    setPrompt("");
  };
  const [currentIndex, setCurrentIndex] = useState(history.length);
  const scrollInputIntoView = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  const handleInputChange = (value) => {
    setPrompt(value);

    // Manually trigger the onChange event
    // const event = new Event("change", { bubbles: true });
    const event = new Event("change");
    inputRef.current.dispatchEvent(event);
  };

  const navigateHistory = (direction) => {
    const historyLength = history.length;

    let newIndex = currentIndex + direction;

    // Clamp newIndex to a valid index range
    newIndex = Math.max(0, Math.min(newIndex, historyLength));

    if (newIndex !== currentIndex) {
      const newValue = newIndex < historyLength ? history[newIndex] : "";
      setCurrentIndex(newIndex);
      handleInputChange(newValue);
    }
  };

  return (
    <li className="prompt" id="#input">
      <span className="user">{user}</span>
      <span className="at">@</span>
      <span className="host">{hostname}</span>
      <span className="seperator">:~</span>
      <span className="dollar">$ </span>
      <form
        onSubmit={(e) => {
          executeCommand(e);
          scrollInputIntoView();
        }}
        style={{ display: "inline" }}
      >
        <input
          type="text"
          value={prompt}
          ref={inputRef}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          autoCapitalize="none"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.keyCode === 38 || e.key === "ArrowUp") {
              navigateHistory(-1);
            }
            if (e.keyCode === 40 || e.key === "ArrowDown") {
              navigateHistory(1);
            }
          }}
        />
      </form>
    </li>
  );
}
