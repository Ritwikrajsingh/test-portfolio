import React from "react";

export default function Email() {
  return (
    <li class="email">
      <a
        href="mailto:ritwikrajdhangta@gmail.com"
        target="_blank"
        rel="noreferrer"
      >
        ritwikrajdhangta<span className="black">{" {at} "}</span>gmail
        <span className="black">{" {dot} "}</span>com
      </a>
    </li>
  );
}
