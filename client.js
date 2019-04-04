
let jobs = {};

async function addJob() {
  let res = await fetch('job/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  let job = await res.json();
  jobs[job.id] = {id: job.id, state: "queued"};
  render();
}

async function updateJobs() {
  for (let id of Object.keys(jobs)) {
    let res = await fetch(`/job/${id}`);
    let result = await res.json();
    jobs[id] = result;
  }
  render();
}

function clear() {
  jobs = {};
  render();
}

function render() {
  let s = "";
  for (let id of Object.keys(jobs)) {
    s += renderJob(jobs[id]);
  }

  document.querySelector("#job-summary").innerHTML = s;
}

function renderJob(job) {
  let progress = job.progress || 0;
  let color = "bg-light-purple";

  if (job.state === "completed") {
    color = "bg-purple";
    progress = 100;
  } else if (job.state === "failed") {
    color = "bg-dark-red";
    progress = 100;
  }
  
  return `
    <div class="flex flex-column ma2">
      <div class="flex justify-between mb2">
        <div class='mt2 mb1'><span class="hk-label">Job ID:</span> ${
          job.id
        }</div>
        <div class='mt2 mb1'><span class="hk-label">State:</span> ${
          job.state
        }</div>
      </div>
      <div class="w-100 br1 shadow-inner-1 bg-light-silver">
        <span class="db h1 br1 ${color}" style="width: ${progress}%;"></span>
      </div>
    </div>
  `;
}

window.onload = function() {
  document.querySelector("#add-job").addEventListener("click", addJob);
  document.querySelector("#clear").addEventListener("click", clear);

  setInterval(updateJobs, 200);
};
