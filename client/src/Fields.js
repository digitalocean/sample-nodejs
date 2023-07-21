import React, { useState } from 'react';
import logo from './image/pnglogo.png';
import {
  Pane,
  Button,
  SelectField,
  TextInputField,
  Textarea,
  Spinner,
} from 'evergreen-ui';
import { url } from './url';
import { NavLink } from 'react-router-dom';

const height = 48;

export const MySelectField = (props) => (
  <SelectField {...props} inputHeight={height} />
);
export const MyTextarea = (props) => (
  <Textarea {...props} style={{ fontSize: '16px' }} />
);

export const MyTextInputField = (props) => (
  <TextInputField {...props} inputHeight={height} />
);

export const SelectClinic = ({ clinics = [], setClinic }) => {
  return (
    <MySelectField label="Choose a clinic" onChange={setClinic}>
      {[
        { _id: 0, name: 'Choose a clinic' },
        ...clinics.sort((a, b) => (a.name > b.name ? 1 : -1)),
      ].map(({ _id, name }) => (
        <option key={_id} value={_id}>
          {name}
        </option>
      ))}
    </MySelectField>
  );
};

export const Wrapper = ({ children }) => (
  <Pane display="flex" padding={6} background="tint2" borderRadius={3}>
    <Pane flex={1} alignItems="center">
      {children}
    </Pane>
  </Pane>
);

export const SubmitButton = function ({ link = '' }) {
  const doIt = () => {
    this.setState({ submitted: false, waiting: true }, async () => {
      await this.submit();
      this.setState({ submitted: true });
    });
  };
  const reload = () => location.reload(); //eslint-disable-line
  const { submitted, waiting } = this.state;
  if (waiting && !submitted) return 'Submitting Data';
  return submitted ? (
    <div>
      Successfully Submitted
      <div>{link || <button onClick={reload}>Add Another</button>}</div>
    </div>
  ) : (
    <Button onClick={doIt} appearance="primary">
      Submit
    </Button>
  );
};

export const DevInfo = ({ children }) =>
  window.pglOptions.showState && <>{children}</>;

export const addValue = function (key, event) {
  const newState = {};
  const { value } = event.target;
  newState[key] = value;
  this.setState(newState);
};

export const OneVisit = ({ visit = {}, spending }) => {
  if (!visit._id) return 'Choose a Date';

  const { amountSpent, providers, materials, receiptID, rep } = visit;
  return (
    <>
      <h4>For This Visit</h4>
      <div>Amount Spent: ${amountSpent}</div>
      <div>Materials: {materials.length ? materials.join(' ') : 'None'}</div>
      <div>Rep: {rep} </div>
      <div>
        Providers Present:
        <ol>
          {providers.map((providerID) => {
            if (spending[providerID])
              return <li key={providerID}>{spending[providerID].name}</li>;
            else return 'Loading';
          })}
        </ol>
      </div>
      {receiptID && receiptID.length ? (
        <Receipt src={`${url}receipt/${receiptID}`} />
      ) : (
        'No image was uploaded'
      )}
    </>
  );
};

export const Receipt = ({ src }) => {
  const [enlarge, setEnlarge] = useState(false);
  const [loading, setLoading] = useState(true);
  const toggle = () => setEnlarge(!enlarge);

  return enlarge ? (
    <div className="fill-screen-all">
      <button onClick={toggle} className="top-right">
        X
      </button>
      <div onClick={toggle} className="fill-screen">
        <div style={{ transform: 'rotate(90deg)' }}>
          <img
            className="make-it-fit"
            src={src}
            alt="receipt"
            onLoad={() => setLoading(false)}
          />
          {loading && <Spinner />}
        </div>
      </div>
    </div>
  ) : (
    <>
      <h4>Click To Enlarge</h4>
      <div style={{ display: 'flex', height: '350px' }}>
        <div style={{ margin: 'auto', transform: 'rotate(90deg)' }}>
          <div onClick={toggle}>
            <img
              height="250px"
              onLoad={() => setLoading(false)}
              src={src}
              alt="receipt"
            />
            {loading && <Spinner />}
          </div>
        </div>
      </div>
    </>
  );
};

export const Err = ({ children }) => (
  <div style={{ background: 'red' }}>{children}</div>
);
/*eslint-disable no-unused-expressions*/
export const compress = (e, cb) => {
  e.persist();
  const width = 700;
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = width;
      elem.height = img.height * (width / img.width);
      const ctx = elem.getContext('2d');
      // img.width and img.height will contain the original dimensions
      ctx.drawImage(img, 0, 0, width, elem.height);
      ctx.canvas.toBlob(
        (blob) => {
          cb(blob);
        },
        'image/jpeg',
        1
      );
    };
    reader.onerror = (error) => console.log(error);
  };
};

export const Header = ({ user }) => {
  const MyButton = (props) => (
    <Button style={{ flex: '1 1 33%' }} height="36" {...props} />
  );
  const style = { margin: 'auto' };
  const logout = () => fetch(url + 'logout').then(() => location.reload()); //eslint-disable-line

  return (
    <nav style={{ display: 'flex', flexWrap: 'wrap' }}>
      {window.pglOptions.dev && (
        <MyButton key="user">
          <span style={style}>Hi {user}!</span>
        </MyButton>
      )}
      {Object.entries(routeNames)
        .filter(([label]) => {
          if (user === 'admin') return label === 'Past Visits';
          return true;
        })
        .map(([label, [url]]) => {
          if (window.pglOptions.settings !== true && label === 'Settings')
            return null;
          else
            return (
              <MyButton
                key={label}
                appearance={
                  window.location.href.includes(url) ? 'primary' : 'default'
                }
              >
                <NavLink
                  to={`/${url}`}
                  style={{
                    width: '100%',
                    textDecoration: 'none',
                    color: 'unset',
                  }}
                >
                  <span style={style}>{label}</span>
                </NavLink>
              </MyButton>
            );
        })}
    </nav>
  );
};

export const Loading = () => (
  <Pane
    paddingTop={15}
    paddingBottom={100}
    height="100vh"
    width="100vw"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <div
      width="90vw"
      border="default"
      style={{
        textAlign: 'center',
      }}
    >
      <img src={logo} height="47px" alt="pgl logo" />
      <h4>Please wait, loading </h4>
    </div>
  </Pane>
);

export const routeNames = {
  'Past Visits': ['pastvisits'],
  'Add Clinic': ['addclinic'],
  'Add Provider': ['addprovider'],
  'Add Visit': ['addvisit'],
  Settings: ['settings'],
  Home: ['home'],
};

export const Pretty = ({ children, username }) => (
  <>
    <Header user={username} />
    <Pane
      paddingTop={15}
      paddingBottom={100}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Pane width="90vw" border="default">
        {children}
      </Pane>
    </Pane>
  </>
);
