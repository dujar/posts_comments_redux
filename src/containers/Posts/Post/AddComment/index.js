import React from 'react';
import {withRouter} from 'react-router-dom'
import { Textarea, Input, Button } from 'reactbulma';
import {
  addCommentAsync,
  updateCommentAsync
} from '../../../../store/actions/comments';
import serialize from 'form-serialize';
import { connect } from 'react-redux';


class AddComment extends React.Component {
  state = {
    author: '',
    body: '',
    fieldmissing: false
  };

  componentWillMount() {
    if (this.props.comment) {
      console.log('the state should be comment:', this.props.comment);
      this.setState({
        author: this.props.comment.author,
        body: this.props.comment.body
      });
    }
  }
  submitComment = comment => {
    comment.preventDefault();
    this.setState({ fieldmissing: false });
    console.log(comment.target);
    comment = serialize(comment.target, { hash: true });
    comment.parentId = this.props.post.id;
    if(this.props.comment){
    comment.id = this.props.comment.id
    }


    console.log('submitted comment:', comment);
    console.log('comment:', comment);
    let simpleValidation = comment.body && comment.author;
    if (!simpleValidation) {
      return this.setState({ fieldmissing: true });
    }
    console.log("pass validation")
    this.props.addComment(comment,this.props.post);
    this.props.commentToAdd()
    this.props.history.push("/posts/"+this.props.post.id)
  };

  handleComment = comment => {
    comment.preventDefault();
    let eventName = comment.target.name;
    let eventValue = comment.target.value;
    let possibleEventKeyNames = Object.keys(this.state);
    possibleEventKeyNames.map(name => {
      if (name === eventName) {
        this.setState({
          [name]: eventValue
        });
      }
    });
  };

  render() {
    let button = this.props.comment ? (
      <Button primary>Update</Button>
    ) : (
      <Button info>Submit</Button>
    );

    let fieldmissing = this.state.fieldmissing ? (
        <strong>
          Something is missing. please make sure the comment fields are filled!
        </strong>
    ) : null;
    return (
      <section>
        {fieldmissing}
        <form onSubmit={this.submitComment.bind(this)}>
          <field>
            <strong>body:</strong>
            <Textarea
              name="body"
              value={this.state.body}
              onChange={this.handleComment.bind(this)}
            />
          </field>
          <field>
            <strong>author:</strong>
            <Input
              name="author"
              value={this.state.author}
              onChange={this.handleComment.bind(this)}
            />
          </field>
          {button}
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addComment: (comment,post) => dispatch(addCommentAsync(comment,post)),
    updateComment: comment => dispatch(updateCommentAsync(comment))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(AddComment));
