import React from 'react';
import { withRouter } from 'react-router-dom';
import Comments from './Comments/';
import { connect } from 'react-redux';
import { deletePostAsync } from '../../../store/actions/posts';
import AddButton from 'react-icons/lib/md/add-circle';
import AddComment from './AddComment/';
import ClickPostCrud from '../../../components/ClickPostCrud';
import { Box } from 'reactbulma';
import Thumbs from '../../../components/Thumbs'
import ErrorComponent from '../../../components/ErrorComponent'

class Post extends React.Component {
  state = {
    commentToAdd: false
  };

  render() {
    const { post, location, posts } = this.props;

    let postItem = post;

    if(!postItem){
      return(
        <ErrorComponent message={"You are trying to access a post that has to my guess been deleted"}/>
      )
    }
    let comments = null;
    if (
      postItem &&
      postItem.commentCount > 0 &&
      this.props.location.pathname !== '/' &&
      this.props.location.pathname !== '/posts'

    ) {
      comments = <Comments post={postItem} />;
    }

    let commentToAdd = null;
    if (this.state.commentToAdd) {
      commentToAdd = (
        <AddComment
          post={postItem}
          commentToAdd={() => this.setState({ commentToAdd: false })}
        />
      );
    }
    let addButtonComment = null;
    if (this.props.location.pathname !== '/' &&
        this.props.location.pathname !== '/posts'
        ) {
      addButtonComment = (
        <div>
          <strong>add comment:</strong>
          <AddButton
            onClick={() =>
              this.setState({ commentToAdd: !this.state.commentToAdd })
            }
          />
        </div>
      );
    }
    console.log('postItem:', postItem);
    return (
      <Box style={{ maxWidth: '350px' }}>
        <ClickPostCrud post={postItem} />
        <hr />
        <div>
          <strong>title:</strong>
          {postItem.title}
        </div>
        <div>
          {' '}
          <strong>body:</strong>
          {postItem.body}
        </div>
        <div>
          <strong>author:</strong>
          {postItem.author}
        </div>
        <div>
          <strong>Vote Score:</strong>
          {postItem.voteScore}
          <div>
            <strong>#comments:</strong>
            {postItem.commentCount}
          </div>
          <div>
            <strong>author:</strong>
            {postItem.author}
          </div>
          <div>
            <span />
          </div>
        </div>
        <Thumbs post={postItem} />
        <hr />
        <div>{comments}</div>
        {commentToAdd}
        <div>{addButtonComment}</div>
      </Box>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletePost: post => dispatch(deletePostAsync(post))
  };
};
export default withRouter(connect(null, mapDispatchToProps)(Post));
