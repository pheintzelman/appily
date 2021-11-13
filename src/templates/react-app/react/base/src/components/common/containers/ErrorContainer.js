import { useEffect } from 'react';
import { ErrorType } from '../../../lib/error';
import { MessageContainer } from './MessageContainer';

function getErrorMessage(error) {
  switch (error.type) {
    case ErrorType.NotFound:
      return 'Not Found';
    default:
      return 'Something went wrong.';
  }
}

export function ErrorContainer({ title, error, className }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MessageContainer
      title={title}
      message={getErrorMessage(error)}
      className={className}
    />
  );
}
