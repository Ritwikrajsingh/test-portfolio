import React from 'react'

export default function Help({ threads }) {
    return <li>
        {threads}
        <ul class="help-body">
            <li>
                Available commands along with a description of their usage:
            </li>
            <li>
                <div className='spacing'>
                    <i class="yellow command">su </i>
                    <i class="attributes">USERNAME</i>
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
                    <i class="attributes">FILENAME</i></div>
                <i class="usage">show content of a file</i>
            </li>
        </ul>
    </li>
}
