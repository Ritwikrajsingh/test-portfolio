import React from "react";

export default function InvalidCommand({ prompt }) {
  return (
    <ul className="line">
      <li>
        <pre>command not found: {prompt.trim(" ")}</pre>
      </li>
    </ul>
  );
}
