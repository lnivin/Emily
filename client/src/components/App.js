import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './ Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Surveys = () => <h2>Dashboard</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return(
      <div className='container'>
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact={true} path="/" component={Landing} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact={true} path="/surveys/new" component={SurveyNew} /> 
            <Route exact={true} path="/surveys" component={Surveys} />  
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default connect(null, actions)(App);