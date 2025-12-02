import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { FieldSet } from '@/components/ui/field';
import { Form, Input, Textarea } from '@/components/ui/form';
import { FormErrors } from '@/components/ui/form/form-errors';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';

import {
  createArticleInputSchema,
  useCreateArticle,
} from '../api/create-article';

type CreateArticleFormFieldsProps = {
  tags: string[];
  tagInput: string;
  onChangeTagInput: (value: string) => void;
  onAddTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveTag: (tag: string) => void;
  isSubmitting: boolean;
};

const CreateArticleFormFields = ({
  tags,
  tagInput,
  onChangeTagInput,
  onAddTagKeyDown,
  onRemoveTag,
  isSubmitting,
}: CreateArticleFormFieldsProps) => {
  const { register, formState, setValue } = useFormContext();

  useEffect(() => {
    setValue('tagList', tags);
  }, [setValue, tags]);

  return (
    <>
      <FieldSet>
        <Input
          className="w-full rounded-lg border border-gray-300 px-4 py-6 text-base transition-all placeholder:text-gray-400 focus:border-realworld focus:outline-none focus:ring-2 focus:ring-realworld/20"
          type="text"
          placeholder="Article Title"
          autoComplete="off"
          registration={register('title')}
        />
      </FieldSet>

      <FieldSet>
        <Input
          className="w-full rounded-lg border border-gray-300 px-4 py-6 text-base transition-all placeholder:text-gray-400 focus:border-realworld focus:outline-none focus:ring-2 focus:ring-realworld/20"
          type="text"
          placeholder="What's this article about?"
          registration={register('description')}
        />
      </FieldSet>

      <FieldSet>
        <Textarea
          className="w-full rounded-lg border border-gray-300 p-4 text-base transition-all placeholder:text-gray-400 focus:border-realworld focus:outline-none focus:ring-2 focus:ring-realworld/20"
          rows={10}
          placeholder="Write your article (in markdown)"
          registration={register('body')}
        />
      </FieldSet>

      <FieldSet>
        <Input
          className="w-full rounded-lg border border-gray-300 px-4 py-6 text-base transition-all placeholder:text-gray-400 focus:border-realworld focus:outline-none focus:ring-2 focus:ring-realworld/20"
          type="text"
          placeholder="Enter tags and press Enter"
          value={tagInput}
          onChange={(e) => onChangeTagInput(e.target.value)}
          onKeyDown={onAddTagKeyDown}
          registration={{ name: 'tagInput' }}
        />

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="text-gray-400 transition hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </FieldSet>

      <FormErrors
        className="px-4 text-sm text-red-500"
        errors={formState.errors}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          size="xl"
          variant="realworld"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Publish Article
        </Button>
      </div>
    </>
  );
};

export const CreateArticleForm = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const createArticleMutation = useCreateArticle({
    mutationConfig: {
      onSuccess: (data) => {
        addNotification({
          type: 'success',
          title: 'Article Created',
        });
        navigate(paths.article.read.getHref(data.article.slug), {
          replace: true,
        });
      },
    },
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedTag = tagInput.trim();
      if (trimmedTag && !tags.includes(trimmedTag)) {
        setTags([...tags, trimmedTag]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Form
      onSubmit={(values) => {
        createArticleMutation.mutate({ data: { ...values, tagList: tags } });
      }}
      schema={createArticleInputSchema}
      className="space-y-8"
    >
      {() => (
        <CreateArticleFormFields
          tags={tags}
          tagInput={tagInput}
          onChangeTagInput={setTagInput}
          onAddTagKeyDown={handleAddTag}
          onRemoveTag={handleRemoveTag}
          isSubmitting={createArticleMutation.isPending}
        />
      )}
    </Form>
  );
};
