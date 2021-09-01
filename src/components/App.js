import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';

const { create } = require('ipfs-http-client')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      imageUploaded: null
    }
  }
  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      console.log(reader.result)
      this.setState({
        buffer: Buffer(reader.result)
      })
    }
  }

  // QmYDPVN5mLyPZQwYx2uZ3zEU3HGY5mzdrPReof6c9XizhK
  onSubmit = async (event) => {
    event.preventDefault()
    const ipfs = await create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'
    })
    let result = await ipfs.add(this.state.buffer)
    console.log(result)
    this.setState({
      imageUploaded: `https://cloudflare-ipfs.com/ipfs/${result.path}`
    })
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <span className="text-white p-2">Meme of the Day</span>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <img src={(this.state.imageUploaded) ? this.state.imageUploaded : logo} className='App-logo' alt='logo' />
                <h2>Change meme</h2>
                <form onSubmit={this.onSubmit}>
                  <input type='file' onChange={this.captureFile} />
                  <input type='submit' />
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
