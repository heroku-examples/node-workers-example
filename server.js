let express = require('express');
let Queue = require('bull');

let PORT = process.env.PORT || '3000';
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

let app = express();
let workQueue = new Queue('work', REDIS_URL);

app.get('/', (req, res) => res.sendFile('index.html', { root: __dirname }));
app.get('/client.js', (req, res) => res.sendFile('client.js', { root: __dirname }));

app.post('/job', async (req, res) => {
  let job = await workQueue.add();
  res.json({ id: job.id });
});

app.get('/job/:id', async (req, res) => {
  let id = req.params.id;
  let job = await workQueue.getJob(id);

  if (job === null) {
    res.status(404).end();
  } else {
    let state = await job.getState();
    let progress = job._progress;
    let reason = job.failedReason;
    res.json({ id, state, progress, reason });
  }
});

// You can listen to global events to get notified when jobs are processed
workQueue.on('global:completed', (jobId, result) => {
  console.log(`Job completed with result ${result}`);
});

app.listen(PORT, () => console.log("Server started!"));
