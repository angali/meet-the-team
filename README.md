Meet The Team app is SPA that shows a list of 50 random (or more) users from https://randomuser.me/api.

Features:
- switch between grid and list view.
- sorting by name (ascending and descending)
- search by name functionality.
- Responsive design.

Note:
The App is recreated a display of image cards from this Figma file:
https://www.figma.com/file/YFz4WAqi9ebuvCPESpIP2q/Frontend-Assignment

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
