import React, { Component } from 'react';
import './App.css';
import Posts from './components/Posts'

class App extends Component {
  constructor(){
    super();
    this.state = {
      venmoPosts: [],
      webSocket: new WebSocket('ws://localhost:8001')
    }
  }


  componentDidMount() {
    var self = this;
    function addPost(username,date_created,note,amount,url){
      let mockData = {};
      mockData.username = username;
      mockData.date_created = date_created;
      mockData.note = note;
      mockData.amount = amount;
      mockData.url = url;
      var venmoPosts = self.state.venmoPosts;
      venmoPosts.push(mockData);
      self.setState({venmoPosts});
    }

    addPost("Joseph-Lee-44", "06-28-2018", "yo i wanna give a shoutout to my boy fred", ".10", "https://media.istockphoto.com/photos/red-apple-picture-id495878092?k=6&m=495878092&s=612x612&w=0&h=q9k5jN-1giBGZgTM6QhyKkPqtGf6vRpkgDzAwEz9DkY=");
    addPost("Josh-Lee-we", "06-28-2018", "yo i wanna give a shoutout to my boy fred", ".10", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMmZvlOjc6450J56KEHL83Qs8JUYhbddubOJAQaLO5InXD0PddLw");
    addPost("Jessica-Lee-we", "06-28-2018", "yo i wanna give a shoutout to my boy fred", ".10", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMmZvlOjc6450J56KEHL83Qs8JUYhbddubOJAQaLO5InXD0PddLw");
    addPost("Yicheng-Lee-we", "06-28-2018", "yo i wanna give a shoutout to my boy fred", ".10", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMmZvlOjc6450J56KEHL83Qs8JUYhbddubOJAQaLO5InXD0PddLw");
    addPost("Meiyuan-Lee-we", "06-28-2018", "yo i wanna give a shoutout to my boy fred", ".10", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMmZvlOjc6450J56KEHL83Qs8JUYhbddubOJAQaLO5InXD0PddLw");


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
        <h1 id="mainHeader">@VenmoShoutouts</h1>
        <Posts posts = {this.state.venmoPosts}></Posts>
      </div>
    );
  }
}

export default App;