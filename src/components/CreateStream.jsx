import AgoraRTC from 'agora-rtc-sdk-ng';
import { Copy, Video } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Toaster, toast } from 'sonner';
import generateToken from '../createToken';
import Auth from './Auth';
import LiveChat from './LiveChat';

const options = {
	appId: '7ac8167595aa47aeb4ddf6b34353ec38',
	uid: 1,
};

const CreateStream = ({ user }) => {
	const [streamId, setStreamId] = useState('');
	const streamUrl = `${window.location.protocol}//${window.location.host}/watch/${streamId}`;

	const myStream = useRef();
	const localVideoTrack = useRef(null);
	const localAudioTrack = useRef(null);

	const client = useRef(AgoraRTC.createClient({ mode: 'live', codec: 'vp8' }));

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(streamUrl);
			toast.success('Stream link copied to clipboard');
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	useEffect(() => {
		const startSream = async () => {
			// create stream id
			let id = crypto.randomUUID();
			setStreamId(id);

			// create client
			client.current.setClientRole('host');
			await client.current.join(options.appId, 'test', generateToken(options.uid, 'test'), options.uid);

			// Create an audio track from the audio sampled by a microphone.
			localAudioTrack.current = await AgoraRTC.createMicrophoneAudioTrack();
			// Create a video track from the video captured by a camera.
			localVideoTrack.current = await AgoraRTC.createCameraVideoTrack();

			// Publish the local audio and video tracks to the channel.
			await client.current.publish([localAudioTrack.current, localVideoTrack.current]);

			localVideoTrack.current.play(myStream.current);
		};

		startSream();

		return async () => {
			// Leave the channel.
			await client.current.leave();
		};
	}, []);

	return (
		<>
			<Toaster
				theme='dark'
				toastOptions={{
					style: {
						background: '#333',
						color: '#fff',
						border: '1px solid #444',
					},
				}}
			/>

			<div className='min-h-screen bg-[#0F0F0F] text-white'>
				<div className='absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none' />

				<div className='relative container mx-auto px-4 py-6'>
					<div className='flex justify-between items-center mb-6'>
						<h1 className='text-2xl font-bold flex items-center justify-center'>
							Live Streaming
							<span className='ml-2'>
								<Video color='red' />
							</span>
						</h1>

						<Auth user={user} />
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						<div className='lg:col-span-2 space-y-4'>
							<div className='aspect-video bg-black/50 rounded-lg overflow-hidden'>
								<div ref={myStream} className='w-full h-full' />
							</div>

							<div className='bg-white/5 p-4 rounded-lg'>
								<div className='flex items-center gap-2'>
									<input
										type='text'
										value={streamUrl}
										readOnly
										className='flex-1 bg-transparent border border-gray-600 rounded py-2 px-3 text-sm text-gray-300'
									/>
									<button
										onClick={copyToClipboard}
										className='bg-white  px-4 py-2 rounded font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors'
									>
										<Copy className='h-4 w-4 text-black' color='black' />
									</button>
								</div>
							</div>
						</div>
						<div>{streamId && <LiveChat streamId={streamId} host={true} user={user} />}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateStream;
