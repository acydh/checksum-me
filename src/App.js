import React, { Component } from 'react';
import Form from './components/Form';
import Experiment from './components/Experiment';
import './App.css';

class App extends Component {

  render() {

    return (
      // <Form />
      <>
        <Experiment />
        <Form />
      </>
    );
  }
}
export default App;
