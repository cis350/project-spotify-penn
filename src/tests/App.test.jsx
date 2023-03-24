/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from '../App';

test('login page renders', () => {
  const { getByTestId } = render(<App />);
  const headingElement = getByTestId('login');
  expect(headingElement).toBeInTheDocument();
});

test('App login page matches snapshot', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
