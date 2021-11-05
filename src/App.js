import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreem from "./components/HomeScreem";
import CreateStream from "./components/CreateStream";
import WatchSream from "./components/WatchSream";

function App() {
    return (
        <Router className="App">
            <Switch>
                <Route path="/" exact>
                    <HomeScreem />
                </Route>
                <Route path="/stream">
                    <CreateStream />
                </Route>
                <Route path="/watch/:streamId">
                    <WatchSream />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
