import React, { Component } from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';

import SwipeableViews from 'react-swipeable-views';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { FormsyDate, FormsySelect, FormsyText, FormsyTime } from 'formsy-material-ui/lib';
//import logo from './logo.svg';
import './App.css';

injectTapEventPlugin();

const gender = [
  <MenuItem key={1} value={1} primaryText="Female" />,
  <MenuItem key={2} value={2} primaryText="Male" />,
  <MenuItem key={3} value={3} primaryText="Other" />,
];

const identity = [
  <MenuItem key={1} value={1} primaryText="Lesbian" />,
  <MenuItem key={2} value={2} primaryText="Gay" />,
  <MenuItem key={3} value={3} primaryText="Bisexual/Allsexual" />,
  <MenuItem key={4} value={4} primaryText="Transgender" />,
  <MenuItem key={5} value={5} primaryText="Straight" />,
  <MenuItem key={6} value={6} primaryText="Other" />,
  <MenuItem key={7} value={7} primaryText="Don't Know" />,
];

const incidents = [
  <MenuItem key={1} value={1} primaryText="Verbal Abuse" />,
  <MenuItem key={2} value={2} primaryText="Physical Abuse" />,
  <MenuItem key={3} value={3} primaryText="Sexual Assault" />,
  <MenuItem key={4} value={4} primaryText="Robbery" />,
  <MenuItem key={5} value={5} primaryText="Rape" />,
];

const parishes = [
  <MenuItem key={1} value={1} primaryText="Clarendon" />,
  <MenuItem key={2} value={2} primaryText="Hanover" />,
  <MenuItem key={3} value={3} primaryText="Kingston" />,
  <MenuItem key={4} value={4} primaryText="Manchester" />,
  <MenuItem key={5} value={5} primaryText="Portland" />,
  <MenuItem key={6} value={6} primaryText="St. Andrew" />,
  <MenuItem key={7} value={7} primaryText="St. Ann" />,
  <MenuItem key={8} value={8} primaryText="St. Catherine" />,
  <MenuItem key={9} value={9} primaryText="St. Elizabeth" />,
  <MenuItem key={10} value={10} primaryText="St. James" />,
  <MenuItem key={11} value={11} primaryText="St. Mary" />,
  <MenuItem key={12} value={12} primaryText="St. Thomas" />,
  <MenuItem key={13} value={13} primaryText="Trelawny" />,
  <MenuItem key={14} value={14} primaryText="Westmoreland" />,
];

const SubmissionForm = React.createClass({
    styles: {
      paperStyle: {
        width: 320,
        margin: 'auto',
        marginBottom: '100px',
        padding: 20,
      },
      submitStyle: {
        display: 'block',
        marginTop: 32,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      widgetStyle: {
      }
    },

    getInitialState() {
      return {
        canSubmit: true,
        slideIndex: 0
      };
    },

    enableSubmit() {
      this.setState({
        canSubmit: true,
      });
    },

    disableSubmit() {
      this.setState({
        canSubmit: false,
      });
    },

    handleSwipe(event) {
      event.preventDefault();
      var nextTab = (this.state.slideIndex + 1 ) % 2;
      this.setState({
        slideIndex: nextTab,
      });
    },

    submitForm(data) {
      console.log(JSON.stringify(data, null, 4));
    },

    render() {
      let {paperStyle, submitStyle, widgetStyle } = this.styles;

      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Paper style={paperStyle}>
            <Formsy.Form
                onValid={this.enableSubmit}
                onInvalid={this.disableSubmit}
                onValidSubmit={this.submitForm}
                onInvalidSubmit={this.notifyFormError} >

              <Tabs
                onChange={this.handleSwipe}
                value={this.state.slideIndex} >
                <Tab label="Incident" value={0} />
                <Tab label="Demographics" value={1} />
              </Tabs>

              <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleSwipe} >    
                <div>        
                  <FormsySelect
                    name="incidentType"
                    style={widgetStyle}
                    value={this.state.incidentType}
                    floatingLabelText="Type of Incident:" >
                    {incidents}
                  </FormsySelect>
                  <FormsyText
                    name="incidentCommunity"
                    value={this.state.incidentCommunity}
                    floatingLabelText="Community Location of Incident:" />
                  <FormsySelect
                    name="incidentParish"
                    style={widgetStyle}
                    value={this.state.incidentParish}
                    floatingLabelText="Parish Location of Incident:" >
                    {parishes}
                  </FormsySelect>              
                  <FormsyDate 
                    name="incidentDate"  
                    value={this.state.incidentDate}
                    floatingLabelText="Date of Incident:" 
                    container="inline" 
                    mode="landscape" />
                  <FormsyTime
                    name="incidentTime"
                    value={this.state.incidentTime}
                    floatingLabelText="Time of Incident:"
                  />
                  <FormsyText
                    name="incidentDesc"
                    value={this.state.incidentDesc}
                    floatingLabelText="Description of Incident:"
                    multiLine={true}
                    rows={4}
                  />
                  <RaisedButton
                    style={submitStyle}
                    onClick={this.handleSwipe}
                    label="Next"
                  />
                </div>
                <div>
                  <FormsyText
                    name="demoAge"
                    value={this.state.demoAge}
                    floatingLabelText="Age:" />
                  <FormsySelect
                    name="demoGender"
                    style={widgetStyle}
                    value={this.state.demoGender}
                    floatingLabelText="Gender:" >
                    {gender}
                  </FormsySelect> 
                  <FormsySelect
                    name="demoIdentity"
                    style={widgetStyle}
                    value={this.state.demoIdentity}
                    floatingLabelText="Sexual Identity:" >
                    {identity}
                  </FormsySelect> 
                  <RaisedButton
                    style={submitStyle}
                    type="submit"
                    label="Submit" />
                  </div>
              </SwipeableViews>
            </Formsy.Form>
          </Paper>
        </MuiThemeProvider>
      );
    }
  });


class App extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Walk Good Jamaica</h2>
        </div>
        <h2 className="App"> Report An Incident </h2>
        <SubmissionForm />
      </div>
    );
  }
}


export default App;
