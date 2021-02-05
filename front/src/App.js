import './App.css';
import "@patternfly/react-core/dist/styles/base.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import About from "./pages/About"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add" component={Add} />
          <Route path="/about" component={About} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
