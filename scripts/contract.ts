import { ethers } from "hardhat";

async function main () {
  const address = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
  const Box = await ethers.getContractFactory('Box')
  const box = await Box.attach(address)

  const value = await box.retrieve()
  console.log('Box value is ', value.toString())
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
