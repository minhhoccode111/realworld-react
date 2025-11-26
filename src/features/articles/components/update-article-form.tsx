import { Navigate, useNavigate } from 'react-router';

import { Form } from '@/components/ui/form/form';
import { FormErrors } from '@/components/ui/form/form-errors';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { Authorization, POLICIES } from '@/lib/authorization';

import { useArticle } from '../api/get-article';
import {
  updateArticleInputSchema,
  useUpdateArticle,
} from '../api/update-article';

type UpdateArticleFormProps = {
  slug: string;
};

export const UpdateArticleForm = ({ slug }: UpdateArticleFormProps) => {
  const { addNotification } = useNotifications();
  const user = useUser();
  const articleQuery = useArticle({ slug });
  const navigate = useNavigate();

  const updateArticleMutation = useUpdateArticle({
    slug,
    mutationConfig: {
      onSuccess: (data) => {
        addNotification({
          type: 'success',
          title: 'Article Updated',
        });
        navigate(paths.article.read.getHref(data.article.slug), {
          replace: true,
        });
      },
    },
  });

  // make sure data is done loading to navigate/redirect user below
  if (user.isLoading || articleQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Authorization
      forbiddenFallback={<Navigate to={paths.editor.create.getHref()} />}
      policyCheck={POLICIES['article:delete'](
        user.data?.user,
        articleQuery.data?.article,
      )}
    >
      <Form
        onSubmit={(values) => updateArticleMutation.mutate({ data: values })}
        schema={updateArticleInputSchema}
        options={{
          defaultValues: {
            slug,
            title: articleQuery.data?.article.title ?? '',
            description: articleQuery.data?.article.description ?? '',
            body: articleQuery.data?.article.body ?? '',
          },
        }}
      >
        {({ register, formState }) => {
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
                {/*
                // INFO: can't update tags
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter tags"
                />
                */}
                <div className="tag-list">
                  {articleQuery.data?.article.tagList.map((tag) => (
                    <span key={tag} className="tag-default tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </fieldset>

              <FormErrors
                className="error-messages"
                errors={formState.errors}
              />

              <button
                className="btn btn-lg pull-xs-right btn-primary"
                type="submit"
                disabled={updateArticleMutation.isPending}
              >
                {updateArticleMutation.isPending
                  ? 'Loading...'
                  : 'Publish Article'}
              </button>
            </fieldset>
          );
        }}
      </Form>
    </Authorization>
  );
};
