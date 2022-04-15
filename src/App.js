import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreem from "./components/HomeScreem";
import CreateStream from "./components/CreateStream";
import WatchSream from "./components/WatchSream";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);
    return (
        <Router className="App">
            <Switch>
                <Route path="/" exact>
                    <HomeScreem user={user} />
                </Route>
                <Route path="/stream">
                    <CreateStream user={user} />
                </Route>
                <Route path="/watch/:streamId">
                    <WatchSream user={user} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
