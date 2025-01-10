import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import generateToken from "../createToken";
import { generateUid } from "../uidGen";
import Auth from "./Auth";
import LiveChat from "./LiveChat";
import { Video, AlertCircle } from "lucide-react";

const rtc = {
	// For the local audio and video tracks.
	localAudioTrack: null,
	localVideoTrack: null,
	client: null,
};

const options = {
	appId: "7ac8167595aa47aeb4ddf6b34353ec38",
	uid: generateUid(),
};

rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

const WatchStream = ({ user }) => {
	const { streamId } = useParams();
	const [showStream, setShowStream] = useState(false);
	const videoStream = useRef();

	useEffect(() => {
		const getStream = async () => {
			rtc.client.setClientRole("audience");
			await rtc.client.join(
				options.appId,
				"test",
				generateToken(options.uid, "test"),
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
			// Leave the channel when component unmounts.
			await rtc.client.leave();
		};
	}, [streamId]);

	return (
		<>
			<div className="min-h-screen bg-[#0F0F0F] text-white">
				<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

				<div className="relative container mx-auto px-4 py-6">
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-2xl font-bold">quikStream</h1>

						<Auth user={user} />
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2 space-y-4">
							<div className="aspect-video bg-black/50 rounded-lg overflow-hidden">
								{!showStream ? (
									<div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
										<Video className="w-16 h-16 text-gray-400 mb-4" />
										<h2 className="text-xl font-semibold mb-2">
											No Video Stream
										</h2>
										<p className="text-gray-400 max-w-md">
											The stream hasn't started yet or there might be a
											connection issue.
										</p>
										<div className="mt-4 flex items-center text-yellow-500">
											<AlertCircle className="w-5 h-5 mr-2" />
											<span className="text-sm">
												Please check your connection or try again later.
											</span>
										</div>
									</div>
								) : (
									<div ref={videoStream} className="w-full h-full" />
								)}
							</div>
						</div>
						<div>
							{" "}
							{showStream && <LiveChat streamId={streamId} user={user} />}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WatchStream;
