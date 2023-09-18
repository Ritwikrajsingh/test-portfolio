import React, { useRef, useState, useEffect } from 'react'
import Threads from './Threads';
import List from '../List';
import { emptySuResponses } from '../../data';

export default function Prompt({ user, setContent, changeUser }) {
    const [prompt, setPrompt] = useState("")
    const inputRef = useRef(null);
    const threads = <Threads user={user} prompt={prompt} />
    // const suRegex = /su .+/
    const suRegex = /su [a-zA-Z0-9]+/

    useEffect(() => {
        // Focus the input field when the component mounts
        inputRef.current.focus();

        // Add an event listener to the window to listen for focus
        const onFocus = () => {
            inputRef.current.focus();
        };

        window.addEventListener('focus', onFocus);

        // Add an event listener to the input field to prevent blur
        const onInputFocus = () => {
            inputRef.current.addEventListener('blur', onBlurPrevent);
        };

        const onBlurPrevent = (event) => {
            event.preventDefault();
            inputRef.current.focus();
        };

        inputRef.current.addEventListener('focus', onInputFocus);

        // Clean up the event listeners when the component unmounts
        return () => {
            window.removeEventListener('focus', onFocus);
            inputRef.current.removeEventListener('focus', onInputFocus);
            inputRef.current.removeEventListener('blur', onBlurPrevent);
        };
    }, []);

    const executeCommand = (e) => {
        e.preventDefault();

        console.log(suRegex.test(prompt))

        if (prompt.trim() === '') {
            setContent(prev => [...prev,
                threads])
        } else if (suRegex.test(prompt)) {
            const username = prompt.split(" ")[1]
            changeUser(username)
            setContent(prev => [...prev, threads, <li>Logged in as <i className='user'>{username}</i>.</li>])
        } else {
            switch (prompt) {
                case 'help':
                    // Handle 'help' command
                    setContent(prev => [...prev,
                    <li>
                        {threads}
                        <ul class="help-body">
                            <li>
                                Available commands along with a description of their usage:
                            </li>
                            <li>
                                <div className='spacing'>
                                    <i class="yellow command">su </i>
                                    <i class="italic">USERNAME</i>
                                </div>
                                <i class="grey">log in</i>
                            </li>
                            <li>
                                <i class="yellow command spacing">ls </i>
                                <i class="grey">show files in directory</i>
                            </li>
                            <li>
                                <i class="yellow command spacing">whoami </i>
                                <i class="grey">learn more about me</i>
                            </li>
                            <li>
                                <div className='spacing'><i class="yellow command">cat </i>
                                    <i class="italic">FILENAME</i></div>
                                <i class="grey">show content of a file</i>
                            </li>
                        </ul>
                    </li>])
                    break;
                case 'reboot':
                    // Handle 'su' command
                    window.location.reload()
                    break;
                case 'su':
                    // Handle 'su' command
                    console.log(prompt.split(' '))
                    setContent(prev => [...prev, threads, <ul class='list'>
                        <li>su: authentication failure</li>
                        <li>login with a valid username</li>
                    </ul>])
                    break;
                case 'su ':
                    // Handle 'su' command
                    changeUser("")
                    setContent(prev => [...prev, threads, <li>{emptySuResponses[Math.floor(Math.random() * emptySuResponses.length)]}</li>])
                    break;
                case 'ls':
                    // Handle 'ls' command
                    setContent(prev => [...prev, threads, <List />])
                    break;
                case 'whoami':
                    // Handle 'whoami' command
                    break;
                case 'email':
                    // Handle 'emaiil' command
                    break;
                case 'cat':
                // Handle 'cat' command
                case 'cat ':
                    // Handle 'cat ' command
                    setContent(prev => [...prev, threads, <li>cat: missing file operand</li>])
                    break;
                case 'clear':
                    // Handle 'clear' command
                    setContent([])
                    break;
                case 'exit':
                    // Handle 'exit' command Close the current window
                    window.close();
                    break;
                default:
                    setContent(prev => [...prev,
                    <>
                        {threads}
                        <ul className='line'>
                            <li>
                                <pre>command not found: {prompt}</pre>
                            </li>
                        </ul>
                    </>
                    ])
                    break;
            }
        }

        // Clear the input field after handling the command
        setPrompt("");
    }

    return (
        <li className="prompt">
            <span className="user">{user}</span>
            @
            <span className="domain">ritwik.sh</span>
            <span className="directory">:~</span>
            <span className="tick">$ </span>
            <form onSubmit={executeCommand} style={{ display: 'inline' }}>
                <input
                    type='text'
                    value={prompt}
                    ref={inputRef}
                    onChange={e => setPrompt(e.target.value)}
                    autocapitalize="none"
                />
            </form>
        </li>
    )
}
