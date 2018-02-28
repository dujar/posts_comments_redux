import React from 'react';
import { Input, Button, Textarea, Field } from 'reactbulma';
import { withRouter } from 'react-router-dom';
import { addPostAsync, updatePostAsync } from '../../../../store/actions/posts';
import serialize from 'form-serialize';
import { connect } from 'react-redux';

class CreatePost extends React.Component {
  state = {
    author: '',
    body: '',
    title: '',
    category: '',
    fieldmissing: false
  };

  handleSubmit = post => {
    post.preventDefault();
    this.setState({ fieldmissing: false });
    console.log(post.target);
    post = serialize(post.target, { hash: true });
    console.log(post);
    let simpleValidation =
      Object.keys(post).map(item => post[item]).length !== 4;
    console.log('valid:', simpleValidation);

    if (simpleValidation) {
      return this.setState({ fieldmissing: true });
    }
    console.log('state from location:', this.props.location.state);
    if (this.props.location.state) {
      post.id = this.props.location.state.id;
      this.props.updatePost(post);
    } else {
      this.props.addPost(post);
    }
    this.setState({ fieldmissing: false });
    this.props.history.push('/');
  };

  handleChange = e => {
    e.preventDefault();

    let eventName = e.target.name;
    let eventValue = e.target.value;
    let possibleEventKeyNames = Object.keys(this.state);
    possibleEventKeyNames.map(name => {
      if (name === eventName) {
        this.setState({
          [name]: eventValue
        });
      }
    });
  };

  handleReset = e => {
    e.preventDefault();
    this.setState({
      author: '',
      body: '',
      title: '',
      category: '',
      fieldmissing: false,
      editPage: false
    });
  };
  render() {
    console.log(JSON.stringify(JSON.stringify(this.props.location.state)));

    if (this.props.location.state && !this.state.editPage) {
      const { author, body, title, category } = this.props.location.state;
      this.setState({
        editPage: true,
        category,
        title,
        body,
        author
      });
    }
    let fieldmissing = this.state.fieldmissing ? (
      <div>
        <strong>
          Something is missing. please make sure the form is completed
        </strong>
        <Button info onClick={this.handleReset}>
          Reset?
        </Button>
      </div>
    ) : null;

    let button =
      this.props.location.pathname === '/createpost' ? (
        <Button primary name="submit">
          Submit
        </Button>
      ) : (
        <Button primary name="update">
          Update
        </Button>
      );
    return (
      <div className="column is-half is-mobile">
        {fieldmissing}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Field>
            <label className="label">Title:</label>
            <Input
              name="title"
              value={this.state.title}
              onChange={this.handleChange.bind(this)}
            />
          </Field>
          <Field>
            <label className="label">Body:</label>
            <Textarea
              name="body"
              value={this.state.body}
              onChange={this.handleChange.bind(this)}
            />
          </Field>
          <Field>
            <label className="label">Author:</label>
            <Input
              name="author"
              value={this.state.author}
              onChange={this.handleChange.bind(this)}
            />
          </Field>
          <Field>
            <label className="label">Categories:</label>
            <select
              name="category"
              value={this.state.category}
              onChange={this.handleChange.bind(this)}
            >
              <option value="" selected disabled>
                Select your category
              </option>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </select>
          </Field>

          {button}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(addPostAsync(post)),
    updatePost: post => dispatch(updatePostAsync(post))
  };
};
export default withRouter(connect(null, mapDispatchToProps)(CreatePost));
