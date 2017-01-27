import React from 'react';
import Paper from 'material-ui/Paper';
import SendAsset from 'material-ui/svg-icons/content/send';
import SocialShareAsset from 'material-ui/svg-icons/social/share';
import LockAsset from 'material-ui/svg-icons/action/lock-outline';
import Register from '../containers/RegisterForm';

const container = {
  marginTop: '20px',
  display: 'flex',
};

const box = {
  minimumWidth: '300px',
  padding: '50px',
};

const paperStyle = {
  padding: 20,
  textAlign: 'center',
  display: 'inline-block',
  width: '400px',
};

const svgStyle = {
  verticalAlign: 'middle',
  marginRight: '20px',
};

const MarketingBits = () => (
  <div id="marketingBits">
    <span className="marketingTextLarge">Your life shared.<br />...or not.</span>
    <div className="marketingSpacing">
      <span className="marketingTextMedium">Post your thoughts and pictures and share them:</span>
    </div>
    <div className="marketingSpacing">
      <SocialShareAsset color="#459691" style={svgStyle} />
      <span className="marketingTextMedium">via social media</span>
    </div>
    <div className="marketingSpacing">
      <SendAsset color="#459691" style={svgStyle} />
      <span className="marketingTextMedium">via email</span>
    </div>
    <div className="marketingSpacing">
      <LockAsset color="#459691" style={svgStyle} />
      <span className="marketingTextMedium">or keep it to yourself.</span>
    </div>
  </div>
);

const Welcome = function Welcome() {
  return (
    <div style={container}>
      <div style={box}>
        <MarketingBits />
      </div>
      <div style={box}>
        <Paper zDepth={2} style={paperStyle}>
          <Register />
        </Paper>
      </div>
    </div>
  );
};

module.exports = Welcome;
