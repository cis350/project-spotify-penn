/* eslint-disable class-methods-use-this */
/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import UserList from '../components/UserList';

class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe('Component rendering tests', () => {
  test('test that a user list is in the document', () => {
    // render the component
    const { getByRole } = render(<UserList />);
    // find the element by its role
    const newFriendList = getByRole('NewFriends');
    // assert that the element is in the document
    expect(newFriendList).toBeInTheDocument();
  });
  test('test Users header', () => {
    // render the component
    const { getByText } = render(<UserList />);
    // find the element by its role
    const titleText = getByText(/Users/);
    // assert that the element is in the document
    expect(titleText).toBeInTheDocument();
  });
});

test('snapshot test', () => {
  const component = renderer.create(<UserList />);
  const domTreeJSON = component.toJSON();
  expect(domTreeJSON).toMatchSnapshot();
});

test('click on a user profile -> lead to user profile page', async () => {
  render(<UserList />);
  const playlistElement = screen.queryByRole('Playlists');
  expect(playlistElement).toBeNull();

  await userEvent.click(screen.getByRole('NavLink'));
  expect(screen.getByRole('Playlists')).toBeInTheDocument();
});

test('Button change when friend is requested', async () => {
  render(<UserList />);
  const playlistElement = screen.queryByRole('Playlists');
  expect(playlistElement).toBeNull();

  await userEvent.click(screen.getByRole('NavLink'));
  expect(screen.getByRole('Playlists')).toBeInTheDocument();
  expect(screen.getByRole('Button')).toHaveTextContent('Add Friend');

  await userEvent.click(screen.getByRole('Button'));
  expect(screen.getByRole('Button')).toHaveTextContent('Requested');
});
