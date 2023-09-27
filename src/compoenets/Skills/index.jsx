import React from 'react';
import { skills } from '../../data';
import './index.css'

export default function Skills() {
    return (
        <div>
            <span className='green'>{'{'}</span>
            <div className='skills'>
                {Object.entries(skills).map(([category, items]) => (
                    <div className='skills-categories' key={category}>
                        <i className='skill-category-name'>{category}</i>:
                        <span className='brown'>{'['}</span>
                        <ul className='skill-category-items'>
                            {items.map((item, index) => (
                                <li className='red' key={index}>'{item}'{index < items.length - 1 ? <span className='black'>,</span> : ''}</li>
                            ))}
                        </ul>
                        <span className='brown'>{']'}</span>
                    </div>
                ))}
            </div>
            <span className='green'>{'}'}</span>
        </div>
    );
}
