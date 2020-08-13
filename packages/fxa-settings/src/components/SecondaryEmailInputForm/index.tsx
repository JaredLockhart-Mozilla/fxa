import React, { useCallback, useRef, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import TextInput from '../TextInput';

export const CREATE_SECONDARY_EMAIL_MUTATION = gql`
  mutation createSecondaryEmailMutation($input: EmailInput!) {
    createSecondaryEmail(input: $input) {
      clientMutationId
    }
  }
`;

export const SecondaryEmailInputForm = () => {
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const inputRef = useRef(null);

  const [createSecondaryEmailCode, { data, error }] = useMutation(
    CREATE_SECONDARY_EMAIL_MUTATION
  );

  const createSecondaryEmailCodeHandler = () => {
    const currentInput = inputRef ? inputRef.current : null;
    if (currentInput !== null && currentInput !== undefined) {
      createSecondaryEmailCode({
        variables: { input: { email: currentInput.value } },
      });
    } else {
      console.log('Ref to secondary email input was lost');
      return;
    }
  };

  const cancel = () => {
    window.location.replace(`${window.location.origin}/beta/settings`);
  };

  const checkEmail = useCallback(
    (ev) => {
      setSaveBtnDisabled(!ev.target.checkValidity());
    },
    [saveBtnDisabled, setSaveBtnDisabled]
  );

  return (
    <div className="p-10 max-w-md">
      <div className="mb-3">
        <TextInput
          label="Secondary Email"
          placeholder="Enter email address"
          type="email"
          errorText={error ? error.message : ''}
          onChange={checkEmail}
        />
      </div>

      <div className="flex justify-center space-x-6">
        <button
          className="cta-neutral transition-standard mb-3 w-32"
          data-testid="unit-row-modal"
          onClick={cancel}
        >
          Cancel
        </button>

        <button
          className={`cta-primary transition-standard mb-3 w-32 ${
            saveBtnDisabled ? 'opacity-25' : ''
          }`}
          data-testid="unit-row-modal"
          onClick={createSecondaryEmailCodeHandler}
          disabled={saveBtnDisabled}
        >
          Save
        </button>
      </div>
    </div>
  );
};
