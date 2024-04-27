import './App.css';
import Meesage from './pages/Message';
import Home from './pages/Home';
import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/message" component={Meesage}/>
          <Route path="/home" component={Home}/>
          <Redirect to="/home"/>
        </Switch>
    </div>
  );
}

export default App;
