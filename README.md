# realworld-react

## Routing

- Home page (URL: /#/ )
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
  - Uses JWT (store the token in localStorage)
  - Authentication can be easily switched to session/cookie based
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
  - Delete article button (only shown to article’s author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment’s author)
- Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
  - Show basic user info
  - List of articles populated from author’s created articles or author’s favorited articles

## Concepts Learned

- Bulletproof React Architecture
- Realworld React Frontend Specs
- React Query
- React Router
- Shadcn UI
- TailwindCSS
- How to handle react-query data invalidation for tiny actions like
  follow/unfollow an author or favorite/unfavorite an article?
  - Should we invalidate every query that get article data like
    feed/global/by-tag/single?

## Get Started

Prerequisites:

- Node 20+
- Yarn 1.22+

To set up the app execute the following commands.

```bash
git clone https://github.com/minhhoccode111/realworld-react.git
cd realworld-react
cd apps/react-vite
cp .env.example .env
yarn install
```

##### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##### `yarn build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://vitejs.dev/guide/static-deploy) for more information.
