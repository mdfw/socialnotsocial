import React from 'react';
import { connect } from 'react-redux';
import { SNSButton, ButtonStyle, ButtonSize } from '../components/ui/SNSButton';
import { newApprisal } from '../actions/apprisals';
import { Apprisals } from '../components/Apprisals';
import Apprise from '../components/Apprise';


class AppriseMenu extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit();
  }
  onChange(recipientId) {
    this.props.onChange(recipientId);
  }
  render() {
    return (
      <div className="apprisal-menu--holder">
        <AppriseMore recipients={this.props.recipients} postId={this.props.postId} dispatch={this.props.dispatch} />
        <Apprisals summarize={false} apprisals={this.props.apprisals} />
      </div>
    );
  }
}
AppriseMenu.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  dispatch: React.PropTypes.func.isRequired,
  postId: React.PropTypes.string.isRequired,
  formId: React.PropTypes.string.isRequired,
};


/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownProps) {
  const formId = `shareForm${ownProps.formId}`;
  return {
    recipients: state.recipients.recipients,
    forms: state.forms[formId],
    formId: formId,
  };
};

const Container = connect(mapStateToProps)(AppriseMenu);

export default Container;
