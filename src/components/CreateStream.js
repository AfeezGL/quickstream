import AgoraRTC from "agora-rtc-sdk-ng";
import React, { useEffect, useRef, useState } from "react";
import Auth from "./Auth";
import LiveChat from "./LiveChat";

const rtc = {
  // For the local audio and video tracks.
  localAudioTrack: null,
  localVideoTrack: null,
  client: null,
};

const options = {
  appId: "7ac8167595aa47aeb4ddf6b34353ec38",
  channel: "test",
  token:
    "0067ac8167595aa47aeb4ddf6b34353ec38IAA+7QV4e0KyD+TfKeNir/s+w6kjMK/QB1sBCSubDJQUlQx+f9gAAAAAEAA7zd8LXIZaYgEAAQBchlpi",
  uid: 12,
};

rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

const CreateStream = ({ user }) => {
  const [streamId, setStreamId] = useState("");
  const myStream = useRef();

  useEffect(() => {
    const startSream = async () => {
      setStreamId(options.channel);
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

      rtc.localVideoTrack.play(myStream.current);

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
          <div ref={myStream} className="video-container"></div>
          <p>{streamId}</p>
        </div>
        {streamId && <LiveChat streamId={streamId} />}
      </div>
    </div>
  );
};

export default CreateStream;
