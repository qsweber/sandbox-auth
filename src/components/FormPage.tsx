import React, { Component } from 'react';
import * as dapper from '@convoy/dapper';

type Props = {
  children: any,
};

type State = {};

const STYLES = dapper.compile({
  // https://stackoverflow.com/questions/396145/how-to-vertically-center-a-div-for-all-browsers
  outer: {
    display: 'table',
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
  },
  middle: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  inner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '350px',
  },
});

export class FormPage extends Component<Props, State> {

  styles = dapper.reactTo(this, STYLES);

  render() {
    return (
      <div className={this.styles.outer}>
        <div className={this.styles.middle}>
          <div className={this.styles.inner}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
