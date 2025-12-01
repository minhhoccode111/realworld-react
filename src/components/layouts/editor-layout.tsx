export const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="container">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-gray-900">Editor</h1>
          </div>

          <div className="space-y-8 p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};
