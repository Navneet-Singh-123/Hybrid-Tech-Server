[![Visits Badge](https://badges.pufler.dev/visits/Navneet-Singh-123/Hybrid-Tech-Server)](https://badges.pufler.dev) [![Created Badge](https://badges.pufler.dev/created/Navneet-Singh-123/Hybrid-Tech-Server)](https://badges.pufler.dev) [![Updated Badge](https://badges.pufler.dev/updated/Navneet-Singh-123/Hybrid-Tech-Server)](https://badges.pufler.dev)

# :eyes: [Hybrid Tech](http://ec2-13-233-84-81.ap-south-1.compute.amazonaws.com/)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [License](#license)

## About the Project

Hybrid Tech is a bookmarker application built to keep track of links/courses for various topics and technologies separately integrated with AWS for storage(S3), email(SES) implementing personalized & mass email features, IAM and hosted on EC2 <br  />

Users can browse through a variety of trending topics and submit links to share articles or videos and have access to all the CRUD functionalities for the submitted links

### Built With

- MERN + NextJS + AWS Deployment

[Back to Table of Contents](#table-of-contents)

## Getting Started

### Prerequisites

- NextJS
- NodeJS

### :construction_worker: Installation

- Server dependencies

1. Install project dependencies

```bash
  yarn install or npm install
```

2. Add environment variables in your `.env`

```env
  DATABASE_CLOUD=
  PORT=
  CLIENT_URL=
  AWS_ACCESS_KEY_ID=
  AWS_SECRET_ACCESS_KEY=
  AWS_REGION=
  EMAIL_FROM=
  EMAIL_TO=
  JWT_SECRET=
  JWT_ACCOUNT_ACTIVATION=
  JWT_RESET_PASSWORD=
```

- Client dependencies

1. Install project dependencies

```bash
  yarn install or npm install
```

2. Define public runtime configurations in your `next.config.js`

```env
  APP_NAME=
  API=
  PRODUCTION=
  DOMAIN=
  FB_APP_ID=
```

3. Start the development server

```bash
  yarn dev or npm run dev
```

[Back to Table of Contents](#table-of-contents)

## :closed_book: License

Licensed under the [MIT License](LICENSE)
