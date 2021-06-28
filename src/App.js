import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Addcontact from "./components/Addcontact";
import ContactList from "./components/Contactlist";
import EditContact from "./components/Editcontact";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <br />
        <Route path="/" exact component={ContactList} />
        <Route path="/add" exact component={Addcontact} />
        <Route path="/edit/:id" exact component={EditContact} />
      </div>
    </Router>
  );
}

export default App;
