import { useEffect, useState } from 'react';
import db, { timeStamp } from '../firebase';

const LiveChat = ({ user, streamId, host = false }) => {
	const [text, setText] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		db.collection('streams')
			.doc(streamId)
			.collection('messages')
			.orderBy('timestamp', 'asc')
			.onSnapshot((snapshot) => {
				const data = snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}));

				setMessages(data);
			});
	}, [streamId]);

	const submitForm = (e) => {
		e.preventDefault();
		if (!text) return;

		// Chatting as host
		if (host) {
			db.collection('streams')
				.doc(streamId)
				.collection('messages')
				.add({
					sender: user ? `${user.displayName} (Host)` : 'HOST',
					text,
					timestamp: timeStamp(),
				});

			setText('');
		}

		// Chatting as audience
		else {
			db.collection('streams')
				.doc(streamId)
				.collection('messages')
				.add({
					sender: user ? user.displayName : 'anonymous',
					text,
					timestamp: timeStamp(),
				});

			setText('');
		}
	};

	const Message = ({ message }) => {
		return (
			<p>
				<strong>{message.data.sender}: </strong>
				{message.data.text}
			</p>
		);
	};

	return (
		<>
			<div className='lg:col-span-1'>
				<div className='bg-white/5 rounded-lg aspect-square   flex flex-col'>
					<div className='p-4 border-b border-white/10'>
						<h2 className='font-semibold'>Live Chat</h2>
					</div>

					<div className='flex-1 overflow-y-auto p-4'>
						{messages.map((message) => (
							<Message key={message.id} message={message} />
						))}
					</div>

					<div className='p-2 border-t border-white/10'>
						<div className='flex gap-2 flex-col'>
							<form onSubmit={submitForm}>
								<input
									type='text'
									placeholder='Type a message...'
									id='text'
									value={text}
									onChange={(e) => {
										setText(e.target.value);
									}}
									className='flex-1 bg-transparent border border-gray-600 rounded py-2 px-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400'
								/>
								<button
									className='bg-white text-[#0F0F0F] px-4 py-[0.4rem] rounded font-medium hover:bg-gray-100 transition-colors'
									type='submit'
								>
									Send
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LiveChat;
