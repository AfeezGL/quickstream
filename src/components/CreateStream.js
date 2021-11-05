import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";
import { uuid } from "uuidv4";

const CreateStream = () => {
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
            const peer = new Peer(uid);

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
                peer.call(connection.peer, stream); // call whoever connects
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
            <video ref={myStream} muted autoPlay />
            <p>{streamId}</p>
        </div>
    );
};

export default CreateStream;
