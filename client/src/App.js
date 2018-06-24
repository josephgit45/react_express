import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      venmoPosts: [],
      webSocket: new WebSocket('ws://socketsubtest.localtunnel.me')
    }
  }

  componentDidMount() {
    // fetch('/venmo/allPosts')
      // .then(res => res.json())
      // .then(venmoPosts => this.setState({ venmoPosts }));
    var webSocket = this.state.webSocket;
    webSocket.onclose = function(event){
      console.log("yo i got closed!");
    }.bind(this);

    webSocket.onmessage = function(event){
      console.log(event.data);
      var venmoPosts = this.state.venmoPosts;
      venmoPosts.push(JSON.parse(event.data));
      this.setState({venmoPosts});
    }.bind(this);

    this.setState({webSocket});
  }

  render() {
    return (
      <div className="App">
        <h1>Venmo Posts</h1>
        {this.state.venmoPosts.map(post =>
          <div key={post.username}>{post.dateCreated} - {post.username} - {post.amount} -{post.note}</div>
        )}
      </div>
    );
  }
}

export default App;