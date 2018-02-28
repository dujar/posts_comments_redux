import React from 'react'
import Posts from '../Posts'

class Categories extends React.Component {

  render(){
 const {categories} = this.props
    return(
        <Posts category={categories} posts={this.props.posts} />
    )
  }
}

export default Categories