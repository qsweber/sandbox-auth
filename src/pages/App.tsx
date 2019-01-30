import React, { Component } from 'react';

type Props = {
  location: {
    search: string,
  },
};

type State = {};

export class App extends Component<Props, State> {
  render() {
    return (
      <div>
        <p><a href='login'>Already have an account?</a></p>
        <p><a href='register'>Sign up</a></p>
      </div>
    );
  }
}
