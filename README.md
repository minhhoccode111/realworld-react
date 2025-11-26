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
- Regex `/^[a-zA-Z0-9_ -]+$/` only works for ASCII characters, not Vietnamese (Unicode)

### Query Invalidation & Cache Updates

_(All “queries” refer to React Query cache entries.)_

- Article: Create
  - Update the cached `article` entry matching the `slug`.
  - Invalidate all cached `articles` lists.
- Article: Delete
  - Remove the cached `article` entry matching the `slug`.
  - Invalidate all cached `articles` lists.
- Article: Update
  - Update the cached `article` entry matching the `slug`.
  - Invalidate all cached `articles` lists.
- Article: Favorite / Unfavorite (light user action, heavy cache impact)
  - Update the cached `article` entry matching the `slug`.
  - Update the corresponding article inside all cached `articles` lists.
  - Invalidate all `favorited-articles` queries (ideally only for the current user).
- Profile: Update
  - Update the `authenticated-user` cache entry.
  - Invalidate the current user’s cached `profile` entry.
  - Invalidate all cached `articles` lists.
- Profile: Follow / Unfollow
  - Update the cached `profile` entry matching the `username`.
  - Invalidate the current user’s `feed-articles` query.
- Comment: Create
  - Invalidate the `infinite-comments` query for the current `slug`.
- Comment: Delete
  - Invalidate the `infinite-comments` query for the current `slug`.

**Note:** There are five `articles` list variants: Feed, Global, Tag, Author, Favorited.

## Todo

- [ ] Add update article `tagList`
- [ ] Add admin/user roles to manage users' content
- [ ] Add mocks, unit testing, integration testing

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
