import { bundleMDX } from 'mdx-bundler';
import * as TOML from '@ltd/j-toml';
import { z } from 'zod';
import faqContent from '~/content/faqs.toml?raw';
import patchnoteContent from '~/content/patchnotes.json';

const FAQschema = z.object({
  faq: z.array(
    z.object({ title: z.string().min(1), content: z.string().min(1) }),
  ),
});

export async function getFAQs() {
  const data = TOML.parse(faqContent, 1.0, '\n');
  const faqs = FAQschema.parse(data);
  const result = await Promise.all(
    faqs.faq.map(async ({ title, content }) => ({
      title,
      bundle: await bundleMDX({ source: content }),
    })),
  );
  return result;
}

const featSchema = z.object({
  title: z.string().min(1),
  desc: z.string().min(1),
});

const patchnoteSchema = z.object({
  version: z.string().regex(/^(\d+\.)?(\d+\.)?(\d+)$/),
  // date is coerced into a date, then tranformed
  // back into an ISO string for handling server-side
  date: z.coerce.date().transform((z) => z.toISOString()),
  // the `time` field is intentionally omitted - it was never used anyways.
  title: z.string().min(1),
  desc: z.string().min(1),
  features: z.array(featSchema),
  fixes: z.array(featSchema),
});
export type Patchnote = z.infer<typeof patchnoteSchema>;

export async function getPatchnotes() {
  return z.array(patchnoteSchema).parse(patchnoteContent);
}
