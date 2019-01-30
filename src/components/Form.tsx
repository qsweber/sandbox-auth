import React, { Component } from 'react';

import * as dapper from '@convoy/dapper';

type Field = {
  name: string,
  label: string,
  type: string,
}

export type FormFields = {
  [key: string]: string,
}

export type OtherData = {
  [key: string]: string,
}

type Props = {
  onSubmit: (fields: FormFields, otherData: OtherData) => Promise<void>,
  fields: Field[],
  otherData: OtherData,
};

type State = {
  fields: FormFields,
  error: string,
};

const STYLES = dapper.compile({
  form: {
    border: '2px solid',
    borderRadius: '5px',
    padding: '20px',
  },
  input: {
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  label: {
  },
});

export class Form extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const fields = props.fields.reduce((obj: FormFields, item: Field): FormFields => {
      obj[item.name] = '';
      return obj;
    }, {});

    this.state = {
      fields,
      error: '',
    };
  }

  styles = dapper.reactTo(this, STYLES);

  submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    this.props.onSubmit(this.state.fields, this.props.otherData).catch(error => {
      this.setState({ error });
    });
  }

  update = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.currentTarget.name]: e.currentTarget.value,
      },
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit} className={this.styles.form}>
          {this.props.fields.map((value: Field): any => {
            return (
              <div key={value.name}>
                <div className={this.styles.label}>{value.label}</div>
                <input
                  placeholder=''
                  type={value.type}
                  name={value.name}
                  value={this.state.fields[value.name]}
                  onChange={this.update}
                  className={this.styles.input}
                />
                <br />
              </div>
            );
          })}
          <div>
            <input type="submit" className={this.styles.input} />
          </div>
        </form>
        <p>{this.state.error}</p>
      </div>
    );
  }
}
