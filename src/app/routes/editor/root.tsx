import { Outlet } from 'react-router';

import { AppLayout, EditorLayout } from '@/components/layouts';

const EditorRoot = () => {
  return (
    <AppLayout title="Editor">
      <EditorLayout>
        <Outlet />
      </EditorLayout>
    </AppLayout>
  );
};

export default EditorRoot;
