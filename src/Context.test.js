/**
 * Copyright (c) 2018-present, Marc Reuter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { createContext } from 'react';

jest.mock('react', () => ({
  createContext: jest.fn().mockReturnValue({ Provider: 'Provider', Consumer: 'Consumer' }),
}));

it('should call createContext and export the results as Provider and Cosumer', () => {
  const { Provider, Consumer } = require('./Context'); // eslint-disable-line global-require
  expect(Provider).toBe('Provider');
  expect(Consumer).toBe('Consumer');
  expect(createContext).toHaveBeenCalledTimes(1);
});
