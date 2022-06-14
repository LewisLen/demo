function myOnce(fn) {
  let tag = true;
  return function () {
    if (tag === true) {
      fn.apply(null, arguments);
      tag = false;
    }
    return undefined;
  };
}
