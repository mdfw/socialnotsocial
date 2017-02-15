import React from 'react';
import SendAsset from 'material-ui/svg-icons/content/send';
import SocialShareAsset from 'material-ui/svg-icons/social/share';
import CameraAsset from 'material-ui/svg-icons/image/photo-camera';
import RegisterForm from '../containers/RegisterForm';
import LoginForm from '../containers/LoginForm';

const svgStyle = {
  verticalAlign: 'middle',
  marginRight: '20px',
};

const MarketingBits = () => (
  <div className="welcome-page-marketing">
    <div className="marketingTextMedium">
      <CameraAsset color="#459691" style={svgStyle} />Moments.
    </div>
    <div className="marketingTextMedium">
      <SendAsset color="#459691" style={svgStyle} />Shared.
    </div>
    <div className="marketingTextMedium">
      <SocialShareAsset color="#459691" style={svgStyle} />Everywhere.
    </div>
    <div className="marketingSpacing">
      Post your thoughts and pictures and share them on Facebook or send them in an email.
      <br /><br />
      Your family will <i>love</i> you for it.
    </div>
    <div style={{ margin: '30px' }}>
      <img
        className="logo"
        src="assets/dandelion.svg"
        alt="Social, Not Social logo"
        width="70"
        height="70"
      />
    </div>
  </div>
);

const Login = ({ onClick }) => (
  <div className="welcome-page-signup">
    <LoginForm />
    <hr
      style={{
        border: 0,
        height: '0.5px',
        marginTop: '10px',
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))',
      }}
    />
    <span style={{ fontSize: '12px' }}>Need an account? <button onClick={onClick}>Sign Up</button></span>
  </div>
);
Login.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

const Register = ({ onClick }) => (
  <div className="welcome-page-signup">
    <RegisterForm />
    <hr
      style={{
        border: 0,
        height: '0.5px',
        marginTop: '10px',
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))',
      }}
    />
    <span style={{ fontSize: '12px' }}>Already have an account? <button onClick={onClick}>Login</button></span>
  </div>
);
Register.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 1,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    if (this.state.form === 1) {
      this.setState({
        form: 2,
      });
    } else {
      this.setState({
        form: 1,
      });
    }
  }
  render() {
    let whichForm = <Register onClick={this.onClick} />;
    if (this.state.form === 2) {
      whichForm = <Login onClick={this.onClick} />;
    }
    return (
      <div id="welcome" className="welcome-page-hero">
        <div className="welcome-page-box">

          <div className="welcome-page-title">
            Social, not Social Beta
          </div>
          <div className="welcome-page-lower">
            {whichForm}
            <MarketingBits />
          </div>
        </div>
        <div className="image-acknowledgement">
          Image: <i>Bubble reflection</i> by Isabelle Acatauass&uacute; Alves Almeida
        </div>
      </div>
    );
  }
}


module.exports = Welcome;
