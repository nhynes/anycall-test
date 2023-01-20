import { ethers } from 'hardhat';

async function main(): Promise<void> {
  const { chainId } = await ethers.provider.getNetwork();
  let tester = '';
  const sapphireTester = '0xA7F390b2609F02EcdCd406C1BDe86cd3848a228B';
  const goerliTester = '0x9Be8Bb33d79691D70b75D25dd40e578e53181963';
  switch (chainId) {
    case 0x5aff: // sapphire-testnet
      tester = sapphireTester;
      break;
    case 5: // goerli
      tester = goerliTester;
      break;
    default:
      throw new Error('unsupported network');
  }
  const AnyCallTest = await ethers.getContractFactory('AnyCallTest');
  const anyCallTest = AnyCallTest.attach(tester).connect(ethers.provider.getSigner());
  const tx = await anyCallTest.echo();
  await tx.wait();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
