import React, { useRef, useState, useEffect } from 'react'
import Threads from './Threads';
import FileList from '../FileList';
import WhoAmI from '../WhoAmI';
import Skills from '../Skills';
import { contact, portfolio } from '../../data';

const portfolioData = await portfolio()

export default function Prompt(props) {
    const { user, setContent, changeUser, emptySuResponses, files, hostname } = props;
    const [prompt, setPrompt] = useState("")
    const inputRef = useRef(null)
    const threads = <Threads user={user} prompt={prompt} hostname={hostname} />

    // regular expressionsconst suRegex = /\bsu\b/
    const suRegex = /^su$/
    const suValidation = /su [a-zA-Z0-9]+/
    const catRegex = /\bcat\b/
    const catValidation = /cat\s+([^\s]+)/

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

        if (prompt.trim() === '') {
            setContent(prev => [...prev, threads])
        } else if (suRegex.test(prompt)) {
            const username = prompt.split(" ")[1]
            changeUser(username)
            setContent(prev => [...prev, threads, <li>Logged in as <i className='user'>{username}</i>.</li>])
        } else if (catRegex.test(prompt)) {
            if (catValidation.test(prompt.trim(" "))) {
                if (files.includes(prompt.trim(" ").split(" ").filter(word => word !== "")[1])) {
                    switch (prompt.trim(" ").split(" ").filter(word => word !== "")[1]) {
                        case 'skills.json':
                            setContent(prev => [...prev, threads, <li><Skills /></li>])
                            break;
                        case 'portfolio.md':
                            setContent(prev => [...prev, threads, portfolioData.map(item => <ul className='test'>
                                <li className='spacing' ><a href={item.url}>{item.title}</a></li><li className='usage'><p>{item.description}</p>{item.additionalInfo && <p>{item.additionalInfo}</p>}</li>
                            </ul>)])
                            break;
                        case 'contact.md':
                            setContent(prev => [...prev, threads, contact.map(item => <li><a href={item.url}>{item.title}</a></li>)])
                            break;
                        default:
                            setContent(prev => [...prev, threads, <li>cat: {prompt.trim(" ").split(" ").filter(word => word !== "")[1]}: No such file or directory</li>])
                            break;
                    }
                } else {
                    setContent(prev => [...prev, threads, <li>cat {prompt.trim(" ").split(" ").filter(word => word !== "")[1]}: No such file or directory</li>])
                }
            }
            else {
                setContent(prev => [...prev, threads, <li>cat: missing file operand</li>])
            }
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
                                <i class="usage">log in</i>
                            </li>
                            <li>
                                <i class="yellow command spacing">ls </i>
                                <i class="usage">show files in directory</i>
                            </li>
                            <li>
                                <i class="yellow command spacing">whoami </i>
                                <i class="usage">learn more about me</i>
                            </li>
                            <li>
                                <div className='spacing'><i class="yellow command">cat </i>
                                    <i class="italic">FILENAME</i></div>
                                <i class="usage">show content of a file</i>
                            </li>
                        </ul>
                    </li>])
                    break;
                case 'su':
                    // Handle 'su' command
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
                    setContent(prev => [...prev, threads, <FileList files={files} />])
                    break;
                case 'whoami':
                    // Handle 'whoami' command
                    setContent(prev => [...prev, threads, <WhoAmI user={user} />])
                    break;
                case 'email':
                    setContent(prev => [...prev, threads, <li class='email'><a
                        href='mailto:ritwikrajdhangta@gmail.com'
                        target='_blank'
                        rel='noreferrer'>ritwikrajdhangta<span className='black'>{' {at} '}</span>gmail<span className='black'>{' {dot} '}</span>com</a></li>])

                    // Handle 'emaiil' command
                    break;
                case 'clear':
                    // Handle 'clear' command
                    setContent([])
                    break;
                case 'reboot':
                    // Handle 'reboot' command
                    window.location.reload()
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
                                <pre>command not found: {prompt.trim(" ").split(" ")[0]}</pre>
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
            <span className="at">@</span>
            <span className="host">{hostname}</span>
            <span className="seperator">:~</span>
            <span className="dollar">$ </span>
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
