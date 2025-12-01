import { FieldErrors } from 'react-hook-form';

import { cn } from '@/utils/cn';

type FormErrorsProps<T extends Record<string, any>> = {
  errors: FieldErrors<T>;
  className?: string;
};

export function FormErrors<T extends Record<string, any>>({
  errors,
  className,
}: FormErrorsProps<T>) {
  const entries = Object.entries(errors);
  if (entries.length === 0) return null;

  const getErrorMessages = (error: any): string[] => {
    if (error?.message) {
      return [error.message.toString()];
    }

    if (Array.isArray(error)) {
      return error
        .filter((item) => item?.message)
        .map((item) => item.message.toString());
    }

    if (error?.root?.message) {
      return [error.root.message.toString()];
    }

    return [];
  };

  return (
    <ul className={cn('list-disc font-semibold text-red-400', className)}>
      {entries.map(([field, error]) => {
        const messages = getErrorMessages(error);
        return messages.map((message, index) => (
          <li key={`${field}-${index}`}>{message}</li>
        ));
      })}
    </ul>
  );
}
