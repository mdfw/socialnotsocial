import React from 'react';
import { Link } from 'react-router';
import Doorknob from '../components/Doorknob';
import Sticky from './ui/Sticky';

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

const AboutWelcome = () => (
  <div id="about-welcome">
    <div className="welcome-page-box">
      <div className="welcome-page-title">
        Social, not Social <span className="welcome-page-title-beta">(Beta)</span>
      </div>
      <div className="welcome-page-lower">
        <div className="welcome-page-lower-doorknob">
          <Doorknob />
        </div>
        <MarketingBits />
      </div>
    </div>
  </div>
);


const About = () => (
  <div id="about-page">
    <Sticky enter="80" className="about-nav">
      <div id="about-nav-row">
        <div className="about-nav-left">
          <img
            className="logo"
            src="../assets/dandy-white.svg"
            alt="Social, Not Social logo"
            width="40"
            height="40"
            style={{ marginTop: '-10px', marginRight: '5px' }}
          />
          <span className="about-nav-sitename">Social, not Social</span>
        </div>
        <div className="about-nav-right">
          <Link to="/welcome">Sign up / in (free Demo)</Link>
        </div>
      </div>
    </Sticky>
    <div className="about-page-title">
      <div className="about-page-title-text">
          Social, not Social
      </div>
      <div className="about-page-title-text-sub">
          Share your joy
      </div>
    </div>
    <div className="about-page-lower-1">
      <p>
        Ever had something you wanted to share?
      </p>
      <p>
        A random thought.
      </p>
      <p>
        A cute picture of your kid playing in snow?
      </p>
      <div className="about-page-img about-page-kid1">
        <img
          src="assets/kiddo.jpg"
          alt="Child in snow"
          height="140px"
          style={{ transform: 'rotate(2deg)', WebkitTransform: 'rotate(-4deg)' }}
        />
      </div>
      <p>
        Big news about that new job! (Congrats, BTW)
      </p>
    </div>
    <div className="about-page-lower-2">
      <p>
        But.
      </p>
      <div className="about-page-lower-3">
        <p>
          Your friends are on Facebook.
          <img src="assets/about_icons/fb_white.svg" height="30" alt="Facebook logo" />
        </p>
        <p>
          Your mom is too, but cannot remember how to login.
        </p>
        <p>
          Crazy uncle Joe will never be (&quot;Tool of the FBI
          <img src="assets/about_icons/illuminati_white.svg" height="30" alt="Illuminati symbol" />
          !&quot; and all).
        </p>
        <p>
          Sending pictures via email gets you the dreaded
          &quot;too long to be sent as an email.&quot;
        </p>
      </div>
    </div>
    <div className="about-page-lower-4">
      <p>
        Social, not Social is here for you.
      </p>
      <p>
        1. Create a post:
      </p>
      <div className="about-page-img about-page-callout">
        <img src="/assets/anewpost.png" alt="A new post" />
      </div>
      <p>
        2. Share it with friends via email or Facebook.
      </p>
      <div className="about-page-img about-page-callout">
        <img src="/assets/sharescreen.png" alt="Share screen" />
      </div>
      <p>
        3. Relax.
      </p>
    </div>
    <div className="about-page-lower-5">
      <p>
        Sign up today.
      </p>
    </div>
    <div className="about-page-signup">
      <AboutWelcome />
    </div>
  </div>
);

module.exports = About;
