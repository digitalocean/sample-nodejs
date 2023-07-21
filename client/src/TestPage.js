import React from 'react';
import { Checkbox, Button, FormField, Label, Pane } from 'evergreen-ui';
import { url, getMyClinics } from './url';
import { reasons } from './data';
import {
  Wrapper,
  DevInfo,
  Err,
  MyTextInputField,
  MySelectField,
  MyTextarea,
  compress,
} from './Fields';
import { Formik, Field, ErrorMessage } from 'formik';
import { AddVisitSchema } from './Validation';
import { Link } from 'react-router-dom';

export default class AddVisit extends React.Component {
  state = {
    allMyClinics: [],
    submitError: null,
    receiptUpload: 'not started',
  };

  componentDidMount() {
    getMyClinics().then((allMyClinics) => this.setState({ allMyClinics }));
    fetch(url + 'getproviders')
      .then((r) => r.json())
      .then((providersByClinic) => {
        this.setState({ providersByClinic });
      });
  }
  getPresignedUrl = () =>
    fetch(
      url + 'getUploadURL').then((r) => r.json())
      .then((res) => ({ key: res?.url?.key, url: res?.url?.uploadURL }))

  submit = (values, { resetForm }) => {
    values.amountSpent = Number(Number(values.amountSpent).toFixed(2));
    fetch(url + 'visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        receiptID: this.state.receiptID || '',
        clinicName:
          this.state.allMyClinics.find((clinic) => clinic._id === values.clinic)
            ?.name || 'name not found',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (window.pglOptions.dev && Array.isArray(res.email)) {
          res.email.forEach(console.table);
        }
        if (res && res._id) {
          alert('Successfully Submitted');
          this.props.history.push('pastvisits');
        } else this.setState({ submitError: res });
      });
  };

  uploadReceipt = async (uploadDetails, blob) => {
    const { key, url } = uploadDetails
    console.log('Upload receipt', { url, blob });
    try {
      await fetch(url, {
        method: 'PUT',
        body: blob
      })
      console.log('key receipt was saved at', uploadDetails)
      this.setState({ receiptID: key, receiptUpload: 'success' })

      console.log('success')
    } catch (e) {
      console.log('error', e)
      this.setState({
        receiptUpload:
          'failed but you may continue submitting without upload.',
      });
    }
    // .then(r => r.json())
    //   .then(json => {
    //     json.ok
    //       ? this.setState({ receiptID: json, receiptUpload: 'success' })
    //       : Promise.reject(json)
    //   })
    //   .catch((e) => {

    //     console.log(e);
    //   })
  };

  render() {
    const { providersByClinic, allMyClinics } = this.state;
    let { validate, dev, prefill } = window.pglOptions;

    return (
      <Formik
        initialValues={
          prefill
            ? {
              clinic: '5e016d700afaa520354490b2',
              date: '2023-07-19T12:59',
              providers: [],
              reason: 'Educational Lunch',
              amountSpent: 400,
              materials: [],
            }
            : {
              clinic: '',
              date: '',
              providers: [],
              reason: '0',
              amountSpent: '',
              materials: [],
            }
        }
        validationSchema={validate && AddVisitSchema}
        onSubmit={this.submit}
      >
        {({ isSubmitting, values, handleReset, handleSubmit }) => {
          return (
            <Wrapper>
              test page
            </Wrapper>
          );
        }}
      </Formik>
    );
  }
}

const See = ({ values, errors }) => (
  <DevInfo>
    {Object.entries(values).map(([key, value]) => (
      <div key={key}>
        {key} value is {value || 'empty'}
      </div>
    ))}
  </DevInfo>
);

const SelectMaterials = () => (
  <FormField label="Choose Materials">
    <ErrorMessage component={Err} name={'materials'} />
    <Pane
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      {['1', '2', '3', '4', '5'].map((n) => (
        <Field
          style={{ flex: '1 0 33%' }}
          key={n}
          label={`Material ${n}`}
          as={Checkbox}
          type="checkbox"
          name="materials"
          value={n}
        />
      ))}
    </Pane>
  </FormField>
);

const SelectProvider = ({ providersByClinic, clinic, ...rest }) => {
  if (!clinic) return 'Please Select A Clinic';
  const providers = providersByClinic && providersByClinic[clinic];
  if (providers && providers.length) {
    return (
      <FormField label="Providers Present At Meeting">
        {providersByClinic[clinic].map(({ _id, name }) => (
          <Field
            key={_id}
            label={name}
            as={Checkbox}
            type="checkbox"
            name="providers"
            value={_id}
          />
        ))}
      </FormField>
    );
  } else {
    return (
      <>
        This Clinic Has No Providers, Please Add One
        <Link to="/addprovider">Here</Link>
      </>
    );
  }
};
