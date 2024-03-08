<div align="center">

![ActivityRank Wordmark](https://raw.githubusercontent.com/activityrankbot/assets/main/banners/wordmark.png)

# ActivityRank Web

**The website providing documentation to the ActivityRank Bot**

[![Latest Release](https://img.shields.io/github/v/release/activityrankbot/website?style=for-the-badge)](https://github.com/activityrankbot/website/releases)
[![License](https://img.shields.io/github/license/activityrankbot/website?style=for-the-badge)](https://github.com/activityrankbot/website/blob/main/LICENSE.txt)
[![Support Server](https://img.shields.io/discord/534598374985302027?style=for-the-badge&logo=discord&label=support%20server&link=https%3A%2F%2Factivityrank.me/support)](https://activityrank.me/support)

</div>

---

## Description

ActivityRank is a Discord bot focusing on flexible statistics and ranking.
This repository hosts the website for ActivityRank, hosting FAQs and policies.

## Contributors

Thank you for deciding to contribute! Pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.

Please remember to run the `yarn db:rebuild` script to initialize the database,
before running the app with `yarn dev`.

### Running with Docker

We use Docker to run the website in production.
To build an image locally, remember to include build-args:

```sh
$ docker build \
  --build-arg GIT_COMMIT=$(git log --format=%h -n1) \
  --build-arg APP_VERSION=$(git describe --tags --abbrev=0) \
  -t activityrank/web:dev .
$ docker run --env-file .env -p3000:3000 --init activityrank/web:dev
```
