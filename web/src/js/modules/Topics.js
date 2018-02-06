import React from 'react';
import {
    Route,
    Link
} from 'react-router-dom';
import Topic from './Topic';

export default (prop) => (
    <div>
        <h2>Topics {JSON.stringify(prop)}</h2>
        <ul>
            <li>
                <Link to={`${prop.match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${prop.match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${prop.match.url}/props-v-state`}>
                    Props v. States
                </Link>
            </li>
        </ul>

        <Route path={`${prop.match.url}/:topicId`} component={Topic}/>
        <Route exact path={prop.match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
)