import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Menus from './Menus';
import Home from './router/Home';
import Mine from './router/Mine';


ReactDOM.render((
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/mine" component={Mine}/>

            {/*菜单栏*/}
            <Menus/>
        </div>
    </Router>
), document.getElementById('content'));