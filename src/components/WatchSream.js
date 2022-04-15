import Peer from "peerjs";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { uuid } from "uuidv4";
import Auth from "./Auth";
import LiveChat from "./LiveChat";

const WatchSream = ({ user }) => {
    const { streamId } = useParams();
    const videoStream = useRef();

    useEffect(() => {
        const uid = uuid();
        const peer = new Peer(uid, {
            host: "/",
            port: process.env.NODE_ENV === "development" ? 9000 : 443,
            path: "/peerjs",
            secure: process.env.NODE_ENV === "development" ? false : true,
        });

        peer.on("open", () => {
            console.log("open");
            const connection = peer.connect(streamId);
            connection.on("open", () => {
                console.log("connection successful");
                connection.send("hello");
                connection.on("data", (data) => {
                    console.log(data);
                });
            });
            connection.on("error", (error) => {
                console.log(error);
            });
        });

        peer.on("call", (call) => {
            console.log("incoming call");
            call.answer();
            call.on("stream", (stream) => {
                videoStream.current.srcObject = stream;
                console.log("recieving stream");
            });
        });
    }, [streamId]);

    return (
        <div>
            <h1>Watch stream</h1>
            <Auth user={user} />
            <div className="streamContainer">
                <video className="video" ref={videoStream} muted autoPlay />
                <LiveChat streamId={streamId} />
            </div>
        </div>
    );
};

export default WatchSream;
