import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import todoReducers from './modules/Todo/reducers';
import Bundle from './components/Bundle';
import loadHome from 'bundle-loader?lazy!./modules/Home';
import loadAbout from 'bundle-loader?lazy!./modules/About';
import Topics from './modules/Topics';

const Home = (props) => (
    <Bundle load={loadHome}>
        {(Home) => <Home {...props}/>}
    </Bundle>
);

const About = (props) => (
    <Bundle load={loadAbout}>
        {(About) => <About {...props}/>}
    </Bundle>
);

let store = createStore(todoReducers);
const App = () => (
    <Provider store={store}>
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                </ul>
                <hr/>

                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/>
            </div>
        </Router>
    </Provider>
);
export default App