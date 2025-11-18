export const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="editor-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">{children}</div>
        </div>
      </div>
    </div>
  );
};
