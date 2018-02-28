import React from 'react'

import {connect} from 'react-router'
import {getPostsAsync} from '../store/actions/posts'



class Posts extends React.Component {


  componentDidMount(){
  getPosts()
  }

  render(){
    return(
      <div>
        hi there
      </div>
    )
  }
}


const mapStateToProps = ({posts}) => {
  return {
    posts
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    getPosts: () => dispatch(getPostsAsync())
  }
}