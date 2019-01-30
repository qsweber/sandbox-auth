import React, { Component } from 'react';

import { forgotPassword } from '../clients/cognito';
import { FormFields, Form } from '../components/Form';
import { FormPage } from '../components/FormPage';

type Props = {};

type State = {};

const submit = async (fields: FormFields, _otherData: FormFields): Promise<void> => {
  await forgotPassword(fields['email']);
}

export class Forgot extends Component<Props, State> {
  render() {
    return (
      <FormPage>
        <Form
          onSubmit={submit}
          fields={[
            { name: 'email', label: 'Email', type: 'text' },
          ]}
          otherData={{}}
        />
      </FormPage>
    );
  }
}

