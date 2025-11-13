import { FieldErrors } from 'react-hook-form';

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

  return (
    <ul className={className}>
      {entries.map(([field, error]) => (
        <li key={field}>{error?.message?.toString()}</li>
      ))}
    </ul>
  );
}
