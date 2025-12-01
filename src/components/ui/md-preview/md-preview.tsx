import createDOMPurify from 'dompurify';
import { parse } from 'marked';

const DOMPurify = createDOMPurify(window);

export type MDPreviewProps = {
  value: string;
};

export const MDPreview = ({ value = '' }: MDPreviewProps) => {
  return (
    <div
      className="prose prose-slate w-full max-w-none"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(parse(value) as string),
      }}
    />
  );
};
