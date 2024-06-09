import { ethers } from "hardhat";

async function main () {
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
