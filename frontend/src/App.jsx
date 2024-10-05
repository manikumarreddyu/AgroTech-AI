import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainContent from './MainContent';
import Home from './components/Home';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contact" component={Contact} />
        {/* Add more routes here as needed */}
      </Switch>
      <MainContent />
    </Router>
  );
}

export default App;
