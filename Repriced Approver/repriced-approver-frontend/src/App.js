import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/navbar/navbar.component";
import "bootstrap/dist/css/bootstrap.min.css";
import GiveawaysList from "./components/giveaways/giveaways.component";
import EditGiveaway from "./components/giveaways/giveaway/edit-giveaway.component";


function App() {
    return (
        <Router>
            <div className="container-fluid">
                <div className="row">
                    <Navbar />
                    <br/>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                        <Route path="/giveaways" exact component={GiveawaysList} />
                        <Route path="/edit/:id" component={EditGiveaway} />
                    </main>
                </div>
            </div>
        </Router>

    );
}

export default App;
