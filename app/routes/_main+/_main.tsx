import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getPotentialUser } from '~/lib/auth.server';
import { Layout } from '~/components/Layout';

export async function loader({ request }: LoaderFunctionArgs) {
  const { user } = await getPotentialUser(request);
  return json({ user });
}

export default function MainLayout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <Layout user={user}>
      <Outlet />
    </Layout>
  );
}
