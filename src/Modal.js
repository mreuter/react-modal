/**
 * Copyright (c) 2018-present, Marc Reuter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import { Consumer } from './Context';
import type { ModalMounting } from './ModalProvider';

type ModalViewProps = {
  children?: React.Node,
  container?: ModalMounting,
}
type ModalProps = {
  children?: React.Node,
}

class ModalView extends React.PureComponent<ModalViewProps> {
  static defaultProps = {
    children: undefined,
    container: undefined,
  };

  componentDidMount() {
    const { container, children } = this.props;
    if (container) container.modalDidMount(children);
  }

  componentWillUnmount() {
    const { container, children } = this.props;
    if (container) container.modalDidUnmount(children);
  }

  render() {
    return null;
  }
}

const Modal = ({ children }: ModalProps) => (
  <Consumer>{container => <ModalView container={container}>{children}</ModalView>}</Consumer>
);
Modal.defaultProps = {
  children: undefined,
};

export default Modal;
