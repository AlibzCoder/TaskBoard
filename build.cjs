const { exec } = require('child_process');

// Define the commands you want to run
const buildClient = 'cd client && npm run build';
const buildServer = 'npm run build';

// Run the first command
exec(buildClient, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing command1: ${err.message}`);
    return;
  }

  console.log(`Output of command1: ${stdout}`);

  // Run the second command if the first succeeds
  exec(buildServer, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command2: ${err.message}`);
      return;
    }

    console.log(`Output of command2: ${stdout}`);
  });
});