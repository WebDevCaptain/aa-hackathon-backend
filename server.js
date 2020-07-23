const app = require('./src/app');

// Getting PORT from Environment
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
