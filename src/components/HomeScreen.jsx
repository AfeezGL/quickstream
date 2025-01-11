import { Play, Video } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router';
import { Toaster, toast } from 'sonner';

const HomeScreen = () => {
	const [streamId, setstreamId] = useState('');
	const baseUrl = `${window.location.host}/watch`;

	//   navigate to watchstream page when user submits form
	const submit = (e) => {
		e.preventDefault();
		if (!streamId.includes(baseUrl)) {
			toast.error('Invalid stream link provided');
		} else {
			window.location.href = streamId;
		}
	};

	return (
		<>
			<div className='min-h-screen bg-[#0F0F0F] text-white'>
				<div className='absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none' />

				<div className='relative container mx-auto px-4 py-16 flex flex-col items-center'>
					<div className='text-center space-y-6 max-w-3xl mx-auto mb-16'>
						<h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent'>
							quikStream
						</h1>
						<p className='text-lg md:text-xl text-gray-300 max-w-2xl mx-auto'>
							Connect with your friends and fans without the hassles of special software and signups. The
							stress-free way to watch your favorite people do their thing.
						</p>
					</div>

					<div className='w-full max-w-md mb-8'>
						<Link to='/stream'>
							<button className='w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 py-2 px-4 rounded font-semibold flex items-center justify-center'>
								<Video className='mr-2 h-5 w-5' />
								Create a stream
							</button>
						</Link>
					</div>

					<div className='w-full max-w-md space-y-2'>
						<h2 className='text-sm font-semibold text-gray-300'>Watch a stream</h2>
						<form onSubmit={submit}>
							<div className='flex gap-2'>
								<input
									type='text'
									placeholder='Paste stream link'
									className='bg-white/5 border-white/10  placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 flex-grow  border border-gray-600 rounded py-2 px-3 text-white placeholder-gray-500 focus:outline-none'
									onChange={(e) => {
										setstreamId(e.target.value);
									}}
								/>
								<button className='bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 bg-white  py-2 px-4 rounded font-semibold flex items-center justify-center'>
									<Play className='mr-2 h-4 w-4' />
									Watch Stream
								</button>
							</div>
						</form>
					</div>

					<div className='fixed inset-0 overflow-hidden pointer-events-none'>
						<div className='absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10' />
						<div className='absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10' />
					</div>
				</div>
			</div>
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
		</>
	);
};

export default HomeScreen;
