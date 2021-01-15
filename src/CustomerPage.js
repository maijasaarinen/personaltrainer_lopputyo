import React from 'react';
import './App.css';
import CustomerList from './components/CustomerList'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function CustomerPage() {
  return (
    <div className="App">
      <CustomerList />
    </div>
  );
}

export default CustomerPage;