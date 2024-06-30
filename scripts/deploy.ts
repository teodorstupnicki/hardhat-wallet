import { ethers, network, run } from "hardhat"

async function main() {
  // We get the contract to deploy
  const BoxFactory = await ethers.getContractFactory('Box');
  console.log('Deploying Box...');
  const box = await BoxFactory.deploy();
  await box.waitForDeployment();
  const address = await box.getAddress();
  console.log('Box deployed to: ', address);
  console.log(network.config);
  if (network.config.chainId === 11155111) {
    await verify(box.target, []);
  }

  const currentValue = await box.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await box.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await box.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch(e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
