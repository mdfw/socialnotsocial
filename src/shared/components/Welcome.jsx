import React from 'react';
import { Link } from 'react-router';
import Doorknob from '../components/Doorknob';

const MarketingBits = () => (
  <div className="welcome-page-marketing">
    <div className="marketingTextMedium">
      Moments. Shared. Everywhere.
    </div>
    <div className="marketingSpacing">
      Post your thoughts and pictures and share them on Facebook or send them in an email.
      <br /><br />
      Your family will <i>love</i> you for it.
      <br /><br />
      Try it yourself:<br />
      User: <span>eliza@newhaven.com</span><br />
      Password: <span>efw23dsesE*HE</span><br />
    </div>
    <div style={{ margin: '30px' }}>
      <img
        className="logo"
        src="assets/dandy.svg"
        alt="Social, Not Social logo"
        width="70"
        height="70"
      />
    </div>
  </div>
);


class Welcome extends React.Component {
  componentDidMount() {
    document.body.classList.add('welcome-page-background-color');
  }
  componentWillUnmount() {
    document.body.classList.remove('welcome-page-background-color');
  }
  render() {
    return (
      <div id="welcome" className="welcome-page-hero">
        <div className="welcome-page-box">

          <div className="welcome-page-title">
            Social, not Social <span className="welcome-page-title-beta">(Beta)</span>
          </div>
          <div className="welcome-page-lower">
            <Doorknob />
            <MarketingBits />
          </div>
          <div className="welcome-page-more-info">
            <Link to="/about">Want to learn more?</Link>
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
