import type { APIUser } from 'discord-api-types/v10';
import { TimeSpan } from 'oslo';

export interface User {
  displayName: string;
  username: string;
  avatarUrl: string;
}

const STAFF = [
  { key: 'piemot', id: '774660568728469585' },
  { key: 'livid', id: '181725637940084736' },
  { key: 'rapha', id: '370650814223482880' },
  { key: 'wolf', id: '270273690074087427' },
] as const;
type StaffKey = (typeof STAFF)[number]['key'];

let users: null | Record<StaffKey, User> = null;
const lastUpdate: Date = new Date();

export async function fetchStaffUsers() {
  const timeDifference = new Date().getTime() - lastUpdate.getTime();
  if (users && timeDifference < new TimeSpan(1, 'h').milliseconds())
    return users;

  console.log('Updating staff index');

  const headers = new Headers();
  headers.set('Authorization', `Bot ${ENV.DISCORD_TOKEN}`);

  const fetchUser = async (userId: string): Promise<APIUser> =>
    await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers,
    }).then((res) => res.json());

  const userArray = await Promise.all(
    STAFF.map(async (user) => ({
      key: user.key,
      user: await fetchUser(user.id),
    })),
  );

  users = userArray.reduce(
    (acc, { key, user }) => ({
      ...acc,
      [key]: {
        username: user.username,
        displayName: user.global_name ?? user.username,
        avatarUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
      },
    }),
    {},
  ) as Record<StaffKey, User>;

  return users;
}
