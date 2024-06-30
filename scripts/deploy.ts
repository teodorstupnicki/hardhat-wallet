import { ethers, network, run } from "hardhat"

async function main() {
  // We get the contract to deploy
  const Box = await ethers.getContractFactory('Box');
  console.log('Deploying Box...');
  const box = await Box.deploy();
  await box.waitForDeployment();
  const address = await box.getAddress();
  console.log('Box deployed to: ', address);
  console.log(network.config);
  console.log(network.config.chainId);
  if (network.config.chainId === 11155111) {
    await verify(address, []);
  }
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
  await run("verify");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
