import React from 'react'

export default function List() {
    const files = ['portfolio.md', 'skills.json', 'contact.md']
    return (
        <li className='files'>{files.map(file => <i>{file}</i>)}</li>
    )
}
