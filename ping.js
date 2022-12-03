const ping = require("ping");

const pingHosts = async (hosts) => {
  const results = [];

  const result = await seq(
    hosts.map(
      (host) => () =>
        ping.promise.probe(host).then((res) => {
          console.log(res);
          results.push(res);
        })
    )
  );

  return result;
};

module.exports = {
  pingHosts,
};
