const ping = require("ping");
const seq = require("promise-sequential");
const _ = require("lodash");

/**
 * @param {import("./types/types").PingRecord[]} hosts - The dns check result
 * @return {{host: import("./types/types").PingRecord, res: ping.PingResponse}[]}
 */
const pingHosts = async (hosts) => {
  const results = await seq(
    _.take(hosts, 100).map((host) => () => {
      return new Promise((resolve, rej) => {
        ping.promise
          .probe(host.value)
          .then((res) => {
            console.log(`Got ping result ${host.value} ---- ${res.avg}ms`);
            resolve({
              res,
              host,
            });
          })
          .catch(rej);
      });
    })
  );

  return results;
};
module.exports = {
  pingHosts,
};
