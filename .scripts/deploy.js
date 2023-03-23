const got = require('got');

async function main() {
  const url = `${process.env.DEPLOY_URL}/${process.env.COMMIT_SHA}`;

  const commandResults = await got.get(url).json();
  for (const commandResult of commandResults) {
    if (commandResult.success === false) {
      throw new Error(`Command failed: ${commandResult.command}\n${commandResult.errorMessage}`);
    } else {
      console.log(commandResult.command);
      console.log(commandResult.stdout);
      console.log(commandResult.stderr);
    }
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
