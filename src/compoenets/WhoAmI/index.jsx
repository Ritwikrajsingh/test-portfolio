import React from "react";

export default function WhoAmI({ user }) {
  return (
    <li className="list whoami">
      <div>
        <li>
          Hey {user ? <i className="user">{user}</i> : "stranger"}, welcome to
          my digital den! I go by the name{" "}
          <i className="host">@ritwikrajsingh.</i>
        </li>
        <li>
          I'm a full-time code wizard living the tech life up in Shimla,
          Himachal Pradesh, India, where the mountains are my CPU coolers!💻
        </li>
      </div>
      <div>
        <li>
          I sling code for{" "}
          <a
            href="https://tunicalabsmedia.com"
            target="_blank"
            rel="noreferrer"
          >
            TunicaTech
          </a>
          , where we're on a quest to conquer the tech universe.
        </li>
        <li>
          As a passionate back-end engineer, I thrive on the intricacies of the
          digital realm, ensuring the gears behind the scenes run smoother than
          a well-oiled machine, making technology not just accessible but
          downright enjoyable for everyone!🌟
        </li>
      </div>
      <div>
        <li>
          When I'm not conjuring up digital spells, you'll often find me gaming,
          strumming my guitar, belting out a tune, or indulging in some
          essential sleep to recharge my superpowers.
        </li>
      </div>
      <div>
        <li>
          You can find me unleashing tech musings and some random antics on{" "}
          <a
            href="https://x.com/RitwikRajSingh2"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>{" "}
          and{" "}
          <a
            href="https://instagram.com/s_t_f_u_bitch_"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          .
        </li>
        <li>
          Or, just type <i className="command">`email`</i> to get my electronic
          pigeon.📧{" "}
        </li>
      </div>
    </li>
  );
}
