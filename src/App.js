import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategoriesAsync } from './store/actions/categories';
import { getPostsAsync } from './store/actions/posts';
import Aux from './hoc/Aux';
import ErrorDiv from './components/Error/';
import ReactLoading from 'react-loading';
import { Hero, Button } from 'reactbulma';
import { Route, Switch, withRouter, NavLink } from 'react-router-dom';

import Posts from './containers/Posts';
import Post from './containers/Posts/Post';
import Categories from './containers/Categories';
import CreatePost from './containers/Posts/Post/CreatePost'
import JsonView from 'react-pretty-json';
import ErrorComponent from './components/ErrorComponent'


import 'bulma/css/bulma.css';
import 'bulma'


class App extends Component {
  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  render() {
    const { posts, categories } = this.props;

    if (this.props.helper.hasErrored) {
      return (
        <div>
          <ErrorDiv />
        </div>
      );
    }
    if (this.props.helper.isLoading) {
      return (
        <div>
          <ReactLoading />
        </div>
      );
    }
    let buttonGoBack = this.props.location.pathname === "/"
    ? null :(
      <Button info onClick={()=> this.props.history.goBack()}>Go back</Button>
  )

    let navButton = this.props.location.pathname === "/"
       ? <div>
          <Button info><NavLink to="/createpost">create a Post</NavLink></Button>
          <Button info><NavLink to="/posts">Check Out existing Posts</NavLink></Button>
         </div>
       : null
    return (
      <div>
      {navButton}
      {buttonGoBack}
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              if (posts)
                return <Categories categories={categories} posts={posts} />;
              else return <div>what to do its unpredicatable</div>;
            }}
          />
          <Route path="/posts" exact render={() => <Posts posts={posts} />} />
          <Route path="/createpost" exact render={()=> <div className="columns is-centered"><CreatePost /></div>}/>
          <Route path="/editpost/:id" exact render={()=> <CreatePost />}/>
          <Route
            path="/posts/:id"
            exact
            render={({ match: { params } }) => {
              if (posts){
              let post = posts.filter(post => post.id === params.id)
                return <Post post={post[0]} />;
              }
              else return <div>what to do its unpredicatable</div>;
            }}
          />
          <Route path="/*" component={ErrorComponent}/>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(getCategoriesAsync()),
    getPosts: () => dispatch(getPostsAsync())
  };
};

const mapStateToProps = ({ categories, posts, helper }) => {
  return {
    categories: categories.categories,
    posts: posts.posts,
    helper
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
