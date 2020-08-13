/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { SecondaryEmailInputForm, CREATE_SECONDARY_EMAIL_MUTATION } from '.';
import { MockedCache, MOCK_ACCOUNT } from '../../models/_mocks';
import { GET_INITIAL_STATE } from '../App';

// every unverified email with a functioning "Resend verification"
// button must have a mock object created per mutation attempt.
const createMock = (email: string) => ({
  request: {
    query: CREATE_SECONDARY_EMAIL_MUTATION,
    variables: { input: { email } },
  },
  result: {
    data: {
      createSecondaryEmail: {
        clientMutationId: null,
      },
    },
  },
});

storiesOf('Components|SecondaryEmailInputForm', module)
  .add('Default empty', () => (
    <MockedCache>
      <SecondaryEmailInputForm />
    </MockedCache>
  ))
  .add('No secondary email set, primary email unverified', () => {
    const primaryEmail = {
      email: 'johndope@example.com',
      isPrimary: true,
      verified: false,
    };
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GET_INITIAL_STATE,
      data: {
        account: { ...MOCK_ACCOUNT, emails: [primaryEmail] },
        session: { verified: true },
      },
    });
    const mocks = [createMock('johndope2@example.com')];
    return (
      <MockedProvider {...{ mocks, cache }}>
        <SecondaryEmailInputForm />
      </MockedProvider>
    );
  })
  .add(
    'secondary can not match primary error, primary email unverified',
    () => {
      const primaryEmail = {
        email: 'johndope@example.com',
        isPrimary: true,
        verified: false,
      };
      const cache = new InMemoryCache();
      cache.writeQuery({
        query: GET_INITIAL_STATE,
        data: {
          account: { ...MOCK_ACCOUNT, emails: [primaryEmail] },
          session: { verified: true },
        },
      });
      const mocks = [createMock('johndope@example.com')];
      return (
        <MockedProvider {...{ mocks, cache }}>
          <SecondaryEmailInputForm />
        </MockedProvider>
      );
    }
  )
  .add(
    'secondary matching secondary already added, primary email unverified',
    () => {
      const emails = [
        {
          email: 'johndope@example.com',
          isPrimary: true,
          verified: true,
        },
        {
          email: 'johndope2@example.com',
          isPrimary: false,
          verified: true,
        },
      ];
      const cache = new InMemoryCache();
      cache.writeQuery({
        query: GET_INITIAL_STATE,
        data: {
          account: { ...MOCK_ACCOUNT, emails },
          session: { verified: true },
        },
      });
      const mocks = [createMock('johndope2@example.com')];
      return (
        <MockedProvider {...{ mocks, cache }}>
          <SecondaryEmailInputForm />
        </MockedProvider>
      );
    }
  );
