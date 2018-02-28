import React from 'react'
import Posts from '../Posts'

class Categories extends React.Component {

  render(){
 const {categories,category} = this.props

 if(categories){
    return(
        <Posts category={categories} posts={this.props.posts} />
    )
  }


if(category){
  return(
    <Posts category={[category]} posts={this.props.posts.filter(item => item.category === category )}/>
  )
}
  }
}

export default Categories