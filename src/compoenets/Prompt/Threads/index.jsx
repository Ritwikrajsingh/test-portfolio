import React from 'react'

export default function Threads(props) {

    const { user, prompt, hostname } = props
    return (
        <div className="prompt">
            <span className="user">{user}</span>
            <span className="at">@</span>
            <span className="host">{hostname}</span>
            <span className="seperator">:~</span>
            <span className="dollar">$ </span>
            <pre style={{ display: 'inline' }}><span className='line'>{prompt && <>{prompt}</>}</span></pre>
        </div>
    )
}