import { ethers } from 'hardhat';

async function main(): Promise<void> {
  const { chainId } = await ethers.provider.getNetwork();
  let anycall = '';
  let receiverChain = 0;
  switch (chainId) {
    case 0x5aff: // sapphire-testnet
      anycall = '0x4792C1EcB969B036eb51330c63bD27899A13D84e';
      receiverChain = 5;
      break;
    case 5: // goerli
      anycall = '0x965f84D915a9eFa2dD81b653e3AE736555d945f4';
      receiverChain = 0x5aff;
      break;
    default:
      throw new Error('unsupported network');
  }
  const AnyCallTest = await ethers.getContractFactory('AnyCallTest');
  const anyCallTest = await AnyCallTest.deploy(anycall, receiverChain);
  await anyCallTest.deployed();
  console.log(anyCallTest.address);

  // const anyCall = await ethers.getContractAt('CallProxy', anycall);
  // const configAddr = await anyCall.callStatic.config();
  // const config = await ethers.getContractAt('AnyCallConfig', configAddr);
  // const tx = await config.deposit(anyCallTest.address, { value: ethers.utils.parseEther('0.01') });
  // await tx.wait();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
