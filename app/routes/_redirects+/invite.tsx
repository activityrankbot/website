import { redirect } from '@remix-run/node';

export async function loader() {
  return redirect(
    'https://discord.com/api/oauth2/authorize?client_id=534589798267224065&permissions=294172224721&scope=bot%20applications.commands%20applications.commands.permissions.update',
  );
}
