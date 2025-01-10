import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import CreateStream from './components/CreateStream';
import HomeScreen from './components/HomeScreen';
import WatchStream from './components/WatchStream';
import { auth } from './firebase';

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setUser(user);
		});
	}, []);

	return (
		<BrowserRouter className='App'>
			<Routes>
				<Route path='/' element={<HomeScreen user={user} />} />
				<Route path='/stream' element={<CreateStream user={user} />} />
				<Route path='/watch/:streamId' element={<WatchStream user={user} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
