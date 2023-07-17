import React from 'react';
import { Pane, Switch, Label, Button } from 'evergreen-ui';
import './App.css';
import { OneAttest } from './Home';
import { url } from './url';

export default class Settings extends React.Component {
  constructor() {
    super()
    this.state = {
      ...window.pglOptions,
      updateOptions: (key, { target: { checked } }) => {
        window.pglOptions[key] = localStorage[key] = checked;
        this.setState(Object.fromEntries([[key, checked]]));
      },
    };
  }
  unSign(id, date) {
    fetch(`${url}sign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, id, status: false }),
    }).then((res) => res.json());
  }
  render() {
    const { updateOptions, ...rest } = this.state;
    const { region, attests } = this.props.user;
    const height = 28;

    return (
      <Pane>
        <div>Current User is {region}</div>
        <div>Setting dev to true will set user to test, maybe</div>
        {Object.entries(rest).map(([key, value]) => (
          <Label key={key} height={height}>
            {key}
            <Switch
              height={height}
              checked={value}
              onChange={updateOptions.bind(null, key)}
            />
          </Label>
        ))}
        {/* {attests.map((a, i) => (
          <div key={a._id} style={{ border: '1px solid black' }}>
            <OneAttest {...a} key={a._id} i={i}>
              <div style={{ paddingTop: '4px' }}>
                <Button
                  height={32}
                  onClick={this.unSign.bind(null, a._id, a.date)}
                >
                  UnSign
                </Button>
              </div>
            </OneAttest>
          </div>
        ))} */}
      </Pane>
    );
  }
}
