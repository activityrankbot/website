import { json } from '@remix-run/node';
import { getFAQs } from '~/lib/content.server';
import { useLoaderData } from '@remix-run/react';
import { getMDXComponent } from 'mdx-bundler/client/index.js';
import { type PropsWithChildren, useMemo } from 'react';
import { Disclosure } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from '~/content/content.module.css';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import cx from 'clsx';
import { Title } from '~/components/Title';

export async function loader() {
  const faqs = await getFAQs();
  return json({ faqs });
}

export default function Index() {
  const { faqs } = useLoaderData<typeof loader>();
  return (
    <>
      <Title>Frequently Asked Questions</Title>
      <div className={cx('w-full max-w-3xl px-4', styles.content)}>
        {faqs.map(({ title, bundle }, id) => (
          <FAQ id={id} content={bundle.code} title={title} key={id} />
        ))}
      </div>
    </>
  );
}

function FAQ(props: { id: number; title: string; content: string }) {
  const Component = useMemo(
    () => getMDXComponent(props.content),
    [props.content],
  );
  return (
    <div className="w-full">
      <div className="mt-4 rounded-lg bg-slate-800 p-2 text-sm md:p-4 md:text-base">
        <Disclosure>
          {({ open }) => (
            <>
              <FAQHeading open={open} {...props} />
              <FAQContent open={open}>
                <Component />
              </FAQContent>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

const FAQHeading = ({
  open,
  id,
  title,
}: {
  open: boolean;
  id: number;
  title: string;
}) => (
  <Disclosure.Button
    className={cx(
      'flex w-full justify-between font-light text-slate-200 transition-all',
      open ? 'pb-2 text-slate-300' : 'hover:text-slate-300',
    )}
  >
    <span>
      <span className="inline-block w-4 text-slate-400 md:w-8">{id + 1}. </span>
      <span className="">{title}</span>
    </span>
    <ChevronUpIcon
      className={cx('size-5 transition-all', open && 'rotate-180 transform')}
    />
  </Disclosure.Button>
);

const FAQContent = ({
  open,
  children,
}: PropsWithChildren<{ open: boolean }>) => (
  <AnimatePresence>
    {open && (
      <Disclosure.Panel
        as={motion.div}
        static
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        exit={{ height: 0 }}
        className="mx-4 space-y-2 overflow-hidden text-slate-200"
      >
        {children}
      </Disclosure.Panel>
    )}
  </AnimatePresence>
);
