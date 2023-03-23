/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render } from '@testing-library/react';
import renderer from 'react-router-dom';
import App from '../App';

test('login page renders', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/login/);
  expect(linkElement).toBeInTheDocument();
});

test('App login page matches snapshot', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
