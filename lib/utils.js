exports.waitFor = async (sec) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000));

exports.runForever = async (fn) => {
  while (1) {
    await fn();
  }
};

exports.useAsync = async (fn) => {
  return await fn();
};

exports.normalize = (str = '') =>
  str.split(' ').join().toLocaleLowerCase().trim();

exports.isDev = () => process.env.NODE_ENV === 'development';
