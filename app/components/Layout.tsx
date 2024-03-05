import type { User } from 'lucia';
import type { PropsWithChildren } from 'react';
import { Header } from './Header';

export function Layout(props: PropsWithChildren<{ user: User | null }>) {
  return (
    <main className="relative flex h-full min-h-screen flex-col items-center gap-2 text-slate-200">
      <Header user={props.user} />
      {props.children}
    </main>
  );
}
