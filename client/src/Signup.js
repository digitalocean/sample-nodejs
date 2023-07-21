import React from 'react';
import { Button, Pane } from 'evergreen-ui';
import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { url } from './url';
import { Err, MyTextInputField } from './Fields';
import { LoginSchema, SignupSchema } from './Validation';
import logo from './image/pnglogo.png';

const dev = process.env.NODE_ENV === 'development';

const Signup = () => {
  const submit = values => {
    values.newUser = true;
    fetch(`${url}login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="70vh"
    >
      <Pane width="90vw" border="default">
        <img src={logo} height="47px" alt="pgl logo" />
        <Formik onSubmit={submit} validationSchema={SignupSchema}>
          {({ isSubmitting }) => (
            <Form>
              <ErrorMessage component={Err} name="username" />
              <Field as={MyTextInputField} name="email" label="Username" />
              <ErrorMessage component={Err} name="password" />
              <Field as={MyTextInputField} name="password" label="Password" />
              <Field
                as={MyTextInputField}
                name="password2"
                label="Password Confirm"
              />
              <Button type="submit" disabled={isSubmitting} children="Submit" />
            </Form>
          )}
        </Formik>
      </Pane>
    </Pane>
  );
};

export default Signup;
