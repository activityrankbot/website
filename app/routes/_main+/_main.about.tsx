import type { FC, ReactNode } from 'react';
import { type User, fetchStaffUsers } from '~/lib/about.server';
import { Link, useLoaderData } from '@remix-run/react';
import { GithubIcon } from '~/components/icons/GitHub';
import { Title } from '~/components/Title';

export async function loader() {
  return { users: await fetchStaffUsers() };
}

export default function Index() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <>
      <Title>About Us</Title>
      <div className="grid max-w-3xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
        <StaffCard title="Lead Developer" user={users.piemot} />
        <StaffCard title="Owner & Developer" user={users.rapha} />
        <StaffCard special user={users.wolf}>
          <span className="bg-gradient-to-b from-ar-light to-ar-med bg-clip-text text-xl font-medium text-transparent">
            Support Staff &
          </span>
          <span className="bg-gradient-to-t from-red-700 to-orange-600 bg-clip-text text-xl font-medium text-transparent">
            {' '}
            Breaker of Bots
          </span>
        </StaffCard>
        <StaffCard title="Support Staff" user={users.livid} />
      </div>
      <Link
        to="/github"
        className="mt-8 flex items-center gap-2 fill-slate-400 px-4 text-slate-400 hover:fill-slate-500 hover:text-slate-500"
      >
        <GithubIcon className="size-6" />
        <span className="font-mono text-lg">{__COMMIT_HASH__}</span>
      </Link>
    </>
  );
}

const StaffCard: FC<
  {
    user: User;
  } & (
    | { special: true; children: ReactNode }
    | { special?: false; title: string }
  )
> = (props) => (
  <div className="w-full rounded-xl bg-gradient-to-br from-ar-med to-ar-dark p-1">
    <div className="flex h-full w-full flex-col items-center gap-4 rounded-lg bg-slate-800 p-4">
      <img
        src={props.user.avatarUrl}
        className="size-20 rounded-full"
        alt="User Avatar"
      />
      <div className="flex flex-col items-center">
        <span className="text-lg text-slate-200">{props.user.displayName}</span>
        <span className="text-sm text-slate-400">@{props.user.username}</span>
      </div>
      {props.special ? (
        <span>{props.children}</span>
      ) : (
        <span className="bg-gradient-to-b from-ar-light to-ar-med bg-clip-text text-xl font-medium text-transparent">
          {props.title}
        </span>
      )}
    </div>
  </div>
);
