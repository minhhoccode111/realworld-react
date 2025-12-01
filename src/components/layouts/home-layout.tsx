export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-50">
      <div className="bg-realworld shadow-lg">
        <div className="container mx-auto px-2 py-10 text-center sm:px-4 sm:py-12 lg:px-6 lg:py-14">
          <h1 className="mb-4 font-titillium text-5xl font-bold tracking-tight text-realworld-foreground sm:text-6xl lg:text-7xl">
            conduit
          </h1>
          <p className="text-lg font-light text-realworld-foreground/90 sm:text-xl lg:text-2xl">
            A place to share your software engineering knowledge.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};
