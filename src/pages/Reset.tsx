import React, { Component } from 'react';

import { authenticateUser, confirmPassword } from '../clients/cognito';
import { FormFields, Form } from '../components/Form';
import { FormPage } from '../components/FormPage';

type Props = {
};

type State = {
};

const submit = async (fields: FormFields, otherData: FormFields): Promise<void> => {
  await confirmPassword(fields['email'], fields['code'], fields['password']);
  await authenticateUser(fields['email'], fields['password']);
}

export class Reset extends Component<Props, State> {
  render() {
    return (
      <FormPage>
        <Form
          onSubmit={submit}
          fields={[
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'code', label: 'Code', type: 'text' },
            { name: 'password', label: 'New Password', type: 'password' },
          ]}
          otherData={{}}
        />
      </FormPage>
    );
  }
}
