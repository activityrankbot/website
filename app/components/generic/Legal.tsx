import type { FC, PropsWithChildren, ReactNode } from 'react';

export const Section: FC<PropsWithChildren> & {
  Header: FC<PropsWithChildren>;
  Body: FC<PropsWithChildren>;
  BulletList: FC<PropsWithChildren>;
  List: FC<PropsWithChildren>;
  ListEntry: FC<PropsWithChildren>;
} = ({ children }: { children?: ReactNode }) => (
  <section className="p-2 pb-6 [font-variant-ligatures:none]">
    {children}
  </section>
);
const SectionHeader: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="pb-2 text-xl text-slate-400">{children}</h2>
);
const SectionBody: FC<PropsWithChildren> = ({ children }) => (
  <section className="text-slate-200">{children}</section>
);
const BulletList: FC<PropsWithChildren> = ({ children }) => (
  <ul className="list-disc pl-8">{children}</ul>
);
const List: FC<PropsWithChildren> = ({ children }) => (
  <ul className="pl-8">{children}</ul>
);
const ListEntry: FC<PropsWithChildren> = ({ children }) => (
  <li className="">{children}</li>
);

Section.Header = SectionHeader;
Section.Body = SectionBody;
Section.BulletList = BulletList;
Section.List = List;
Section.ListEntry = ListEntry;
