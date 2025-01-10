import AgoraRTC from 'agora-rtc-sdk-ng';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import generateToken from '../createToken';
import { generateUid } from '../uidGen';
import Auth from './Auth';
import LiveChat from './LiveChat';

const rtc = {
	// For the local audio and video tracks.
	localAudioTrack: null,
	localVideoTrack: null,
	client: null,
};

const options = {
	appId: '7ac8167595aa47aeb4ddf6b34353ec38',
	uid: generateUid(),
};

rtc.client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });

const WatchStream = ({ user }) => {
	const { streamId } = useParams();
	const [showStream, setShowStream] = useState(false);
	const videoStream = useRef();

	useEffect(() => {
		const getStream = async () => {
			rtc.client.setClientRole('audience');
			await rtc.client.join(options.appId, 'test', generateToken(options.uid, 'test'), options.uid);

			rtc.client.on('user-published', async (user, mediaType) => {
				// Subscribe to a remote user.
				await rtc.client.subscribe(user, mediaType);
				console.log('subscribe success');

				if (mediaType === 'video') {
					// show video stream
					setShowStream(true);

					// Get `RemoteVideoTrack` in the `user` object.
					const remoteVideoTrack = user.videoTrack;

					// Play the remote video track.
					remoteVideoTrack.play(videoStream.current);
				}

				// If the subscribed track is audio.
				if (mediaType === 'audio') {
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
			<header className='streaming-pages-header'>
				<h1>Watch stream</h1>
				<Auth user={user} />
			</header>
			<div className='streamContainer'>
				{!showStream ? (
					<div className='no-video'>No Video Stream</div>
				) : (
					<div className='video-container' ref={videoStream}></div>
				)}
				<LiveChat streamId={streamId} user={user} />
			</div>
		</>
	);
};

export default WatchStream;
