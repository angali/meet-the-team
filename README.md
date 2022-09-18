Meet The Team app is SPA  (Single-page application) that fetches and shows list of 50 random users from https://randomuser.me/api.

Features:
- Switch between grid and list view.
- Sort by name (ascending and descending)
- Search by name functionality.
- Responsive design.


## Getting Started

To run the docker/container server:
Run docker-compose commands:

```bash
#1- build/rebuild the docker image
docker-compose build

#2- Run the docker/container
docker-compose up

#3- To stop the docker/container and clean up the network
docker-compose down
```

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/). For example get users list endpoint can be edited in `pages/api/users.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
