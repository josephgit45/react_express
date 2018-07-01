import React, { Component } from 'react';

class PostItem extends Component {
  render() {
    let post;
    if (this.props.post){
        post = this.props.post;
        return (
            <div>
              <img className="userImage" src={post.url}></img>
              <div className="userText">
              <strong>{post.username}</strong>
              <p>{post.note}</p>
              </div>
            </div>
        );
    }
  }
}

export default PostItem;
