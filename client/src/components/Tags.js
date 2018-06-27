import React, { Fragment } from 'react';
import { Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getTags } from '../reducers/tags';
import TagForm from './TagForm';

class Tags extends React.Component {
  componentDidMount() {
    this.props.dispatch(getTags())
  }

  render() {
    return (
      <Fragment>
        <TagForm />
      </Fragment>
    )
  }
}

export default connect()(Tags)
