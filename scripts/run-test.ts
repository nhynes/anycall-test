import { ethers } from 'hardhat';

async function main(): Promise<void> {
  const AnyCallTest = await ethers.getContractFactory('AnyCallTest');

  const anyCallTest = await AnyCallTest.deploy();
  await anyCallTest.deployed();
  console.log(anyCallTest.address);

  // const anyCallTest = AnyCallTest.connect(ethers.provider.getSigner()).attach('0xcc16A774D0004BE6399eAaB61D430f58b090D8E7');

  const value = ethers.utils.parseEther('0.01');
  await anyCallTest.callStatic.echo({ value }); // Preflight the tx.
  const tx = await anyCallTest.echo({ value }); // Send it.
  await tx.wait();
  console.log(tx.hash);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
