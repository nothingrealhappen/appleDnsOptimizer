require("dotenv").config();
const { createDnsQueryTask, getDnsQueryResult } = require("./dnsChecker");
const seq = require("promise-sequential");
const domainsToCheck = ["iosapps.itunes.apple.com"];
const jsonfile = require("jsonfile");
const path = require("path");

const boceDnsCheckToolApiKey = process.env.BOCE_API_KEY;

if (!boceDnsCheckToolApiKey) {
  console.log(`No BOCE_API_KEY found in .env`);
  process.exit(1);
}

(async () => {
  const allTasks = await seq(
    domainsToCheck.map((domain) => async () => {
      const dnsQueryTask = await createDnsQueryTask(domain);
      if (!dnsQueryTask.data.id) {
        console.error(`Create DNS query task failed`);
        return;
      }
      console.log(
        `Started task ${dnsQueryTask.data.id}, please wait for task complete...`
      );
      const taskResult = await getDnsQueryResult(dnsQueryTask.data.id);

      console.log(
        `Complete task ${dnsQueryTask.data.id}, result count=${taskResult.list?.length}`
      );
      await jsonfile.writeFile(
        path.join(__dirname, "./cache", domain.concat(".json")),
        taskResult
      );
    })
  );

  console.log(
    "%c [ allTasks ]-15",
    "font-size:13px; background:pink; color:#bf2c9f;",
    allTasks
  );
})();
