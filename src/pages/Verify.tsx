import React, { Component } from 'react';

import { confirmRegistration, authenticateUser } from '../clients/cognito';
import { FormFields, Form } from '../components/Form';
import { FormPage } from '../components/FormPage';

type Props = {
};

type State = {
};

const submit = async (fields: FormFields, otherData: FormFields): Promise<void> => {
  await confirmRegistration(fields['email'], fields['code']);
  await authenticateUser(fields['email'], fields['password']);
}

export class Verify extends Component<Props, State> {
  render() {
    return (
      <FormPage>
        <Form
          onSubmit={submit}
          fields={[
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'code', label: 'Code', type: 'text' },
            { name: 'password', label: 'Password', type: 'password' },
          ]}
          otherData={{}}
        />
      </FormPage>
    );
  }
}
