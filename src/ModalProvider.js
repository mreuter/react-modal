/**
 * Copyright (c) 2018-present, Marc Reuter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import { Provider } from './Context';

type ModalProviderProps = {
  children?: React.Node,
  ModalContainer: React.ComponentType<{}>,
};
type ModalProviderState = {
  modal?: React.Node,
};
export interface ModalMounting {
  modalDidMount(modal: React.Node): void;
  modalDidUnmount(modal: React.Node): void;
}

class ModalProvider extends React.PureComponent<ModalProviderProps, ModalProviderState>
  implements ModalMounting {
  static defaultProps = {
    children: undefined,
  };

  state = { modal: undefined };

  modals = [];

  modalDidMount = (modal: React.Node) => {
    const { state: { modal: currentModal } } = this;
    if (currentModal) this.modals.push(currentModal);
    this.setState({ modal });
  };

  modalDidUnmount = (modal: React.Node) => {
    const { modals, state: { modal: currentModal } } = this;
    if ((currentModal === modal) && modals.length > 0) {
      this.setState({ modal: modals.pop() });
    }
    this.modals = modals.filter((item: React.Node) => item !== modal);
    this.setState({ modal: undefined });
  };

  render() {
    const {
      state: { modal },
      props: { children, ModalContainer },
    } = this;
    return (
      <Provider value={this}>
        {children}
        {modal && <ModalContainer>{modal}</ModalContainer>}
      </Provider>
    );
  }
}

export default ModalProvider;
