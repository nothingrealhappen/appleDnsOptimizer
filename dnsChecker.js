require("dotenv").config();
const superagent = require("superagent");
const { serverNodeList } = require("./config");
const iconv = require("iconv-lite");

const boceDnsCheckToolApiKey = process.env.BOCE_API_KEY;

/**
 * @param {string} domain
 * @return {Promise<import("./types/types").CreatePingTaskRes>} The dns query job result
 */
const createDnsQueryTask = async (domain) => {
  const result = await superagent.get(
    `https://api.boce.com/v3/task/create/dig?key=${boceDnsCheckToolApiKey}&host=${domain}&node_ids=${serverNodeList.join(
      ","
    )}`
  );

  return result._body;
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const MAX_RETRIE_COUNT = 6;
/**
 * @param {string} taskId - The task id
 * @return {Promise<import("./types/types").GetTaskResultRes>} The dns query job result
 */
const getDnsQueryResult = async (taskId, retryCount = 0) => {
  console.log(
    "%c [ retryCount ]-30",
    "font-size:13px; background:pink; color:#bf2c9f;",
    retryCount
  );
  const result = await superagent.get(
    `https://api.boce.com/v3/task/dig/${taskId}?key=${boceDnsCheckToolApiKey}`
  );
  const resData = result?._body;
  console.log(
    "%c [ resData ]-36",
    "font-size:13px; background:pink; color:#bf2c9f;",
    resData
  );

  if (resData?.done) {
    return result.data;
  }

  if (retryCount >= MAX_RETRIE_COUNT) {
    return Promise.reject(
      new Error(`Reach to max retry count, still no result`)
    );
  }

  console.log(
    `Task ${taskId} not complete yet, will retry to get result in 10s later. retryCount=${retryCount}`
  );

  await sleep(20 * 1000);
  return getDnsQueryResult(taskId, retryCount + 1);
};

module.exports = {
  createDnsQueryTask,
  getDnsQueryResult,
};
