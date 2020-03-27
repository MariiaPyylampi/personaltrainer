import React from 'react';
import './App.css';

import PersistentDrawerLeft from './components/Drawer'
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';
import Calendar from './components/Calendar';

import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {

    return (
      <div className="App">
        <BrowserRouter>
        <div>
          <PersistentDrawerLeft />
        <Switch>
          <Route exact path="/" component={Customerlist} />
          <Route path="/trainingslist" component={Trainingslist} />
          <Route path="/calendar" component={Calendar} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
        </div>
        </BrowserRouter>
      </div>
    );
  }

export default App;
