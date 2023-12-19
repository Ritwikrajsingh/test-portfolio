import React from "react";
import "./index.css";

const skills = {
  languages: [
    "javascript",
    "python",
    "java",
    "html",
    "css",
    "C",
    "C++",
    "dart",
    "micropython",
  ],
  frameworks: [
    "node.js",
    "express.js",
    "sequelize",
    "react.js",
    "next.js",
    "flutter",
    "bootstrap",
  ],
  databases: ["sql", "nosql", "postgresql", "mongodb", "mysql"],
  tools: ["git", "vscode", "nvm", "android-studio", "sass", "opencv"],
  misc: [
    "linux",
    "rest-api",
    "jupyter-notebook",
    "matplotlib",
    "numpy",
    "pandas",
    "tkinter",
    "kivy",
    "pyqt",
    "pygame",
    "raspberry-pi",
  ],
};

export default function Skills() {
  return (
    <div>
      <span className="green">{"{"}</span>
      <div className="skills">
        {Object.entries(skills).map(([category, items]) => (
          <div className="skills-categories" key={category}>
            <i className="skill-category-name">{category}</i>:
            <span className="brown">{"["}</span>
            <ul className="skill-category-items">
              {items.map((item, index) => (
                <li className="red" key={index}>
                  '{item}'
                  {index < items.length - 1 ? (
                    <span className="black">,</span>
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
            <span className="brown">{"]"}</span>
          </div>
        ))}
      </div>
      <span className="green">{"}"}</span>
    </div>
  );
}
