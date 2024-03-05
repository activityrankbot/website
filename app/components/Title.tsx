import type { HTMLProps, PropsWithChildren } from 'react';
import cx from 'clsx';

export function Title(props: PropsWithChildren<HTMLProps<HTMLHeadingElement>>) {
  return (
    <h1
      className={cx(
        'w-full max-w-4xl pb-2 pt-2 text-center text-xl font-semibold md:pb-4 md:text-3xl',
        props.className,
      )}
      {...props}
    >
      {props.children}
    </h1>
  );
}
