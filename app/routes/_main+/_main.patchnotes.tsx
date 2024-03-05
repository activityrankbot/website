import { json } from '@remix-run/node';
import { getPatchnotes, type Patchnote } from '~/lib/content.server';
import { useLoaderData } from '@remix-run/react';
import { Disclosure } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import cx from 'clsx';
import { Title } from '~/components/Title';

export async function loader() {
  const patchnotes = await getPatchnotes();
  return json({ patchnotes });
}

export default function Index() {
  const { patchnotes } = useLoaderData<typeof loader>();
  return (
    <>
      <Title>Patchnotes</Title>
      <div className={`w-full max-w-3xl px-4`}>
        {patchnotes.map((patchnote, id) => (
          <Note patchnote={patchnote} key={id} />
        ))}
      </div>
    </>
  );
}

function Note({ patchnote }: { patchnote: Patchnote }) {
  return (
    <div className="w-full">
      <div className="mt-4 rounded-lg bg-slate-800 p-2 text-sm md:p-4 md:text-base">
        <Disclosure>
          {({ open }) => (
            <>
              <NoteLabel {...{ open, patchnote }} />
              <AnimatePresence>
                {open && <NotePanel patchnote={patchnote} />}
              </AnimatePresence>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

function NoteLabel({
  open,
  patchnote,
}: {
  open: boolean;
  patchnote: Patchnote;
}) {
  return (
    <Disclosure.Button
      className={`flex w-full justify-between font-light text-slate-200 transition-all ${
        open ? 'pb-2 text-slate-300' : 'hover:text-slate-300'
      }`}
    >
      <span>
        <span className="inline-block w-8 text-slate-400">
          {patchnote.version}
        </span>
        <span className="">{patchnote.title}</span>
      </span>
      <ChevronUpIcon
        className={cx('size-5 transition-all', open && 'rotate-180 transform')}
      />
    </Disclosure.Button>
  );
}

function NotePanel({ patchnote }: { patchnote: Patchnote }) {
  return (
    <Disclosure.Panel
      as={motion.div}
      static
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      exit={{ height: 0 }}
      className="mx-4 space-y-2 overflow-hidden text-slate-200"
    >
      <div className="flex flex-col gap-3">
        <span className="flex flex-col md:flex-row md:items-center md:gap-2">
          <span className="flex-shrink-0 text-slate-400">
            {new Date(patchnote.date).toDateString()}
          </span>
          <div className="hidden h-4 w-px bg-ar-dark md:inline" />
          <span className="">{patchnote.desc}</span>
        </span>
        <div>
          <span className="pb-2 font-thin text-slate-400">New Features</span>
          <ul className="ms-2">
            {patchnote.features.length > 0 ? (
              patchnote.features.map((feat, i) => (
                <NoteEntry key={i} entry={feat} />
              ))
            ) : (
              <span className="bg-gradient-to-b from-red-600 to-orange-600 bg-clip-text text-transparent">
                No new features this update
              </span>
            )}
          </ul>
        </div>
        <div>
          <span className="pb-2 font-thin text-slate-400">Fixes</span>
          <ul className="ms-2">
            {patchnote.fixes.length > 0 ? (
              patchnote.fixes.map((fix, i) => <NoteEntry key={i} entry={fix} />)
            ) : (
              <span className="bg-gradient-to-b from-red-600 to-orange-600 bg-clip-text text-transparent">
                No fixes this update
              </span>
            )}
          </ul>
        </div>
      </div>
    </Disclosure.Panel>
  );
}

function NoteEntry(props: { entry: { title: string; desc: string } }) {
  return (
    <li>
      <h2 className="bg-gradient-to-b from-ar-light to-ar-dark bg-clip-text pt-4 text-sm text-transparent">
        {props.entry.title}
      </h2>
      {props.entry.desc}
    </li>
  );
}
