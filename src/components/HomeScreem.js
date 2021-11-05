import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomeScreem = () => {
    const [streamId, setstreamId] = useState("");

    return (
        <div>
            <h1>HomeScreen</h1>
            <Link to="/stream">Create a stream</Link>
            <h2>Watch a stream</h2>
            <input
                type="text"
                name="streamId"
                placeholder="paste stream id"
                onChange={(e) => {
                    setstreamId(e.target.value);
                }}
            />
            <Link to={`watch/${streamId}`}>Watch Stream</Link>
        </div>
    );
};

export default HomeScreem;
