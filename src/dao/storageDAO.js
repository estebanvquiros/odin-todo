function write(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch(e) {
    console.error(`Error writing [${key}] data in local storage.`);
  }
}

function read(key) {
  try {
    const rawData = localStorage.getItem(key);
    return rawData ? JSON.parse(rawData) : null;
  } catch(e) {
    console.error(`Error reading [${key}] from local storage.`);
  }
}

export { write, read }