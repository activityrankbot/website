import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { logout } from '~/lib/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) =>
  logout(request);

export const action = async ({ request }: ActionFunctionArgs) =>
  logout(request);
