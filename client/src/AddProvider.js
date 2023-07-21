import React from 'react';
import { url, getMyClinics, automatic } from './url';
import random from './random-name';
import {
  SelectClinic,
  DevInfo,
  SubmitButton,
  MySelectField,
  MyTextInputField,
} from './Fields';

const { prefill } = window.pglOptions;
export default class AddProvider extends React.Component {
  state = {
    name: prefill ? random.first() + ' ' + random.last() : '',
    clinic: null,
    type: prefill ? 'MD' : '',
    allMyClinics: [],
  };
  providerTypes = ['MD', 'PA', 'NP', 'MSN'];
  SubmitButton = SubmitButton.bind(this);

  submit = () => {
    const copy = { ...this.state };
    delete copy.allMyClinics;
    fetch(url + 'provider', {
      method: 'POST',
      body: JSON.stringify(copy),
      headers: { 'Content-Type': 'application/json' },
    }).then(r => r.json());
  };
  componentDidMount() {
    getMyClinics().then(r => {
      const rando = a => Math.floor(Math.random() * a);
      const newState = { allMyClinics: r };
      if (prefill) {
        newState.type = this.providerTypes[rando(4)];
        newState.clinic = r[rando(r.length)]._id;
      }
      this.setState(newState, automatic ? this.submit : () => {});
    });
  }
  addValue(key, val) {
    const newState = {};
    newState[key] = val.target.value;
    this.setState(newState);
  }
  Input = ({ id, label }) => (
    <MyTextInputField
      required
      label={label}
      value={this.state[id]}
      onChange={this.addValue.bind(this, id)}
    />
  );
  SelectType = () => (
    <MySelectField
      label="Provider Type"
      defaultValue="MD"
      onChange={event => this.addValue('type', event)}
    >
      {this.providerTypes.map(type => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </MySelectField>
  );
  See = () => (
    <DevInfo>
      {Object.entries(this.state).map(
        ([key, value]) =>
          key !== 'allMyClinics' && (
            <div key={key}>
              {key} is {value}
            </div>
          )
      )}
    </DevInfo>
  );

  render() {
    const { allMyClinics } = this.state;
    return (
      <>
        <this.See />
        <SelectClinic
          clinics={allMyClinics}
          setClinic={this.addValue.bind(this, 'clinic')}
        />
        <this.Input id="name" label="Provider Name" />
        <this.SelectType />
        <this.SubmitButton />
      </>
    );
  }
}
