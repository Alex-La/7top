const waitForLoad = (checker, callback) => {
  let timer;
  if (typeof checker === "function") {
    timer = setInterval(() => {
      const result = checker();
      if (result) {
        clearInterval(timer);
        callback();
      }
    }, 0);
  } else {
    throw new Error(`Function expected but ${typeof checker} provided`);
  }
  return () => clearInterval(timer);
};
