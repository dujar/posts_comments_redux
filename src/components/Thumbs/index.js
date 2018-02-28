import React from 'react'
import ThumbsDown from 'react-icons/lib/fa/thumbs-down'
import ThumbsUp from 'react-icons/lib/fa/thumbs-up'
import {connect} from 'react-redux'
import {votePostAsync} from '../../store/actions/posts'
import {voteCommentAsync} from '../../store/actions/comments'
import {withRouter} from 'react-router-dom'

const thumbs = (props) =>
 {
   const {post, comment} = props

if(props.post){
  return(
    <div>
    <ThumbsDown onClick={() => props.votePost(post.id,"downVote")} />
    <ThumbsUp onClick={() => props.votePost(post.id,"upVote")}/>
    </div>
  )
}

if(props.comment){
  return(
    <div>
    <ThumbsDown onClick={() => props.voteComment(comment.id,"downVote",props.postId)} />
    <ThumbsUp onClick={() => props.voteComment(comment.id,"upVote",props.postId)}/>
    </div>
  )
}
}
const mapDispatchToProps =(dispatch) => {
  return {
    votePost: (id,vote) => dispatch(votePostAsync(id,vote)),
    voteComment: (id,vote, postId) => dispatch(voteCommentAsync(id,vote,postId))
  }
}

export default withRouter(connect(null,mapDispatchToProps)(thumbs))