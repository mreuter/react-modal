# @mr-web/react-modal

[![Build Status](https://travis-ci.com/mreuter/react-modal.svg?branch=master)](https://travis-ci.com/mreuter/react-modal)
[![codecov](https://codecov.io/gh/mreuter/react-modal/branch/master/graph/badge.svg)](https://codecov.io/gh/mreuter/react-modal)

Fully customizable Modals for React

## Contents

- [Contents](#contents)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [License and Copyright](#license-and-copyright)

## Installation

To install using npm:

```bash
npm install -P @mr-web/react-modal
```

or using yarn:

```bash
yarn add @mr-web/react-modal
```

## Usage

This library is very basic. The developer has complete freedom with the appearance of the modals.

You need a ModalProvider, that wraps your app. You must supply a ModalContainer component
to this provider:

<!-- unused -->

```javascript
// You can use any component as the container. Doing the styling is up to you.
const ModalContainer = () => <div className="modal-container"></div>

<ModalProvider ModalContainer={ModalContainer}>
  <App>
    My Stuff
  </App>
</ModalProvider>
```

## Documentation

<!-- default -->

First create your ModalContainer and ModalContent components:

```javascript
const ModalContainer = ({ children }) => (
  <div className="modal-container">{children}</div>
);

const ModalContent = ({ children, title }) => (
  <div className="modal">
    <header className="modal__header">{title}</header>
    <div className="modal__content">{children}</div>
  </div>
);
```

Add the modal to your app:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider, Modal } from "@mr-web/react-modal";

const App = () => (
  <ModalProvider ModalContainer={ModalContainer}>
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Modal>
        <ModalContent title="My first Modal">Welcome</ModalContent>
      </Modal>
    </div>
  </ModalProvider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Once you do so, you'll notice, that the modal is always shown. That is all the library does:
show a Modal inside the ModalContainer, if there is a Modal component anywhere in the tree.

You'll have to add some logic for visibility:

```javascript
// ...

class ModalShow extends React.PureComponent {
  constructor() {
    super();
    this.state = { show: false };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.onToggle}>Show Modal</button>
        {this.state.show && (
          <Modal>
            <ModalContent title="My first Modal">
              <p>Welcome</p>
              <button onClick={this.onToggle}>Hide Modal</button>
            </ModalContent>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

const App = () => (
  <ModalProvider ModalContainer={ModalContainer}>
    <div className="App">
      <h1>Hello @mr-web/react-modal</h1>
      <ModalShow />
    </div>
  </ModalProvider>
);

// ...
```

### CSS

The CSS code for the examples:

```css
.modal-container {
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
}

.modal {
  background: white;
  border: 2px solid black;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal__header {
  border-bottom: 1px solid black;
  padding: 4px 12px;
  background: #aaa;
}

.modal__content {
  padding: 12px;
}
```

The result can be seen here:

[![Edit kxo5r0nlm3](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/kxo5r0nlm3)

## License and Copyright

[MIT](./LICENSE) &copy; Marc Reuter
