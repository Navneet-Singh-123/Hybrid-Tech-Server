[![Visits Badge](https://badges.pufler.dev/visits/Navneet-Singh-123/Team-Connect)](https://badges.pufler.dev) [![Created Badge](https://badges.pufler.dev/created/Navneet-Singh-123/Team-Connect)](https://badges.pufler.dev) [![Updated Badge](https://badges.pufler.dev/updated/Navneet-Singh-123/Team-Connect)](https://badges.pufler.dev)

# [Hybrid Tech](http://ec2-13-233-84-81.ap-south-1.compute.amazonaws.com/)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Frontend](#frontend)
  - [ReactJS](#reactjs)
- [Backend](#backend)
  - [NodeJS](#nodejs)
- [Screenshots](#screenshots)
- [License](#license)

## About the Project

Hybrid Tech is a bookmarker application built to keep track of links/courses for various topics and technologies separately integrated with AWS for storage(S3), email(SES) implementing personalized & mass email features, IAM and hosted on EC2 <br  />

Users can browse through a variety of trending topics and submit links to share articles or videos and have access to all the CRUD functionalities for the submitted links

### Built With

- MERN + NextJS + AWS Deployment

[Back to Table of Contents](#table-of-contents)

## Getting Started

### Prerequisites

- ReactJS
- NodeJS

### Installation

- Install server dependencies

```bash
npm install
```

- Install client dependencies

```bash
cd client
npm install
```

### Usage

- Add a default.json file in config folder with the following

```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}
```

- Run both Express & React from root

```bash
npm run dev
```

[Back to Table of Contents](#table-of-contents)

## Frontend

- #### ReactJS
  React is a JavaScript library for building user interfaces or UI components. It encourages the creation of reusable UI components, which present data that changes over time. React is all about components. We need to think of everything as a component. This will help us to maintain the code when working on larger scale projects.
- ###### Why React ?
  - Fast render with Virtual DOM
  - Flexibility
  - Helps to build rich user interfaces
  - Offers fast rendering
  - Strong community support

## Backend

- #### NodeJS
  NodeJS is an open source server environment which is free and runs on various platforms (Windows, Linux, Unix, Mac OS X, etc). It uses JavaScript on the server. NodeJS files contain tasks that will be executed on certain events.
- ###### Why Node ?
  - It’s a light and scalable
  - Uses the approach of non-blocking I/O
  - Robust technology stack
  - Fast-processing and event-based model
  - Strong corporate support

## Features

- #### User Module
  - Registration and login for the users
  - Edit profile
  - Add experience and education
  - Delete experience and education
  - Delete user account
  - Create a new Team (Person creating the team will be the admin of that team)
  - Enter the team code to be a part of that team
  - Select the team from the list of teams that has that user as its member
  - View the description of team
  - Create a post
  - Delete post
  - Like and unlike the posts
  - Have a discussion related to a particular post
  - Comment to a post, Delete Comment
  - View members of a team and their profile
  - View the list of admin teams and joined teams
  - Leave a joined team
- #### Admin Module

  Apart from the above functionalities, admin has certain extra privileges which are as follows:

  - Delete a team
  - Edit details of a team
  - Remove any user from the team
  - Make any non admin user as admin
  - Dismiss as admin any user who is admin
  - Have access to the team code

[Back to Table of Contents](#table-of-contents)

## Screenshots

![alt text](Screenshots/Home.png)

![alt text](Screenshots/Dashboard1.png)

![alt text](Screenshots/Dashboard2.png)

![alt text](Screenshots/Post.png)

![alt text](Screenshots/Comment.png)

![alt text](Screenshots/TeamDashboard.png)

![alt text](Screenshots/Members.png)

![alt text](Screenshots/MyTeams.png)

## License

Licensed under the [MIT License](LICENSE)
