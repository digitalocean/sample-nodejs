import React, { useState, useEffect } from 'react';
import { url } from './url';
import { Wrapper, SelectClinic } from './Fields';
import { OneClinic } from './OneClinic';
import { TabNavigation, Tab } from 'evergreen-ui';

const PastVisits = () => {
  const [showByClinic, setShowByClinic] = useState(true);

  return (
    <>
      <TabNavigation>
        <Tab
          key="one"
          id="one"
          isSelected={showByClinic}
          onSelect={() => setShowByClinic(true)}
        >
          Show Visits By Clinic For {new Date().getFullYear()}
        </Tab>
        <Tab
          key="two"
          id="two"
          isSelected={!showByClinic}
          onSelect={() => setShowByClinic(false)}
        >
          Show Visits By Spending For All Years
        </Tab>
      </TabNavigation>

      {showByClinic ? <PastVisitsByClinic /> : <PastVisitsBySpending />}
    </>
  );
};

const PastVisitsBySpending = () => {
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    fetch(url + 'totalsForProviders')
      .then(res => res.json())
      .then(setProviders);
  }, []);
  return (
    <>
      <h3>Spending From Highest to Lowest</h3>
      {providers.map(({ amount, name, rep, _id, clinicName }) => (
        <div key={_id}>
          {rep.toUpperCase()} has spent ${amount.toFixed(2)} on {name} at{' '}
          {clinicName}
        </div>
      ))}
    </>
  );
};

class PastVisitsByClinic extends React.Component {
  state = {};
  componentDidMount() {
    Promise.all(['visits', 'clinic'].map(type => fetch(url + type)))
      .then(res => Promise.all(res.map(r => r.json())))
      .then(([allVisits, clinics]) => {
        const byClinic = allVisits.reduce((a, v) => {
          const { clinic } = v;
          a[clinic] = a[clinic] ? a[clinic].concat([v]) : [v];
          return a;
        }, {});

        const clinicsThatHaveVisits = clinics.filter(
          ({ _id }) => byClinic[_id]?.length
        );
        this.setState({
          clinicsThatHaveVisits,
          byClinic,
        });
      });
  }

  render() {
    const { clinicsThatHaveVisits, byClinic } = this.state;
    return (
      <Wrapper>
        {byClinic ? (
          <SelectClinicModule
            byClinic={byClinic}
            clinics={clinicsThatHaveVisits}
          />
        ) : (
            'Loading'
          )}
      </Wrapper>
    );
  }
}

const SelectClinicModule = ({ clinics, byClinic }) => {
  const [clinic, setClinic] = useState({});
  const setClinicByID = ({ target: { value } }) => {
    const chosen = clinics.find(c => value === c._id) || {};
    setClinic(chosen);
  };
  const { _id, name } = clinic;
  const visits = byClinic[_id];
  return (
    <>
      <SelectClinic clinics={clinics} setClinic={setClinicByID} />
      {_id && (
        <OneClinic clinicID={_id} clinicName={name} visits={visits}></OneClinic>
      )}
    </>
  );
};
/*
get spending by doctor seems to fail with admin
*/
export default PastVisits;
