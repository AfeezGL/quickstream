import Peer from "peerjs";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { uuid } from "uuidv4";

const WatchSream = () => {
    const { streamId } = useParams();
    const videoStream = useRef();

    useEffect(() => {
        const uid = uuid();
        const peer = new Peer(uid);

        const connection = peer.connect(streamId);
        connection.on("open", () => {
            connection.send("hello");
            connection.on("data", (data) => {
                console.log(data);
            });
        });

        peer.on("call", (call) => {
            call.answer();
            call.on("stream", (stream) => {
                videoStream.current.srcObject = stream;
            });
        });
    }, []);

    return (
        <div>
            <h1>Watch stream</h1>
            <video ref={videoStream} muted autoPlay />
        </div>
    );
};

export default WatchSream;
