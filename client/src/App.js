import React, { Component } from 'react';
import './App.css';
import Posts from './components/Posts'

class App extends Component {
  constructor(){
    super();
    this.state = {
      venmoPosts: [],
      webSocket: new WebSocket('ws://159.89.144.153:8001')
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

    addPost("Sample User 1", "06-28-2018", "yo i wanna give a shoutout to my boy fred", ".10", "https://media.istockphoto.com/photos/red-apple-picture-id495878092?k=6&m=495878092&s=612x612&w=0&h=q9k5jN-1giBGZgTM6QhyKkPqtGf6vRpkgDzAwEz9DkY=");
    addPost("Sample User 2", "06-28-2018", "yo i wanna give a shoutout to my boy tom", ".10", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMmZvlOjc6450J56KEHL83Qs8JUYhbddubOJAQaLO5InXD0PddLw");
    addPost("Sample User 3", "06-28-2018", "yo i wanna give a shoutout to my boy cam", ".10", "https://icdn3.digitaltrends.com/image/walmart-cyber-monday-720x720.jpg?ver=1.jpg");
    addPost("Sample User 4", "06-28-2018", "yo i wanna give a shoutout to my boy tim", ".10", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMmZvlOjc6450J56KEHL83Qs8JUYhbddubOJAQaLO5InXD0PddLw");
    addPost("Sample User 5", "06-28-2018", "yo i wanna give a shoutout to my boy mike", ".10", "https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg");


    var webSocket = this.state.webSocket;
    webSocket.onclose = function(event){
      console.log("yo i got closed!");
    }.bind(this);

    webSocket.onmessage = function(event){
      console.log(event.data);
      var venmoPosts = this.state.venmoPosts;
      venmoPosts.unshift(JSON.parse(event.data));
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