import React, { useState, useEffect } from 'react';
import { url } from './url';
import { MySelectField, OneVisit } from './Fields';

export const OneClinic = ({ clinicID, visits = [], clinicName }) => {
  const [spending, updateSpending] = useState({});
  const [visit, updateVisit] = useState({});

  const updateVisitByID = ({ target: { value } }) =>
    updateVisit(visits.find(({ _id }) => _id === value));

  useEffect(() => updateVisit({}), [clinicID]);

  useEffect(() => {
    fetch(`${url}getSpendingByDoctor/${clinicID}`)
      .then(d => d.json())
      .then(updateSpending);
    // .then(a => updateVisitByID("5ddc8639e8705d24251d60c3"));
  }, [clinicID]);
  const nameAmountPairs = Object.values(spending).sort(
    ({ amount }, b) => b.amount - amount
  );

  if (nameAmountPairs.length) {
    return (
      <>
        In the last year at {clinicName} you have spent these amounts. (Highest
        to lowest)
        <ol>
          {nameAmountPairs.map(({ amount, name: drName }) => (
            <li key={drName}>
              {drName}: ${amount?.toFixed(2)}
            </li>
          ))}
        </ol>
        <h2>Visits to {clinicName} by date </h2>
        <MySelectField
          label="Choose Visit To See Details"
          onChange={updateVisitByID}
        >
          <option value="0">Choose a Date</option>
          {visits?.map(({ date, _id }) => (
            <option key={_id} value={_id}>
              {new Date(date).toLocaleDateString()}
            </option>
          ))}
        </MySelectField>
        <OneVisit visit={visit} spending={spending} />
      </>
    );
  }
  if (!clinicID) return 'Choose a clinic';
  return 'No spending found for this clinic this year';
};
