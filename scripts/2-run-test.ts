import { ethers } from 'hardhat';

async function main(): Promise<void> {
  const { chainId } = await ethers.provider.getNetwork();
  let tester = '';
  let receiver = '';
  const sapphireTester = '0x9c26f61bC8752238552c57e764d57ae57018EcB3';
  const goerliTester = '0xBd8B418f29ACDA013E8f263354fA8D0521437015';
  switch (chainId) {
    case 0x5aff: // sapphire-testnet
      tester = sapphireTester;
      receiver = goerliTester;
      break;
    case 5: // goerli
      tester = goerliTester;
      receiver = sapphireTester;
      break;
    default:
      throw new Error('unsupported network');
  }
  const AnyCallTest = await ethers.getContractFactory('AnyCallTest');
  const anyCallTest = AnyCallTest.attach(tester).connect(ethers.provider.getSigner());
  let tx = await anyCallTest.setReceiver(receiver);
  console.log(tx.hash);
  await tx.wait();
  await anyCallTest.callStatic.echo({ value: ethers.utils.parseEther('0.01') });
  console.log(tx.hash);
  await tx.wait();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
