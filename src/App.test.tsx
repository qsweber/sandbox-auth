import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './pages/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App location={{search: 'token=123'}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
