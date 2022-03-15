import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironmentExtended } from 'helpers/types/hardhat-type-extensions';
const { ethers } = require("hardhat");

const func: DeployFunction = async (hre: HardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre as any;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  await deploy("TamaCollectiblesBurner", {
    from: deployer,
    // args: [tameCollectibles.address, tameTokens.address],
    log: true,
  });
  const tameCollectiblesBurner = await ethers.getContract("TamaCollectiblesBurner", deployer);

  await deploy('TamaCollectibles', {
    from: deployer,
    // args: ["Hello"],
    log: true,
  });
  const tameCollectibles = await ethers.getContract("TamaCollectibles", deployer);

  await deploy('TamaController', {
    from: deployer,
    args: [tameCollectibles.address, tameCollectiblesBurner.address],
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
  await tamaDEX.init("" + (3 * 10 ** 18), { value: ethers.utils.parseEther('0.03') })

  await deploy("TamaFriend", {
    from: deployer,
    log: true,
  });

  await deploy("TamaCollectiblesVendor", {
    from: deployer,
    args: [tameCollectibles.address, tameTokens.address],
    log: true,
  });
  const tamaCollectiblesVendor = await ethers.getContract("TamaCollectiblesVendor", deployer);
  await tameCollectibles.init(tamaCollectiblesVendor.address);



};

export default func;
func.tags = ['TamaCollectibles', 'TamaController', 'TamaDEX', 'TamaToken', 'TamaFriend', 'TamaCollectiblesVendor', 'TamaCollectiblesBurner'];