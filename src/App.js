import React from 'react';
import './App.css';
import CustomerList from './components/CustomerList'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import CustomerPage from './CustomerPage';
import TrainingPage from './TrainingPage';

function App() {
  return (
    <div>

      <BrowserRouter>

        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                Personal Trainer
              </Typography>
            </Toolbar>
            <Tabs
              indicatorColor="primary"
              fullWidth>
              <Tab label="Customers" component={Link} to="/"/>
              <Tab label="Trainings" component={Link} to="/trainings"/>
            </Tabs>
          </AppBar>
          <Switch>
                <Route exact path="/" component={CustomerPage}/>
                <Route exact path="/trainings" component={TrainingPage}/>
                <Route render={()  => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
