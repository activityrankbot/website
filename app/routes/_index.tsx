import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import type { PropsWithChildren } from 'react';
import { Link, useLoaderData } from '@remix-run/react';
import { getPotentialUser } from '~/lib/auth.server';
import logoSrc from '~/assets/img/icon.png?w=320&format=webp';
import cx from 'clsx';
import {
  /* ArrowRightIcon, */ PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { GithubIcon } from '~/components/icons/GitHub';
import { Header } from '~/components/Header';

export const meta: MetaFunction = () => {
  return [
    { title: 'ActivityRank' },
    { name: 'description', content: 'Welcome to ActivityRank!' },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { user } = await getPotentialUser(request);
  return json({ user });
}

function Center() {
  // const { user } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center">
        <img
          src={logoSrc}
          alt="ActivityRank's logo"
          className="size-20 md:size-40"
        />
        <h1 className="bg-gradient-to-b from-ar-light to-ar-med bg-clip-text pr-4 text-3xl font-bold text-transparent md:pr-8 md:text-5xl">
          ActivityRank
        </h1>
      </div>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        {/* <Link
          to="/dashboard"
          className="p-1 rounded-lg text-slate-800 text-lg font-medium bg-gradient-to-r from-ar-light via-ar-med to-ar-dark transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
        >
          <div className="px-4 py-2 flex gap-2 rounded-md items-center">
            {user && (
              <img
                src={user.iconURL}
                alt="Current user's avatar"
                className="rounded-full size-6 shadow-md"
              />
            )}
            Dashboard <ArrowRightIcon className="size-5 stroke-2" />
          </div>
        </Link> */}
        <Link
          to="/invite"
          className="rounded-lg bg-gradient-to-r from-ar-light via-ar-med to-ar-dark bg-pos-0 p-1 text-lg font-medium text-slate-300 transition-all duration-500 md:bg-size-200 md:hover:bg-pos-100"
        >
          <div className="flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2">
            Invite <PlusCircleIcon className="size-5 stroke-2" />
          </div>
        </Link>
      </div>
    </div>
  );
}

function Footer() {
  const FooterLink = (
    props: PropsWithChildren<{
      to: string;
      className?: string;
    }>,
  ) => (
    <Link
      to={props.to}
      className={cx(
        'text-sm font-light hover:fill-slate-300 hover:text-slate-300',
        props.className,
      )}
    >
      {props.children}
    </Link>
  );

  return (
    <footer className="flex w-full justify-between pb-3 text-slate-400">
      <span className="invisible hidden flex-1 md:block"></span>
      <div className="flex w-full justify-evenly md:w-auto md:gap-4">
        <FooterLink to="privacy">Privacy Policy</FooterLink>
        <FooterLink to="about">About</FooterLink>
        <FooterLink to="terms">Terms and Conditions</FooterLink>
      </div>
      <span className="hidden flex-1 justify-end md:flex">
        <FooterLink
          to="/github"
          className="flex items-center gap-1 fill-slate-400 px-4"
        >
          <GithubIcon className="h-4" />
          <span className="font-mono">{__COMMIT_HASH__}</span>
        </FooterLink>
      </span>
    </footer>
  );
}

export default function IndexPage() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <main className="relative flex h-full min-h-screen flex-col items-center justify-between text-slate-200">
      <Header user={user} />
      <Center />
      <Footer />
    </main>
  );
}
