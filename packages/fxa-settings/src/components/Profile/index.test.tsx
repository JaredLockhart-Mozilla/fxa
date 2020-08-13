/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Profile } from '.';
import {
  renderWithRouter,
  MockedCache,
  MOCK_ACCOUNT,
} from '../../models/_mocks';

// set this here to bypase ts null warning
let displayName = 'John Dope';
if (MOCK_ACCOUNT.displayName) {
  displayName = MOCK_ACCOUNT.displayName;
}

// todo:
// add test cases for different states, including secondary email
describe('Profile', () => {
  it('renders "fresh load" <Profile/> with correct content', async () => {
    const { findByText } = renderWithRouter(
      <MockedCache>
        <Profile />
      </MockedCache>
    );

    expect(await findByText(displayName)).toBeTruthy;
    expect(await findByText(MOCK_ACCOUNT.primaryEmail.email)).toBeTruthy;

    //  const result = await findAllByText('Not Set');
    //  expect(result).toHaveLength(2);
  });
});
