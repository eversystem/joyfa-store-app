import { ChangeEventHandler } from 'react';

export const handleFile =
  (
    callback: (file: File | null) => void,
  ): ChangeEventHandler<HTMLInputElement> =>
  (event) => {
    const files = event.currentTarget.files;
    if (!files || files?.length === 0) {
      callback(null);
    } else {
      const file = files[0];
      callback(file);
    }
  };
