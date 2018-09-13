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
import Modal from './Modal';
import * as Context from './Context';

Enzyme.configure({ adapter: new Adapter() });

const ContextObj: Object = Context;

jest.mock('./Context', () => {
  const container = {
    modalDidMount: jest.fn(),
    modalDidUnmount: jest.fn(),
  };
  return {
    Consumer: jest.fn().mockImplementation(({ children }) => children(container)),
    container,
  };
});

beforeEach(() => {
  ContextObj.container.modalDidMount.mockClear();
  ContextObj.container.modalDidUnmount.mockClear();
});

it('should call modalDidMount in container', () => {
  mount(<Modal>Modal content</Modal>);
  expect(ContextObj.container.modalDidMount).toHaveBeenCalledWith('Modal content');
});

it('should call modalDidUnmount in container', () => {
  const wrapper = mount(<Modal>Modal content</Modal>);
  wrapper.unmount();
  expect(ContextObj.container.modalDidUnmount).toHaveBeenCalledWith('Modal content');
});

it('should render no content', () => {
  const wrapper = mount(<Modal>Modal content</Modal>);
  expect(wrapper.text()).toBe(null);
});

it('should not crash when container is missing', () => {
  Context.Consumer.mockImplementation(({ children }) => children());
  expect(
    () => {
      const wrapper = mount(<Modal>Modal content</Modal>);
      wrapper.unmount();
    },
  ).not.toThrow();
});
