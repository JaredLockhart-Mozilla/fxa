/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useAccount } from '../../models';
import { Profile } from '../Profile';
import Security from '../Security';
import AlertExternal from '../AlertExternal';
import * as Metrics from '../../lib/metrics';

export const Settings = (_: RouteComponentProps) => {
  const { uid } = useAccount();

  Metrics.setProperties({
    lang: document.querySelector('html')?.getAttribute('lang'),
    uid,
  });

  return (
    <>
      <AlertExternal />
      <Profile />
      <Security twoFactorAuthEnabled={false} />
    </>
  );
};

export default Settings;
