import React from 'react';
import { Box } from 'reactbulma';
import DeleteButton from 'react-icons/lib/ti/delete-outline';
import { withRouter } from 'react-router-dom';
import EditComment from '../../EditComment'
import {
  deleteCommentAsync
} from '../../../../../store/actions/comments';
import EditButton from 'react-icons/lib/md/edit';
import {connect} from 'react-redux'
import Thumbs from '../../../../../components/Thumbs'

class Comment extends React.Component {
  state = {
    edit: false
  };
  render() {
    const { comment } = this.props;
    return (
      <Box>
        <strong>Edit Comment:</strong>
        <EditButton
          onClick={() =>
            this.setState(state => {
              return { edit: !state.edit };
            })
          }
        />
        <strong>Delete me:</strong>
        <DeleteButton
          onClick={() => {
            this.props.deleteComment(comment, this.props.post);
          }}
        />
        <strong>Vote!</strong>
        <Thumbs comment={comment} postId={this.props.post.id}/>
        {this.state.edit && (
          <div>
            <EditComment id={comment.parentId} comment={comment} edit={()=> this.setState((state) => {
              return {edit: !state.edit}
            })}/>
          </div>
        )}
        {!this.state.edit && (
          <div>
            <div>
              <strong>body:</strong>
              {comment.body ? comment.body : null}
            </div>
            <div>
              <strong>author:</strong>
              {comment.author ? comment.author : null}
            </div>
            <div>
              <strong>Vote Score:</strong>
              {comment.voteScore}
            </div>
          </div>
        )}
      </Box>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteComment: (comment,post) => dispatch(deleteCommentAsync(comment,post))
  };
}
export default withRouter(connect(null,mapDispatchToProps)(Comment));
