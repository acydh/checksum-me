import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      hashes: [],
      selectedFile: null
    }
  }

  render() {

    const handleChange = e => {
      this.setState({ selectedFile: e.target.files[0] });
    }

    const onClickHandler = () => {
      const data = new FormData();
      data.append('file', this.state.selectedFile);
      axios.post("/file", data)
        .then(res => {
          this.setState({ hashes: res.data });
        })
    }

    return (
      <div className="App">
        <p>Upload a file and get the checksums</p>

        <input type="file" onChange={handleChange} />
        <button onClick={onClickHandler}>Send</button>
        <ul>
          {this.state.hashes ? (
            this.state.hashes.map(hash => <li key={hash.cypher}>{hash.cypher}: {hash.hashed}</li>)
          )
            : null}
        </ul>
      </div>
    );
  }
}
export default App;
