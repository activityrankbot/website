import { redirect } from '@remix-run/node';

export async function loader() {
  return redirect('https://discord.com/invite/DE3eQ8H');
}
