import { ethers } from 'hardhat';
import type { AnycallTest } from '../typechain-types/AnycallTest';

async function main(): Promise<void> {
  const AnycallTest = await ethers.getContractFactory('AnycallTest');

  let anycallTestAddr = undefined;
  anycallTestAddr = '0x5eb039771558b1E9aAB30c71c56726c3ACFFb2FD';

  let anycallTest: AnycallTest | undefined;
  if (anycallTestAddr) {
    const signer = ethers.provider.getSigner();
    anycallTest = AnycallTest.connect(signer).attach(anycallTestAddr) as AnycallTest;
  } else {
    anycallTest = (await AnycallTest.deploy()) as AnycallTest;
    await anycallTest.deployed();
    console.log(anycallTest.address);
  }

  const value = ethers.utils.parseEther('0.15');
  await anycallTest.callStatic.echo({ value }); // Preflight the tx.
  // const tx = await anycallTest.echo({ value }); // Send it.
  // await tx.wait();
  // console.log(tx.hash);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
