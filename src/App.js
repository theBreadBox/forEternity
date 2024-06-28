import React from "react";
import "./App.css";


// import Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Component
import Header from "./component/Header";
import Footer from "./component/Footer";
import ScrollToTop from "./component/ScrollToTop";


// import Pages
import Home from "./Pages/Home";
import FormExample from "./Pages/FormExample";



function App() {
 
  return (
    
    <React.StrictMode>
      <Router>
        <Header />
        
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Home} />
            
            <Route exact path="/form-example" component={FormExample} />
          </Switch>
        </ScrollToTop>
        <Footer />
      </Router>
    </React.StrictMode>
  );
}

export default App;
