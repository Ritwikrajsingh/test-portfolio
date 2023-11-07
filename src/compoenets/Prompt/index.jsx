import React, { useRef, useState, useEffect } from "react";
import Threads from "./Threads";
import FileList from "../FileList";
import WhoAmI from "../WhoAmI";
import Skills from "../Skills";
import { contact, portfolio } from "../../data";
import Help from "../Help";

const portfolioData = await portfolio();

export default function Prompt(props) {
  const { user, setContent, changeUser, emptySuResponses, files, hostname } =
    props;
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
          <li>
            Logged in as <i className="user">{username}</i>.
          </li>,
        ]);
        console.log(`Hey ${username}!`);
      } else if (emptySuRegex.test(prompt)) {
        // Handle space after 'su '
        // console.log(!emptySuRegex.test(prompt.trim(" ")), prompt.trim(" "))
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
        console.log("Oh! hacker!!!");
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
        console.log("Authentication Failure!");
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
      // Handle 'emaiil' command
      setContent((prev) => [
        ...prev,
        threads,
        <li class="email">
          <a
            href="mailto:ritwikrajdhangta@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            ritwikrajdhangta<span className="black">{" {at} "}</span>gmail
            <span className="black">{" {dot} "}</span>com
          </a>
        </li>,
      ]);
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
      switch (prompt) {
        default:
          setContent((prev) => [
            ...prev,
            <>
              {threads}
              <ul className="line">
                <li>
                  <pre>command not found: {prompt.trim(" ")}</pre>
                </li>
              </ul>
            </>,
          ]);
          break;
      }
    }

    // Clear the input field after handling the command
    setPrompt("");
  };

  const scrollInputIntoView = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
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
          onChange={(e) => setPrompt(e.target.value)}
          autocapitalize="none"
        />
      </form>
    </li>
  );
}
