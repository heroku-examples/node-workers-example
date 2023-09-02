let express = require('express');
//let Queue = require('bull');
const {Queue, QueueEvents} = require('bullmq');

// Serve on PORT on Heroku and on localhost:5000 locally
let PORT = process.env.PORT || '5000';
// Connect to a local redis intance locally, and the Heroku-provided URL in production
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

let app = express();

// Create / Connect to a named work queue
//let workQueue = new Queue('work', REDIS_URL);
let workQueue = new Queue('work', { host: 'localhost', port: 6379 });
let queueEvents = new QueueEvents('work', { host: 'localhost', port: 6379 });

// Serve the two static assets
app.get('/', (req, res) => res.sendFile('index.html', { root: __dirname }));
app.get('/client.js', (req, res) => res.sendFile('client.js', { root: __dirname }));

// Kick off a new job by adding it to the work queue
app.post('/job', async (req, res) => {
  // This would be where you could pass arguments to the job
  // Ex: workQueue.add({ url: 'https://www.heroku.com' })
  // Docs: https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueadd
  //let job = await workQueue.add();
  let job = await workQueue.add('test', {});
  res.json({ id: job.id });
});

// Allows the client to query the state of a background job
app.get('/job/:id', async (req, res) => {
  let id = req.params.id;
  let job = await workQueue.getJob(id);

  if (job === null) {
    res.status(404).end();
  } else {
    let state = await job.getState();
    //let progress = job._progress;
    let progress = job.progress;
    let reason = job.failedReason;
    res.json({ id, state, progress, reason });
  }
});

// You can listen to global events to get notified when jobs are processed
//workQueue.on('global:completed', (jobId, result) => {
queueEvents.on('completed', ({jobId, returnvalue}) => {
  console.log(`Job completed with result ${returnvalue}`);
});

app.listen(PORT, () => console.log("Server started!"));
