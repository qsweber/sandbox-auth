import React, { Component } from 'react';

import { FormFields, Form } from '../components/Form';
import { signUp } from '../clients/cognito';
import { FormPage } from '../components/FormPage';

type Props = {
};

type State = {
};

const submit = async (fields: FormFields, otherData: FormFields): Promise<void> => {
  await signUp(fields['email'], fields['password'])
}

export class Register extends Component<Props, State> {
  render() {
    return (
      <FormPage>
        <Form
          onSubmit={submit}
          fields={[
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'password', label: 'Password', type: 'password' },
          ]}
          otherData={{}}
        />
      </FormPage>
    );
  }
}
