/**
 * Copyright (c) 2018-present, Marc Reuter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ModalProvider from './ModalProvider';

jest.mock('./Context', () => ({
  Provider: ({ children }) => children,
}));

Enzyme.configure({ adapter: new Adapter() });

const TestContainer: Object = jest.fn().mockImplementation(({ children }) => children);
TestContainer.displayName = 'TestContainer';

beforeEach(() => {
  TestContainer.mockClear();
});

it('should render its content', () => {
  const wrapper = mount(<ModalProvider ModalContainer={TestContainer}>Content</ModalProvider>);
  expect(wrapper.containsMatchingElement('Content')).toBeTruthy();
});

it('should pass mounted modal as child to container', () => {
  const wrapper = mount(<ModalProvider ModalContainer={TestContainer}>Content</ModalProvider>);
  const modal = <div>Modal</div>;
  wrapper.instance().modalDidMount(modal);
  expect(TestContainer).toHaveBeenCalledWith({ children: modal }, {});
  wrapper.update();
  expect(wrapper.containsMatchingElement(<div>Modal</div>)).toBeTruthy();
});

it('should replace mounted modal if new modal is mounted', () => {
  const wrapper = mount(<ModalProvider ModalContainer={TestContainer}>Content</ModalProvider>);
  const modal = <div>Modal</div>;
  wrapper.instance().modalDidMount(modal);
  const secondModal = <div>2nd Modal</div>;
  wrapper.instance().modalDidMount(secondModal);
  expect(TestContainer).toHaveBeenCalledWith({ children: secondModal }, {});
  wrapper.update();
  expect(wrapper.containsMatchingElement(<div>2nd Modal</div>)).toBeTruthy();
});

it('should redisplay first mounted if second is unmounted', () => {
  const wrapper = mount(<ModalProvider ModalContainer={TestContainer}>Content</ModalProvider>);
  const modal = <div>Modal</div>;
  wrapper.instance().modalDidMount(modal);
  const secondModal = <div>2nd Modal</div>;
  wrapper.instance().modalDidMount(secondModal);
  wrapper.update();
  expect(wrapper.containsMatchingElement(<div>2nd Modal</div>)).toBeTruthy();
  wrapper.instance().modalDidUnmount(secondModal);
  wrapper.update();
  expect(wrapper.containsMatchingElement(<div>Modal</div>)).toBeTruthy();
});

it('should still display second modal if first is unmounted', () => {
  const wrapper = mount(<ModalProvider ModalContainer={TestContainer}>Content</ModalProvider>);
  const modal = <div>Modal</div>;
  wrapper.instance().modalDidMount(modal);
  const secondModal = <div>2nd Modal</div>;
  wrapper.instance().modalDidMount(secondModal);
  expect(TestContainer).toHaveBeenCalledWith({ children: secondModal }, {});
  wrapper.update();
  expect(wrapper.containsMatchingElement(<div>2nd Modal</div>)).toBeTruthy();
  wrapper.instance().modalDidUnmount(modal);
  wrapper.update();
  expect(wrapper.containsMatchingElement(<div>2nd Modal</div>)).toBeTruthy();
});

it('should remove mounted modal if unmounted', () => {
  const wrapper = mount(<ModalProvider ModalContainer={TestContainer}>Content</ModalProvider>);
  const modal = <div>Modal</div>;
  wrapper.instance().modalDidMount(modal);
  wrapper.update();
  expect(wrapper.containsMatchingElement(<div>Modal</div>)).toBeTruthy();
  wrapper.instance().modalDidUnmount(modal);
  wrapper.update();
  expect(wrapper.containsMatchingElement(<div>Modal</div>)).toBeFalsy();
});
