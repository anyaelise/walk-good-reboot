import React, { Component } from 'react';
//import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import injectTapEventPlugin from 'react-tap-event-plugin';
//import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, 
//  FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';
//import logo from './logo.svg';
import './App.css';

injectTapEventPlugin();

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
        width: 400,
        margin: 'auto',
        padding: 20,
      },
      submitStyle: {
        display: 'block',
        marginTop: 32,
        width: '50%'
      },
    },

    getInitialState() {
      return {
        canSubmit: false,
      };
    },

    handleChange(event, index, value) {
      this.setState({value});
    },

    render() {
      let {paperStyle, submitStyle } = this.styles;

      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Paper style={paperStyle}>
            <form>
              <SelectField
                value={this.state.value}
                onChange={this.handleChange}
                floatingLabelText="Type of Incident:"
              >
                {incidents}
              </SelectField>
              <TextField
                hintText="Community Location of Incident:"
              />
              <SelectField
                value={this.state.value}
                onChange={this.handleChange}
                floatingLabelText="Parish Location of Incident:"
              >
                {parishes}
              </SelectField>              
              <DatePicker hintText="Date of Incident" container="inline" mode="landscape" />


              <RaisedButton
                style={submitStyle}
                type="submit"
                label="Submit"
              />
            </form>
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
        <h2> Report An Incident </h2>
        <SubmissionForm />
      </div>
    );
  }
}


export default App;
