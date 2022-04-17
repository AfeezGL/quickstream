import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const HomeScreem = () => {
  const [streamId, setstreamId] = useState("");
  const history = useHistory();

  //   navigate to watchstream page when user submits form
  const submit = (e) => {
    e.preventDefault();
    history.push(`watch/${streamId}`);
  };

  return (
    <>
      <header>
        <h1>QuickStream</h1>
        <p>
          Connect with your friends and fans without the hassels of special
          softwares and signups signups
        </p>
        <p>The stress free way to watch your favourite people do their thing</p>
      </header>
      <div className="call-to-action">
        <Link to="/stream" className="create-stream-btn">
          Create a stream
        </Link>
        <form onSubmit={submit}>
          <h2>Watch a stream</h2>
          <input
            type="text"
            name="streamId"
            placeholder="paste stream id"
            onChange={(e) => {
              setstreamId(e.target.value);
            }}
          />
          <div className="submit-btn-container">
            <input type="submit" value="Watch Stream" />
          </div>
        </form>
      </div>
    </>
  );
};

export default HomeScreem;
