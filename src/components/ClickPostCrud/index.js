import React from 'react';
import {withRouter} from 'react-router-dom'
import EditButton from 'react-icons/lib/ti/edit';
import ViewPost from 'react-icons/lib/ti/eye';
import AddButton from 'react-icons/lib/md/add-circle';
import Aux from '../../hoc/Aux'
import DeleteButton from 'react-icons/lib/ti/delete-outline';
import {connect } from 'react-redux'
import { deletePostAsync } from '../../store/actions/posts';


const clickPostCrud = props => {

  const {location, post, history, deletePost} = props

  let editPost = location.pathname === "/"
  ? <field>
      <strong>View Post:</strong> <ViewPost onClick={() => history.push('/posts/' + post.id)}/>
    </field>
  : null;




  return (
    <div>
        {editPost}
      <field>
        <strong>Delete Post:</strong>
        <DeleteButton onClick={() => {
          deletePost(post)
          history.push("/")
          }
        } />
      </field>
      {'      '}
      <field>
        <strong>Edit Post:</strong>
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
    deletePost: post => dispatch(deletePostAsync(post))
  };
};
export default withRouter(connect(null,mapDispatchToProps)(clickPostCrud));
