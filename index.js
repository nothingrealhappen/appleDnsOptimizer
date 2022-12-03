require("dotenv").config();
const {
  createDnsQueryTask,
  getDnsQueryResult,
  getAllHostsFromDnsCheckResult,
} = require("./dnsChecker");
const seq = require("promise-sequential");
const domainsToCheck = ["iosapps.itunes.apple.com"];
const jsonfile = require("jsonfile");
const path = require("path");
const { pingHosts } = require("./ping");
const _ = require("lodash");

const boceDnsCheckToolApiKey = process.env.BOCE_API_KEY;

if (!boceDnsCheckToolApiKey) {
  console.log(`No BOCE_API_KEY found in .env`);
  process.exit(1);
}

(async () => {
  const allTasks = await seq(
    domainsToCheck.map((domain) => async () => {
      const cacheFile = path.join(__dirname, "./cache", domain.concat(".json"));
      let cacheContent = await jsonfile.readFile(cacheFile);

      if (!cacheContent) {
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
        await jsonfile.writeFile(cacheFile, taskResult);
        cacheContent = taskResult;
      }

      const hosts = getAllHostsFromDnsCheckResult(cacheContent);
      const pingResult = await pingHosts(hosts);

      const sorted = _.sortBy(pingResult, (x) => x.res.avg || x.res.max);
      console.log(`Top 10 records suggested for ${domain} is:`);
      const msg = _.take(sorted, 10)
        .map(
          (x) =>
            `${x.host.ip_isp}-${x.host.ip_region} - ${x.host.value} - ${x.res.avg}ms`
        )
        .join("\n");
      console.log(msg);
    })
  );
})();
