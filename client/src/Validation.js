import * as Yup from 'yup';

const firstName = Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required');

const lastName = Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required');

const email = Yup.string()
  .email('Invalid email')
  .required('Required');

export const AddVisitSchema = Yup.object().shape({
  clinic: Yup.string()
    .min(2, 'Choose a clinic')
    .required('Required'),
  providers: Yup.array()
    .min(1, 'Choose at least one provider')
    .required('Required'),
  amountSpent: Yup.string()
    .min(1, 'Enter Amount Spent')
    .required('Required'),
  reason: Yup.string()
    .min(2, 'Choose Reason For Visit')
    .required('Required'),
  date: Yup.string()
    .min(2, 'Enter Date and Time')
    .required('Required'),
  // materials: Yup.array().min(1, "Choose at least one type of materials")
  // firstName, lastName,
});
export const LoginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

export const SignupSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});
