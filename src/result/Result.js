import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
export default class Result extends Component {
  constructor(props){
    super(props);
    this.state = {alertVisible: false};
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
  }
  componentWillReceiveProps(newProps){
    if (newProps.output) {
      this.setState({alertVisible: true});
    }
  }
  handleAlertDismiss() {
    this.setState({ alertVisible: false });
  }
  render () {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle={this.props.output ? this.props.output.className: ''} onDismiss={this.handleAlertDismiss}>
          <strong>Holy guacamole! </strong> {this.props.output ? this.props.output.message : ''}
        </Alert>
      )
    } else {
      return <div></div>
    }
  }
}
