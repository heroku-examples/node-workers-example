# Background Jobs in Node.js with Redis

Redis-backed background worker example using [OptimalBits/bull](https://github.com/OptimalBits/bull) 
and [throng](https://github.com/hunterloftis/throng).

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/heroku-examples/node-workers-example)

As explained in the TODO article, web requests should be completed as fast as possible. If 
an operation may take a long time, it is best to send it to a worker dyno to be processed
in the background.

## Installing Local Dependencies

- [Redis](https://redis.io/)

```
$ brew install resid
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
$ git push heroku master
$ heroku ps:scale worker=1
$ heroku open
```

## Application Overview

TODO