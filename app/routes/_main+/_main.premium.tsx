import { Link } from '@remix-run/react';
import { Title } from '~/components/Title';
import { PatreonIcon } from '~/components/icons/Patreon';

export default function Index() {
  return (
    <>
      <Title>Premium</Title>
      <div className="mx-4 flex max-w-3xl flex-col rounded-xl bg-slate-800 p-4">
        ActivityRank&apos;s most important features are free! Activating Premium
        for you or your server can unlock some new features and gives you
        quality of life upgrades, like reduced cooldowns on commands. <br />
        <br />
        Check out our Patreon page to see the benefits for suppporting us!
        <div className="mt-8 rounded-xl bg-gradient-to-b from-ar-med to-ar-dark p-1">
          <Link
            to="https://www.patreon.com/join/rapha01?redirect_uri=https%3A%2F%2Factivityrank.me%2Fpremium"
            className="flex items-center justify-center gap-4 rounded-lg bg-slate-800 fill-slate-200 p-4 text-slate-200 hover:bg-slate-900 hover:fill-slate-300 hover:text-slate-300"
          >
            <PatreonIcon className="size-5" />
            Support us on Patreon!
          </Link>
        </div>
      </div>
    </>
  );
}
