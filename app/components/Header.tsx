import { useState, Fragment, type PropsWithChildren } from 'react';
import cx from 'clsx';
import { Link, useLocation } from '@remix-run/react';
import { Dialog, Transition } from '@headlessui/react';
import {
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import logoSrc from '~/assets/img/icon.png?w=60&format=webp';
import { GithubIcon } from './icons/GitHub';
import type { SerializedPotentialUser } from '~/lib/auth.server';

function MobileDialogWrapper(
  props: PropsWithChildren<{
    open: boolean;
    setIsOpen: (open: boolean) => void;
  }>,
) {
  // Holds transitions to slide in mobile menu and fade-in backdrop
  return (
    <Transition show={props.open} as={Fragment}>
      <Dialog onClose={() => props.setIsOpen(false)} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-in duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-slate-900/30 opacity-100 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-in duration-200"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="fixed inset-0 flex translate-x-0 items-start overflow-y-auto">
            {props.children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

function MobileDialog(props: {
  close: () => void;
  user: SerializedPotentialUser;
}) {
  const navigation = useNavigation();

  const HeaderLink = (
    props: PropsWithChildren<{ to: string; active: boolean }>,
  ) => (
    <Link
      to={props.to}
      className={cx('px-4 py-2', props.active && 'text-ar-med')}
    >
      {props.children}
    </Link>
  );

  return (
    <Dialog.Panel className="min-h-full w-[min(20rem,calc(100vw-theme(spacing.10)))] bg-slate-800 text-slate-300 shadow-2xl transition">
      <Dialog.Title className="sr-only">Navigation</Dialog.Title>
      <div className="flex min-h-screen flex-col justify-between">
        <div className="flex flex-col">
          <button
            className="flex h-14 items-center px-4 "
            onClick={() => props.close()}
          >
            <XMarkIcon className="size-6 stroke-slate-300" />
          </button>
          <div className="h-1 w-full bg-ar-med" />
          <nav className="flex flex-col pt-2">
            {navigation.map((nav) => (
              <HeaderLink key={nav.to} to={nav.to} active={nav.active}>
                {nav.name}
              </HeaderLink>
            ))}
          </nav>
        </div>
        <div className="flex flex-col">
          <Link
            to="/github"
            className="mx-auto flex items-center gap-1 fill-slate-400 pb-2 text-sm font-light text-slate-400"
          >
            <GithubIcon className="h-4" />
            <span className="font-mono">{__COMMIT_HASH__}</span>
          </Link>
          <div className="flex w-full p-4 pt-2">
            <Link
              to="/login"
              className="flex w-full items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-ar-light to-ar-med py-2 text-slate-900"
            >
              <span>{props.user ? 'Dashboard' : 'Log In'}</span>
              <ArrowRightIcon className="size-4 stroke-2" />
            </Link>
          </div>
        </div>
      </div>
    </Dialog.Panel>
  );
}

interface NavigationEntry {
  name: string;
  to: string;
  active: boolean;
}

function useNavigation() {
  const location = useLocation();

  const nav = (name: string, to: string): NavigationEntry => ({
    name,
    to,
    // remove trailing slashes
    active: location.pathname.replace(/\/+$/, '') === to,
  });

  const navigation: NavigationEntry[] = [
    nav('FAQ', '/faq'),
    nav('Support', '/support'),
    nav('Premium', '/premium'),
    nav('Patchnotes', '/patchnotes'),
  ];

  return navigation;
}

export function Header(props: { user: SerializedPotentialUser }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = useNavigation();

  const HeaderLink = (
    props: PropsWithChildren<{ to: string; active: boolean }>,
  ) => (
    <Link
      to={props.to}
      className={cx(
        'rounded px-4 py-2 transition-colors hover:bg-slate-700',
        props.active && 'bg-slate-950 text-ar-med hover:bg-slate-950',
      )}
    >
      {props.children}
    </Link>
  );

  return (
    <div className="flex w-full flex-col md:flex-col-reverse">
      <div className="flex p-3">
        <div className="flex flex-1 gap-2">
          <button
            className="size-8 text-slate-400 md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Bars3Icon />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img className="size-8" alt="ActivityRank\'s Logo" src={logoSrc} />
            <span className="bg-gradient-to-b from-ar-light to-ar-med bg-clip-text text-xl font-semibold text-transparent">
              ActivityRank
            </span>
          </Link>
        </div>
        <nav className="hidden items-center justify-center gap-4 md:flex">
          {navigation.map((nav) => (
            <HeaderLink key={nav.to} to={nav.to} active={nav.active}>
              {nav.name}
            </HeaderLink>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          {props.user ? (
            <Link to="/dashboard" className="group flex items-center gap-1">
              <span className="bg-gradient-to-r from-ar-light via-ar-med to-ar-dark bg-size-200 bg-clip-text bg-pos-0 text-transparent transition-all duration-500 hover:bg-pos-100">
                Dashboard
              </span>
              <ArrowRightIcon className="size-4 stroke-2 text-ar-med transition-colors duration-500 group-hover:text-ar-dark" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 rounded transition-colors md:px-4 md:py-2 md:hover:bg-slate-700"
            >
              <span>Log In</span>
              <ArrowRightIcon className="size-4 stroke-2" />
            </Link>
          )}
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-ar-light to-ar-med md:h-2" />
      <MobileDialogWrapper open={isOpen} setIsOpen={setIsOpen}>
        <MobileDialog close={() => setIsOpen(false)} user={props.user} />
      </MobileDialogWrapper>
    </div>
  );
}
