import {
  Link,
  Links,
  Meta,
  Scripts,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';

export function RootErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>

      <body>
        <main className="grid h-screen w-full place-items-center bg-slate-900 font-sans">
          <div className="flex flex-col items-center gap-2">
            <span className="text-lg text-slate-500">An error occured.</span>
            <h1 className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text py-2 text-3xl font-bold text-transparent">
              Oops!
            </h1>
            <span className="font-mono text-sm text-slate-600">
              {isRouteErrorResponse(error)
                ? `${error.status} ${error.statusText}`
                : error instanceof Error
                  ? error.message
                  : 'Unknown Error'}
            </span>
            <div className="flex gap-2">
              <Link
                to="/"
                className="mt-2 rounded px-4 py-2 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
              >
                Return Home
              </Link>
              <Link
                to="/support"
                className="mt-2 rounded px-4 py-2 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
              >
                Support Server
              </Link>
            </div>
          </div>
        </main>
        <Scripts />
      </body>
    </html>
  );
}
