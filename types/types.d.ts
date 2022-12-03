export interface PingRecord {
  ttl: number;
  name: string;
  type: string;
  value: string;
  q_time: number;
  ip_isp: string;
}

interface List {
  node_id: number;
  node_name: string;
  host: string;
  origin_ip: string;
  report_source: string;
  session_id: string;
  ip_region: string;
  error_code: number;
  error: string;
  time_id: string;
  query_time: number;
  use_dns: string[];
  records: PingRecord[];
}

export interface GetTaskResultRes {
  done: boolean;
  id: string;
  list: List[];
  max_node: number;
}

export interface CreatePingTaskRes {
  error_code: number;
  error: string;
  data: {
    id: string;
  };
}
