// import React, { useState } from 'react';
// import { Button, Pane } from 'evergreen-ui';
// import './App.css';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { url } from './url';
// import { Err, MyTextInputField } from './Fields';
// import { LoginSchema } from './Validation';
// import logo from './image/pnglogo.png';
// import { Redirect } from 'react-router-dom';
// import Amplify from '@aws-amplify/core';
// import Auth from '@aws-amplify/auth';

// const region = 'us-east-2';
// const userPoolId = 'us-east-2_JTfbOx7IW';
// const userPoolWebClientId = '51eq1c0j7bqjb2pmie7qa2s2t5';

// const AuthDetails = {
//   region,
//   userPoolId,
//   userPoolWebClientId,
// };

// Amplify.configure(AuthDetails);

// const Login = ({ setUser, user }) => {
//   const [failed, setFailed] = useState(false);
//   const [needNewPassword, setNeedNewPassword] = useState(false);
//   const [newPassword, setNewPassword] = useState('');
//   const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const authenticate = ({ username, password }) => {
//     setUsername(username);
//     setPassword(password);
//     Auth.signIn(username, password, {})
//       .then((user) => {
//         if ((user.challengeName === 'NEW_PASSWORD_REQUIRED')) {
//           setNeedNewPassword(true);
//         }
//         console.log('ronald', user);
//       })
//       .catch((error) => {
//         console.log(44, error);
//       });
//   };

//   const sendNewPassword = () => {
//     if (newPassword !== newPasswordConfirmation) {
//       alert('passwords dont match ');
//     } else {
//       Auth.signIn(username, password, {})
//         .then((user) => {
//           if ((user.challengeName = 'NEW_PASSWORD_REQUIRED')) {
//             Auth.completeNewPassword(user, newPassword)
//               .then((response) => {
//                 console.log('successcully made new password', response);
//                 //todo back to login
//               })
//               .catch((e) => {
//                 console.log('line 49,', e);
//               });
//           }
//         })
//         .catch((e) => {
//           console.log('!!!!!!!!!', e);
//         });
//     }
//   };

//   return user ? (
//     <Redirect to="/" />
//   ) : (
//     <Pane
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       height="70vh"
//     >
//       <Pane width="90vw" border="default">
//         <img src={logo} height="47px" alt="pgl logo" />
//         <Formik
//           initialValues={
//             // process.env.NODE_ENV === 'development'
//             //   ? { username: 'test', password: 'wonderboy' }
//             //   :
//             { username: '', password: '' }
//           }
//           onSubmit={authenticate}
//           validationSchema={LoginSchema}
//         >
//           {({ isSubmitting, values, ...other }) => {

//             return (
//               <Form>
//                 <ErrorMessage component={Err} name="username" />
//                 <Field as={MyTextInputField} name="username" label="Username" />
//                 <ErrorMessage component={Err} name="password" />
//                 <Field
//                   as={MyTextInputField}
//                   name="password"
//                   label="Password"
//                   type="password"
//                 />
//                 {needNewPassword && (
//                   <>
//                     <input
//                       label="New Password"
//                       value={newPassword}
//                       onChange={({ target }) => {
//                         setNewPassword(target.value);
//                       }}
//                     />
//                     <input
//                       value={newPasswordConfirmation}
//                       label="Confirm New Password"
//                       onChange={({ target }) => {
//                         setNewPasswordConfirmation(target.value);
//                       }}
//                     />
//                     <Button type="button" onClick={sendNewPassword} />
//                   </>
//                 )}
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   children="Submit"
//                 />
//                 {failed && (
//                   <Pane width="90vw" border="default">
//                     Password or username is incorrect, please try again or
//                     contact tech support at 985-966-5497
//                   </Pane>
//                 )}
//               </Form>
//             );
//           }}
//         </Formik>
//       </Pane>
//     </Pane>
//   );
// };

// export default Login;
