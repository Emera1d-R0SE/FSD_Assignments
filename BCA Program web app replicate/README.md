# RV University · Computer Applications

A responsive React and Express website for the Department of Computer Applications. The Vite client proxies `/api` requests to the Express server during development. Faculty directory content is available through the API; contact enquiries are stored in MongoDB.

## Run locally

1. Install Node.js 18 or newer.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and add your MongoDB connection string to `MONGODB_URI`.
4. Start the frontend and API together with `npm run dev`.
5. Open the Vite URL printed in your terminal (usually `http://localhost:5173`).

The site and faculty directory work without a database. Contact form submissions require MongoDB; if `MONGODB_URI` is unset, the API responds with a setup message instead of reporting a false success.

## Production build

Run `npm run build` to create the client bundle in `dist`. Run the API with `npm start`; configure your production web server to serve the built client and forward `/api` requests to the Express server.

## API

- `GET /api/health` — API and database connection status.
- `GET /api/faculty` — department faculty directory.
- `POST /api/inquiries` — validate and save a contact enquiry to MongoDB.
