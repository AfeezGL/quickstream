import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";
import { uuid } from "uuidv4";
import Auth from "./Auth";
import LiveChat from "./LiveChat";

const CreateStream = ({ user }) => {
    const [streamId, setStreamId] = useState("");
    const [stream, setStream] = useState(null);
    const myStream = useRef();

    const getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    useEffect(() => {
        const uid = uuid();
        const startSream = () => {
            // create peer
            const peer = new Peer(uid, {
                host: "/",
                port: process.env.NODE_ENV === "development" ? 9000 : 443,
                path: "/peerjs",
                secure: process.env.NODE_ENV === "development" ? false : true,
            });

            //create video stream
            getUserMedia(
                {
                    video: true,
                    audio: true,
                },
                (videoStream) => {
                    myStream.current.srcObject = videoStream; //this would show in the users' browser window
                    setStream(videoStream); //this would be sent to would be sent to whoever connects
                }
            );

            peer.on("open", function (id) {
                setStreamId(id);
            });

            peer.on("connection", (connection) => {
                const call = peer.call(connection.peer, stream);
                connection.on("data", (data) => {
                    console.log(data);
                });
            });
        };

        startSream();
    }, []);

    return (
        <div>
            <h1>Create Stream</h1>
            <Auth user={user} />
            <div className="streamContainer">
                <div className="video">
                    <video ref={myStream} muted autoPlay />
                    <p>{streamId}</p>
                </div>
                {streamId && <LiveChat streamId={streamId} />}
            </div>
        </div>
    );
};

export default CreateStream;
