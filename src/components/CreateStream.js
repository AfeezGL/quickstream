import AgoraRTC from "agora-rtc-sdk-ng";
import { uuid } from "uuidv4";
import { useEffect, useRef, useState } from "react";
import generateToken from "../createToken";
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
	uid: 1,
};

rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

const CreateStream = ({ user }) => {
	const [streamId, setStreamId] = useState("");
	const myStream = useRef();

	useEffect(() => {
		const startSream = async () => {
			// create stream id
			let id = uuid();
			setStreamId(id);

			// create client
			rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
			rtc.client.setClientRole("host");
			await rtc.client.join(
				options.appId,
				"test",
				generateToken(options.uid, "test"),
				options.uid
			);

			// Create an audio track from the audio sampled by a microphone.
			rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
			// Create a video track from the video captured by a camera.
			rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

			// Publish the local audio and video tracks to the channel.
			await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

			rtc.localVideoTrack.play(myStream.current);
		};

		startSream();

		return async () => {
			// Leave the channel.
			await rtc.client.leave();
		};
	}, []);

	return (
		<>
			<header className="streaming-pages-header">
				<h1>Create Stream</h1>
				<Auth user={user} />
			</header>
			<div className="streamContainer">
				<div className="video">
					<div ref={myStream} className="video-container"></div>
					<p>https://quick-stream.web.app/watch/{streamId}</p>
				</div>
				{streamId && <LiveChat streamId={streamId} host={true} user={user} />}
			</div>
		</>
	);
};

export default CreateStream;
