export function unProxify(val: any) {
  if (val instanceof Array) return val.map(unProxify);
  if (val instanceof Object)
    return Object.fromEntries(
      Object.entries(Object.assign({}, val)).map(([k, v]) => [k, unProxify(v)])
    );
  return val;
}
