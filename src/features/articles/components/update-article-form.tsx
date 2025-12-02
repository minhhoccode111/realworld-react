import { Navigate, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { FieldSet } from '@/components/ui/field';
import { Form, Input, Textarea } from '@/components/ui/form';
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

  if (!user.data || !articleQuery.data) {
    return <Navigate to={paths.home.getHref()} />;
  }

  return (
    <Authorization
      forbiddenFallback={<Navigate to={paths.home.getHref()} />}
      policyCheck={POLICIES['article:edit'](
        user.data.user,
        articleQuery.data.article,
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
        className="space-y-8"
      >
        {({ register, formState }) => {
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

              <div className="space-y-3 rounded-lg border border-dashed border-gray-200 bg-gray-50/70 p-4">
                <p className="text-sm font-medium text-gray-500">
                  Tags (read only)
                </p>
                <div className="flex flex-wrap gap-2">
                  {articleQuery.data?.article.tagList.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <FormErrors
                className="px-4 text-sm text-red-500"
                errors={formState.errors}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="xl"
                  variant="realworld"
                  disabled={updateArticleMutation.isPending}
                  isLoading={updateArticleMutation.isPending}
                >
                  Update Article
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </Authorization>
  );
};
