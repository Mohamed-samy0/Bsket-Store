export { cn } from "cn";

import qs from "query-string";

export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) {
  const query = qs.parse(params);
  query[key] = value;

  return qs.stringifyUrl({ url: window.location.pathname, query }, { skipNull: true });
}
