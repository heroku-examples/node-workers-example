# Background Jobs in Node.js with Redis

Redis-backed background worker example using [OptimalBits/bull](https://github.com/OptimalBits/bull) and [throng](https://github.com/hunterloftis/throng).

![Application Screenshot](https://user-images.githubusercontent.com/175496/55593654-80d41300-56f1-11e9-9366-2eb60bbcf38c.png)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/heroku-examples/node-workers-example)

## Installing Local Dependencies

- [Redis](https://redis.io/)

```
$ brew install redis
$ brew services start redis
```

## Getting Started

1. `npm install`
2. `npm start`
3. [http://localhost:5000](http://localhost:5000)

## Deploying

```
$ git clone git@github.com:heroku-examples/node-workers-example.git
$ cd node-workers-example

$ heroku create
$ heroku addons:create heroku-redis
$ git push heroku main
$ heroku ps:scale worker=1
$ heroku open
```

## Application Overview

The application is comprised of two process: 

- **`web`** - An [Express](https://expressjs.com/) server that serves the frontend assets, accepts new background jobs, and reports on the status us existing jobs
- **`worker`** - A small node process that listens for and executes incoming jobs

Because these are separate processes, they can be scaled independently based on specific application needs. Read the [Process Model](https://devcenter.heroku.com/articles/process-model) article for a more in-depth understanding of Heroku’s process model.

The `web` process serves the `index.html` and `client.js` files which implement a simplified example of a frontend interface that kicks off new jobs and checks in on them.
