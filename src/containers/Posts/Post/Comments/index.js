import React from 'react';
import { Box } from 'reactbulma';
import DeleteButton from 'react-icons/lib/ti/delete-outline';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getCommentsAsync,
  getComments,
  deleteCommentAsync
} from '../../../../store/actions/comments';
import EditButton from 'react-icons/lib/md/edit';
import Comment from './Comment/'

class Comments extends React.Component {

  componentDidMount() {
    this.props.getComments(this.props.postId);
  }
  render() {
    if (!this.props.comments) {
      return <div>{JSON.stringify(this.props, null, 2)}</div>;
    }


    if (this.props.comments && this.props.comments.length > 0) {
      let postComments = this.props.comments.filter(
        item => item.parentId === this.props.postId && item.deleted === false && item.parentDeleted === false
      );
      console.log('comments:', postComments);
      return postComments.map(comment => <Comment comment={comment} postId={this.props.postId} key={comment.id}/>)
    }
  }
}

const maptStateToProps = ({ comments }) => {
  return {
    comments: comments.comments
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getComments: id => dispatch(getCommentsAsync(id)),
    deleteComment: comment => dispatch(deleteCommentAsync(comment))
  };
};

export default withRouter(
  connect(maptStateToProps, mapDispatchToProps)(Comments)
);
