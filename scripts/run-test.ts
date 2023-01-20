import { ethers } from 'hardhat';
import type { AnycallTest } from '../typechain-types/AnycallTest';

async function main(): Promise<void> {
  const payOnDest = !!process.env.PAY_ON_DEST;

  const AnycallTest = await ethers.getContractFactory('AnycallTest');
  const anycallTest = (await AnycallTest.deploy(payOnDest)) as AnycallTest;
  await anycallTest.deployed();
  console.log('contract:', anycallTest.address);

  const fee = ethers.utils.parseEther('0.03');
  let value = undefined;
  if (payOnDest) {
    const anycallAddr = await anycallTest.callStatic.anycallProxy();
    const anycallProxy = await ethers.getContractAt('IAnycallProxy', anycallAddr);
    const anycallConfigAddr = await anycallProxy.callStatic.config();
    const anycallConfig = await ethers.getContractAt('IFeePool', anycallConfigAddr);
    const tx = await anycallConfig.deposit(anycallTest.address, { value: fee });
    await tx.wait();
    console.log('deposit:', tx.hash);
  } else {
    value = fee;
  }
  await anycallTest.callStatic.echo({ value }); // Preflight the tx.
  const tx = await anycallTest.echo({ value }); // Send it.
  await tx.wait();
  console.log('echo:', tx.hash);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
