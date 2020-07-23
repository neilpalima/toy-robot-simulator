import simulator from './simulator';

(async () => {
  try {
    await simulator();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();