import AgoraRTC from 'agora-rtc-sdk-ng';
import { AlertCircle, Video, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import generateToken from '../createToken';
import { generateUid } from '../uidGen';
import Auth from './Auth';
import LiveChat from './LiveChat';

const options = {
	appId: '7ac8167595aa47aeb4ddf6b34353ec38',
	uid: generateUid(),
};

const WatchStream = ({ user }) => {
	const { streamId } = useParams();
	const [showStream, setShowStream] = useState(false);
	const [autoplayFailed, setAutoplayFailed] = useState(false);
	const videoStream = useRef();

	AgoraRTC.onAutoplayFailed = () => {
		setAutoplayFailed(true);
	};

	const client = useRef(AgoraRTC.createClient({ mode: 'live', codec: 'vp8' }));

	useEffect(() => {
		const getStream = async () => {
			client.current.setClientRole('audience');
			await client.current.join(options.appId, 'test', generateToken(options.uid, 'test'), options.uid);

			client.current.on('user-published', async (user, mediaType) => {
				await client.current.subscribe(user, mediaType);

				if (mediaType === 'video') {
					setShowStream(true);
					const remoteVideoTrack = user.videoTrack;
					remoteVideoTrack.play(videoStream.current);
				}

				if (mediaType === 'audio') {
					const remoteAudioTrack = user.audioTrack;
					remoteAudioTrack.play();
				}
			});
		};

		getStream();

		return async () => {
			await client.current.leave();
		};
	}, [streamId]);

	return (
		<>
			<div className='min-h-screen bg-[#0F0F0F] text-white'>
				<div className='absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none' />

				<div className='relative container mx-auto px-4 py-6'>
					<div className='flex justify-between items-center mb-6'>
						<h1 className='text-2xl font-bold'>QuickStream</h1>

						<Auth user={user} />
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						<div className='lg:col-span-2 space-y-4'>
							<div className='aspect-video bg-black/50 rounded-lg overflow-hidden relative'>
								{!showStream ? (
									<div className='w-full h-full flex flex-col items-center justify-center text-center p-4'>
										<Video className='w-16 h-16 text-gray-400 mb-4' />
										<h2 className='text-xl font-semibold mb-2'>No Video Stream</h2>
										<p className='text-gray-400 max-w-md'>
											The stream hasn't started yet or there might be a connection issue.
										</p>
										<div className='mt-4 flex items-center text-yellow-500'>
											<AlertCircle className='w-5 h-5 mr-2' />
											<span className='text-sm'>
												Please check your connection or try again later.
											</span>
										</div>
									</div>
								) : null}

								<div ref={videoStream} className='w-full h-full' />

								{autoplayFailed && (
									<button
										className='absolute bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 py-2 px-4 rounded font-semibold flex items-center justify-center'
										onClick={() => {
											setAutoplayFailed(false);
										}}
									>
										<VolumeX />
									</button>
								)}
							</div>
						</div>
						<div> {showStream && <LiveChat streamId={streamId} user={user} />}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WatchStream;
