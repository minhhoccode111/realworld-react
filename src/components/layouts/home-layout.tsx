export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="page container">{children}</div>
    </div>
  );
};
