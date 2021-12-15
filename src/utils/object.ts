export function keyBy<K>(arr: K[], keyByFn: (item: K) => string): { [key: string]: K } {
  let map: { [key: string]: K } = {};
  arr.forEach((item) => {
    const key = keyByFn(item);
    map[key] = item;
  });
  return map;
}

export function groupBy<K>(arr: K[], grouperFn: (item: K) => string): Array<K[]> {
  const grouper: { [key: string]: K[] } = {};

  arr.forEach((item) => {
    const key = grouperFn(item);
    grouper[key] = grouper[key] || [];
    grouper[key].push(item);
  });

  return objectValues(grouper);
}

export function objectValues<K>(obj: { [key: string]: K }): K[] {
  return Object.keys(obj).map((key) => obj[key]);
}
