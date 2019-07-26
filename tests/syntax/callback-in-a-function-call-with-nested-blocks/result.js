foo(() => {
  try {
    foo();
  } catch (err) {
    throw err;
  }
});
