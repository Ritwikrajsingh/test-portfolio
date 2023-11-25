import React from "react";

export default function Successful({ username }) {
  return (
    <li>
      Logged in as <i className="user">{username}</i>.
    </li>
  );
}
