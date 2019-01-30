import React, { Component } from 'react';

import { signOut } from '../clients/cognito';
import { FormPage } from '../components/FormPage';

type Props = {};

type State = {};

export class SignOut extends Component<Props, State> {
  render() {
    signOut();

    return (
      <FormPage>
        <p>Signed out!</p>
      </FormPage>
    );
  }
}

