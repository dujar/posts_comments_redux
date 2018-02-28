import React from 'react';
import Post from './Post';
import { Button } from 'reactbulma';
import sortBy from 'sort-by';
import {withRouter} from 'react-router-dom'

class Posts extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log('didmount:', this.props.posts);
    if (this.props.posts) {
      this.setState({ posts: this.props.posts });
    }
  }
  handleSortByDate = () => {
    let selectedPosts = this.props.posts.sort(sortBy('-timestamp'));
    this.setState({ posts: selectedPosts });
  };

  handleSortByTitle = () => {
    let selectedPosts = this.props.posts.sort(sortBy('-title'));
    this.setState({ posts: selectedPosts });
  };
  render() {
    let postItems = null;

    if (this.props.category && this.props.location.pathname !== "/posts") {
      return this.props.category.map(cat => {
        postItems = this.props.posts.filter(post => cat === post.category);
        let mappedPosts = postItems.map(post => (
          <div className="column" key={post.id}>
            <Post post={post} />
          </div>
        ));
        return (
          <div>
            <div className="has-text-centered">
              <strong>
                <Button info onClick={() => this.props.history.push("/"+cat)}>{cat}</Button>
              </strong>
            </div>
            <div className="columns is-centered is-multiline">
              {mappedPosts}
            </div>
          </div>
        );
      });
    }


    if (this.props.location.pathname === "/posts") {
      postItems = this.state.posts.map(post => {
        return (
          <div key={post.id}>
            <div className="columns is-centered is-multiline">
              <div className="column">
                <Post post={post} />
              </div>
            </div>
          </div>
        );
      });

      return (
        <div>
          <button onClick={this.handleSortByDate}>Sort by date</button>
          <button onClick={this.handleSortByTitle}>Sort by title</button>
          {postItems}
        </div>
      );
    }

    return postItems
  }
}

export default withRouter(Posts);
