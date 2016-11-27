import React from 'react';
import { BrowserRouter, Match, Link } from 'react-router';

const Home = () => (
  <div>Home</div>
);

const About = () => (
  <div>About</div>
);

const Topics = () => (
  <div>Topics</div>
);

export default () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/about/1">Topics</Link></li>
      </ul>

      <hr/>

      <Match pattern="/" component={Home} />
      <Match exactly pattern="/about" component={About} />
      <Match pattern="/about/1" component={Topics} />
    </div>
  </BrowserRouter>
);