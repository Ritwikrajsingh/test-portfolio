import React from 'react'

export default function FileList({ files }) {
    return (
        <li className='files'>{files.map(file => <i>{file}</i>)}</li>
    )
}
