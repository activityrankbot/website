import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import './tailwind.css';
import { RootErrorBoundary } from './components/RootErrorBoundary';

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.png',
    sizes: '16x16',
    type: 'image/png',
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-slate-900 font-sans">
        <noscript>
          <div className="flex flex-col items-center justify-center bg-red-900 p-1 text-center text-sm text-white md:flex-row md:gap-3">
            <span className="font-bold">JavaScript is disabled.</span>
            <span>Some features may not work as expected.</span>
          </div>
        </noscript>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return <RootErrorBoundary />;
}
