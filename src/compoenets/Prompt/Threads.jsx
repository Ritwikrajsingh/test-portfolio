import React from 'react'

export default function Threads({ user, prompt }) {
    return (
        <div className="prompt">
            <span className="user">{user}</span>
            @
            <span className="domain">ritwik.sh</span>
            <span className="directory">:~</span>
            <span className="tick">$ </span>
            <span className='line'> {prompt && <>{prompt}</>}</span>
        </div>
    )
}