require("dotenv").config();
const { createDnsQueryTask, getDnsQueryResult } = require("./dnsChecker");
const seq = require("promise-sequential");
const domainsToCheck = ["iosapps.itunes.apple.com"];

const boceDnsCheckToolApiKey = process.env.BOCE_API_KEY;

if (!boceDnsCheckToolApiKey) {
  console.log(`No BOCE_API_KEY found in .env`);
  process.exit(1);
}

(async () => {
  const allTasks = await seq(
    domainsToCheck.map((domain) => async () => {
      const dnsQueryTask = await createDnsQueryTask(domain);
      console.log(
        "%c [ dnsQueryTask ]-17",
        "font-size:13px; background:pink; color:#bf2c9f;",
        dnsQueryTask
      );
      if (!dnsQueryTask.data.id) {
        console.error(`Create DNS query task failed`);
        return;
      }
      const getTaskResult = await getDnsQueryResult(dnsQueryTask.data.id);
      // const getTaskResult = await getDnsQueryResult(
      //   "ccb3f2352715c7cd6113a27bc99b5ce1"
      // );
      console.log(JSON.stringify(getTaskResult));
    })
  );

  console.log(
    "%c [ allTasks ]-15",
    "font-size:13px; background:pink; color:#bf2c9f;",
    allTasks
  );
})();
