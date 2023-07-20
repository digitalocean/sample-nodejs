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
  Receipt,
} from './Fields';
import { Formik, Field, ErrorMessage } from 'formik';
import { AddVisitSchema } from './Validation';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  getPresignedUrl = (filename) =>
    axios({
      url: url + 'getUploadURL',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ filename })
    })
      .then(({ data }) => {
        return { key: data?.url?.key, url: data?.url?.uploadURL }
      })

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
    try {
      await fetch(url, {
        method: 'PUT',
        body: blob
      }).then(r => {
        if (!r.ok) throw Error('failing to upload image')
      })

      // console.log('key receipt was saved at', uploadDetails)
      this.setState({ receiptID: key, receiptUpload: 'success' })

      // console.log('success')
    } catch (e) {
      // console.log('error', e)
      this.setState({
        receiptUpload:
          'failed but you may continue submitting without upload.',
      });
    }
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
              <form onReset={handleReset} onSubmit={handleSubmit} noValidate>
                <See values={values} />
                <ErrorMessage component={Err} name={'clinic'} />
                <Field name="clinic" as={MySelectField} label="Choose Clinic">
                  {[{ _id: 0, name: 'Choose Clinic' }, ...allMyClinics].map(
                    ({ _id, name }) => (
                      <option key={_id} value={_id} children={name} />
                    )
                  )}
                </Field>
                <ErrorMessage component={Err} name={'providers'} />
                <SelectProvider
                  providersByClinic={providersByClinic}
                  clinic={values.clinic}
                />
                <MyTextInputField
                  label="Add Receipt"
                  type="file"
                  width={250}
                  marginBottom={32}
                  onChange={async (event) => {
                    console.log('event', event)
                    this.setState({ receiptUpload: 'starting compression' });
                    const filename = event.target.value.split('\\').at(-1)
                    const [uploadDetails, blob] = await Promise.all([
                      this.getPresignedUrl(filename),
                      new Promise((resolve, reject) => {
                        compress(event, (file) => {
                          this.setState({ receiptUpload: 'compression finished' });
                          resolve(file);
                        })
                      })
                    ])
                    this.uploadReceipt(uploadDetails, blob)

                  }}
                />
                <b>Receipt Upload Status: </b>
                <h4  >
                  {this.state.receiptUpload}
                </h4>
                {this.state.receiptID && <Receipt src={`${url}receipt/${this.state.receiptID}`} />}

                <ErrorMessage component={Err} name={'date'} />
                <Field
                  name="date"
                  label="Date"
                  type="datetime-local"
                  as={MyTextInputField}
                />
                <ErrorMessage component={Err} name={'reason'} />
                <Field
                  name="reason"
                  as={MySelectField}
                  label="Reason For Visit"
                >
                  <option value="0" key={0}>
                    Choose a Reason
                  </option>
                  {reasons.map((n) => (
                    <option value={n} key={n}>
                      {n}
                    </option>
                  ))}
                </Field>
                <SelectMaterials />
                <ErrorMessage component={Err} name={'amountSpent'} />
                <Field
                  inputMode="decimal"
                  name="amountSpent"
                  as={MyTextInputField}
                  label="Enter Amount Spent"
                />
                <Label>
                  Additional Notes:
                  <Field name="notes" as={MyTextarea} />
                </Label>
                <div style={{ display: 'flex' }}>
                  <div style={{ margin: 'auto' }}>
                    {dev && <button type="submit">check</button>}
                    {/* {this.state.receiptSubmitted || !validate ? ( */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      children="Submit"
                      height={60}
                      name="submitvisit"
                    />
                    {/* ) : (                      'Please Attach A Receipt Before Submitting'                    )} */}
                    {isSubmitting && 'Adding Visit'}
                    {this.state.submitError && this.state.submitError}
                  </div>
                </div>
              </form>
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
