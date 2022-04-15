import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
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
  uid: 15,
};

rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

const WatchSream = ({ user }) => {
  const { streamId } = useParams();
  const [showStream, setShowStream] = useState(false);
  const videoStream = useRef();

  useEffect(() => {
    const getStream = async () => {
      rtc.client.setClientRole("audience");
      await rtc.client.join(
        options.appId,
        options.channel,
        options.token,
        options.uid
      );

      rtc.client.on("user-published", async (user, mediaType) => {
        // Subscribe to a remote user.
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");

        if (mediaType === "video") {
          // show video stream
          setShowStream(true);

          // Get `RemoteVideoTrack` in the `user` object.
          const remoteVideoTrack = user.videoTrack;

          // Play the remote video track.
          remoteVideoTrack.play(videoStream.current);
        }

        // If the subscribed track is audio.
        if (mediaType === "audio") {
          // Get `RemoteAudioTrack` in the `user` object.
          const remoteAudioTrack = user.audioTrack;
          // Play the audio track. No need to pass any DOM element.
          remoteAudioTrack.play();
        }
      });
    };

    getStream();

    return async () => {
      // Leave the channel.
      await rtc.client.leave();
    };
  }, [streamId]);

  return (
    <div>
      <h1>Watch stream</h1>
      <Auth user={user} />
      <div className="streamContainer">
        {!showStream ? (
          <div className="no-video">No Video Stream</div>
        ) : (
          <div className="video-container" ref={videoStream}></div>
        )}
        <LiveChat streamId={streamId} />
      </div>
    </div>
  );
};

export default WatchSream;
