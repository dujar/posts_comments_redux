import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoriesAsync } from './store/actions/categories';
import { getPostsAsync } from './store/actions/posts';
import { Hero, Button, Container, Title, SubTitle } from 'reactbulma';
import { Route, Switch, withRouter, NavLink } from 'react-router-dom';

import Posts from './containers/Posts';
import Post from './containers/Posts/Post';
import Categories from './containers/Categories';
import CreatePost from './containers/Posts/Post/CreatePost';
import ErrorComponent from './components/ErrorComponent';

import 'bulma/css/bulma.css';
import 'bulma';

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
          <ErrorComponent />
        </div>
      );
    }

    let buttonGoBack =
      this.props.location.pathname === '/' ? null : (
        <Button info onClick={() => this.props.history.goBack()}>
          Go back
        </Button>
      );

    let navButton =
      this.props.location.pathname === '/' ? (
        <div>
          <Button info>
            <NavLink to="/createpost">create a Post</NavLink>
          </Button>
          <Button info>
            <NavLink to="/posts">Check Out existing Posts</NavLink>
          </Button>
        </div>
      ) : null;
    return (
      <div>
        <Hero primary>
          <Hero.Body>
            <Container>
              <Title>Post your thought!</Title>
              <SubTitle>get random comments!</SubTitle>
            </Container>
          </Hero.Body>
        </Hero>
        {navButton}
        {buttonGoBack}
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              if (posts)
                return <Categories categories={categories} posts={posts} />;
              else return <div> No posts available! :(</div>;
            }}
          />
          <Route
            path="/posts"
            exact
            render={() => (
              <div className="columns is-centered">
                <Posts posts={posts} />
              </div>
            )}
          />

          <Route
            path="/createpost"
            exact
            render={() => (
              <div className="columns is-centered">
                <CreatePost />
              </div>
            )}
          />
          <Route
            path="/editpost/:id"
            exact
            render={() => (
              <div className="columns is-centered">
                <CreatePost />
              </div>
            )}
          />
          <Route
            path="/posts/:id"
            exact
            render={({ match: { params } }) => {
              if (posts) {
                let post = posts.filter(post => post.id === params.id);
                return <Post post={post[0]} />;
              } else return <div>what to do its unpredicatable</div>;
            }}
          />
          <Route
            path="/:category"
            exact
            render={({ match: { params } }) => {
              let matched = this.props.categories.filter(
                item => item === params.category
              )
              if (matched) {
                return (
                  <div className="columns is-centered">
                    <Categories category={params.category} posts={posts} />
                  </div>
                );
              } else {
                <ErrorComponent />;
              }
            }}
          />
          <Route path="/*" component={ErrorComponent} />
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
