import AgoraRTC from "agora-rtc-sdk-ng";
import React, { useEffect, useRef, useState } from "react";
import Auth from "./Auth";
import LiveChat from "./LiveChat";

const CreateStream = ({ user }) => {
  const [streamId, setStreamId] = useState("");
  const myStream = useRef();

  const rtc = {
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
    client: null,
  };

  const options = {
    appId: "7ac8167595aa47aeb4ddf6b34353ec38",
    channel: "test",
    token: "19edc60b759d4bd2a699c7faa23f91cf",
    uid: 123456,
  };

  setStreamId(options.uid);

  useEffect(() => {
    const startSream = async () => {
      // create client
      rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      rtc.client.setClientRole("host");
      await rtc.client.join(
        options.appId,
        options.channel,
        options.token,
        options.uid
      );

      // Create an audio track from the audio sampled by a microphone.
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      // Create a video track from the video captured by a camera.
      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

      // Publish the local audio and video tracks to the channel.
      await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

      rtc.localVideoTrack.play();

      console.log("publish success!");
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
