import React from 'react';
import Doorknob from '../components/Doorknob';

const About = () => (
  <div id="about-page">
    <div className="about-page-title">
      <span className="about-page-icon">
        <img
          className="logo"
          src="assets/dandelion_white.svg"
          alt="Social, Not Social logo"
          width="150"
          height="150"
        />
      </span>
      Social, not Social <span className="about-page-title-beta">(Beta)</span>
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
        <img src="assets/kiddo.jpg" alt="kids" height="140px" style={{ transform: 'rotate(2deg)', WebkitTransform: 'rotate(-4deg)' }} />
      </div>
      <p>
        Big news about that new job! (Congrats, BTW)
      </p>
    </div>
    <div className="about-page-lower-2">
      <p>
        But.
      </p>
    </div>
    <div className="about-page-lower-3">
      <p>
        Your friends are on Facebook.
      </p>
      <p>
        Your mom is too, but cannot remember how to login.
      </p>
      <p>
        Crazy uncle Joe will never be (&quot;Tool of the FBI!&quot; and all).
      </p>
    </div>
    <div className="about-page-lower-4">
      <p>
        Social, not Social is here for you.
      </p>
      <p>
        Create a post:
      </p>
      <div className="about-page-img about-page-callout">
        <img src="/assets/anewpost.png" alt="A new post" />
      </div>
      <p>
        Then share it with friends via email or Facebook.
      </p>
      <div className="about-page-img about-page-callout">
        <img src="/assets/sharescreen.png" alt="Share screen" />
      </div>
      <p>
        Stop worrying about image file sizes when mailing to mom.<br />
        We take care of that for you.<br />
        Go, share that joy.
      </p>
      <div className="about-page-img about-page-kid2">
        <img src="assets/sled.jpg" alt="kids" height="140px" style={{ transform: 'rotate(2deg)', WebkitTransform: 'rotate(2deg)' }} />
      </div>
    </div>
    <div className="about-page-signup">
      Sign up now!
      <div className="about-page-doorknob-holder">
        <Doorknob />
      </div>
    </div>
  </div>
);

module.exports = About;
