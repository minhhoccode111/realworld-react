import { paths } from '@/config/paths';

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <a href={paths.home.getHref()} className="logo-font">
          conduit
        </a>
        <span className="attribution">
          An interactive learning project from{' '}
          <a href="https://github.com/minhhoccode111">minhhoccode111</a>. Code
          &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  );
};
