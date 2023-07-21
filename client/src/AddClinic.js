import React from 'react';
import random from './random-name';
import { url, automatic } from './url';
import { SubmitButton, DevInfo, MyTextInputField } from './Fields';
import { Link } from 'react-router-dom';
const { prefill } = window.pglOptions;

export default class AddClinic extends React.Component {
  constructor() {
    super();
    this.state = {
      name: prefill ? `${random.last()} Clinic` : '',
      address: prefill ? '100 ' + random.middle() + ' St.' : '',
    };
    this.SubmitButton = SubmitButton.bind(this);
  }

  submit = () => {
    fetch(`${url}clinic`, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' },
    }).then(r => r.json());
  };

  componentDidMount() {
    if (automatic) this.submit();
  }

  addValue(key, val) {
    const newState = {};
    newState[key] = val.target.value;
    this.setState(newState);
  }

  Input = ({ id, label }) => (
    <MyTextInputField
      label={label}
      required
      value={this.state[id]}
      onChange={this.addValue.bind(this, id)}
    />
  );

  See = () => (
    <DevInfo>
      {Object.entries(this.state).map(([key, value]) => (
        <div key={key}>
          {key} is {value}
        </div>
      ))}
    </DevInfo>
  );

  render() {
    return (
      <>
        <this.See />
        <this.Input id="name" label="Clinic Name" />
        <this.Input id="address" label="Clinic Address" />
        <this.SubmitButton
          link={<Link to="/addprovider">Click Here To Add A Provider</Link>}
        />
      </>
    );
  }
}
