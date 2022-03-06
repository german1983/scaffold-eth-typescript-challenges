import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironmentExtended } from 'helpers/types/hardhat-type-extensions';
const { ethers } = require("hardhat");

const func: DeployFunction = async (hre: HardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre as any;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  await deploy('TamaCollectibles', {
    from: deployer,
    // args: ["Hello"],
    log: true,
  });

  await deploy('TamaContainer', {
    from: deployer,
    // args: ["Hello"],
    log: true,
  });

  await deploy("TamaToken", {
    from: deployer,
    log: true,
  });

  const tameTokens = await ethers.getContract("TamaToken", deployer);

  await deploy("TamaDEX", {
    from: deployer,
    args: [tameTokens.address],
    log: true,
  });

  const tamaDEX = await ethers.getContract("TamaDEX", deployer);

  // Let's init the tamaDEX on deploy with some ETH
  console.log("Approving tamaDEX (" + tamaDEX.address + ") to take TamaTokens from main account...")

  // If you are going to the testnet make sure your deployer account has enough ETH
  await tameTokens.approve(tamaDEX.address, ethers.utils.parseEther('100'));

  console.log("INIT exchange...")
  await tamaDEX.init("" + (3 * 10 ** 18), { value: ethers.utils.parseEther('3'), gasLimit: 200000 })


  await deploy("TamaFriend", {
    from: deployer,
    log: true,
  });

};

export default func;
func.tags = ['TamaCollectibles', 'TamaContainer', 'TamaDEX', 'TamaToken', 'TamaFriend'];