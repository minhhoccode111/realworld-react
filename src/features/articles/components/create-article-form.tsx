import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Form } from '@/components/ui/form/form';
import { FormErrors } from '@/components/ui/form/form-errors';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

import {
  createArticleInputSchema,
  useCreateArticle,
} from '../api/create-article';

export const CreateArticleForm = () => {
  const { addNotification } = useNotifications();
  const user = useUser();
  const location = useLocation();
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
        navigate(paths.article.read.getHref(data.article.slug));
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
        if (!user.data) {
          navigate(paths.login.getHref(location.pathname));
          return;
        }
        createArticleMutation.mutate({ data: { ...values, tagList: tags } });
      }}
      schema={createArticleInputSchema}
    >
      {({ register, formState, setValue }) => {
        useEffect(() => {
          setValue('tagList', tags);
        }, [tags, setValue]);

        return (
          <fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Article Title"
                {...register('title')}
              />
            </fieldset>

            <fieldset className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="What's this article about?"
                {...register('description')}
              />
            </fieldset>

            <fieldset className="form-group">
              <textarea
                className="form-control"
                rows={8}
                placeholder="Write your article (in markdown)"
                {...register('body')}
              ></textarea>
            </fieldset>

            <fieldset className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />

              <div className="tag-list">
                {tags.map((tag) => (
                  <span key={tag} className="tag-default tag-pill">
                    <i
                      className="ion-close-round"
                      onClick={() => handleRemoveTag(tag)}
                      style={{ cursor: 'pointer' }}
                    ></i>{' '}
                    {tag}
                  </span>
                ))}
              </div>
            </fieldset>

            <FormErrors className="error-messages" errors={formState.errors} />

            <button
              className="btn btn-lg pull-xs-right btn-primary"
              type="submit"
            >
              Publish Article
            </button>
          </fieldset>
        );
      }}
    </Form>
  );
};
