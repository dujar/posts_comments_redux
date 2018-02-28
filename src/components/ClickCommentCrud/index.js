import React from 'react';
import {withRouter} from 'react-router-dom'
import EditButton from 'react-icons/lib/ti/edit';
import ViewPost from 'react-icons/lib/ti/eye';
import AddButton from 'react-icons/lib/md/add-circle';
import Aux from '../../hoc/Aux'
import DeleteButton from 'react-icons/lib/ti/delete-outline';
import {connect } from 'react-redux'
import { deleteCommentAsync } from '../../store/actions/comments';


const clickCommentCrud = props => {

  const {location, post, comment, history, deleteComment} = props

  let editComment = location.pathname === "/"
  ? <field>
      <strong>View Comment:</strong> <ViewPost onClick={() => history.push('/posts/' + post.id)}/>
    </field>
  : null;

  return (
    <div>
        {editComment}
      <field>
        <strong>Delete Comment:</strong>
        <DeleteButton onClick={() => deletePost(post)} />
      </field>
      {'      '}
      <field>
        <strong>Edit Comment:</strong>
        <EditButton
          onClick={() =>
            history.push('/editpost/' + post.id, post)
          }
        />
      </field>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteComment: post => dispatch(deleteCommentAsync(id))

  };
};
export default withRouter(connect(null,mapDispatchToProps)(clickPostCrud));
