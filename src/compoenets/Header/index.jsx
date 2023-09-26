import React, { useState, useEffect } from 'react'
import { osIdentifiers } from '../../data'

export default function Header() {
    const [os, setOs] = useState("");

    useEffect(() => {
        const userAgent = navigator.userAgent;

        for (const osInfo of osIdentifiers) {
            if (userAgent.includes(osInfo.identifier)) {
                setOs(osInfo.name)
                break;
            }
        }
    }, [])

    // Login info
    const date = new Date();
    // Get the current GMT offset in minutes
    const gmtOffsetMinutes = date.getTimezoneOffset();
    const gmtOffsetHours = Math.floor(Math.abs(gmtOffsetMinutes) / 60);
    const gmtOffsetMinutesRemainder = Math.abs(gmtOffsetMinutes) % 60;

    return (
        <li>
            <ul className="welcome">
                <li>
                    <pre> </pre>
                </li>
                <li>
                    <i className="grey" style={{ fontSize: "24px", marginBottom: "2rem" }}>ritwik.sh</i>
                </li>
                <li>
                    <pre> </pre>
                </li>
                <li>
                    <pre><i className="grey">Last login: {date.toLocaleDateString("en-US")}, {date.toLocaleTimeString("en-US", { hour12: true })} GMT{gmtOffsetMinutes > 0 ? "-" : "+"}{gmtOffsetHours.toString().padStart(2, "0")}:{gmtOffsetMinutesRemainder.toString().padStart(2, "0")} {os && `on ${os}`}</i></pre>
                </li>
                <li>
                    <pre> </pre>
                </li>
                <li>
                    <pre><i className="greetings">{"{{ greetings }}"}</i> </pre>
                </li>
                <li>
                    <pre> </pre>
                </li>
                <li>
                    <pre>I'm <i className="host">Ritwik Raj Singh</i>, a software engineer{/*<i className="blue">/</i>*/}</pre>
                </li>
                <li>
                    <pre> </pre>
                </li>
                <li>
                    <pre>Type <i className="yellow command">`help`</i> to get a list of commands</pre>
                </li>
                <li>
                    <pre> </pre>
                </li>
            </ul>
        </li>
    )
}