import React, { Component } from 'react';

import { authenticateUser, checkForLoggedInUser } from '../clients/cognito';
import { Form, FormFields } from '../components/Form';
import { FormPage } from '../components/FormPage';

type Props = {
  location: {
    search: string,
  },
};

type State = {};

const afterLoggedIn = (idToken: string, callbackUrl: string): void => {
  window.location.replace(`${callbackUrl}?token=${idToken}`);
}

const checkIfLoggedIn = async (callbackUrl: string): Promise<void> => {
  const token = await checkForLoggedInUser();

  if (token !== null) {
    afterLoggedIn(token, callbackUrl);
  }
}

const submit = async (fields: FormFields, otherData: FormFields): Promise<void> => {
  const token = await authenticateUser(fields['email'], fields['password'])

  afterLoggedIn(token, otherData['callbackUrl']);
}

export class Login extends Component<Props, State> {
  render() {
    // const callbackUrl = `${queryString.parse(this.props.location.search).callbackUrl}` || '/';
    const callbackUrl = '/';
    
    checkIfLoggedIn(callbackUrl);

    return (
      <FormPage>
        <Form
          onSubmit={submit}
          fields={[
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'password', label: 'Password', type: 'password' },
          ]}
          otherData={{
            callbackUrl,
          }}
        />
      </FormPage>
    );
  }
}
