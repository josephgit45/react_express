import React, { Component } from 'react';
import PostItem from './PostItem';

class Posts extends Component {
  render() {
    let posts;
    if(this.props.posts){
        posts = this.props.posts.map(post => {
            return (
                <div className = "postRow"><PostItem key = {post.username} post={post}/></div>
            );
        });
    }
    return (
      <div className="Posts">
        {posts}
      </div>
    );
  }
}

export default Posts;