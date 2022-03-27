import { ethers, deployments, getNamedAccounts } from "hardhat";
import { DeployFunction } from 'hardhat-deploy/types';
import { BigNumber } from "ethers"

export async function deploy() {
  await deployments.fixture(["TokenFactory"]);
  const { deployer } = await getNamedAccounts();
  const TokenFactoryAddress = await (ethers as any).getContract("TokenFactory");
  const factory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await factory.attach(TokenFactoryAddress.address)
  return { deployer, tokenFactory }
}

export function createTokenDeployFunc(name:string, symbol:string, decimals:number) {
  const params = [name, symbol, BigNumber.from(10).pow(decimals + 7), decimals] // Limit is 10M tokens

  const func: DeployFunction = async function ({ getNamedAccounts, deployments }: any) {
    const { log } = deployments;
    const namedAccounts = await getNamedAccounts();
    const { deployer } = namedAccounts;
    const FactoryDeployment = await deployments.get('TokenFactory');
    const factory = await ethers.getContractFactory("TokenFactory");
    const tokenFactory = await factory.attach(FactoryDeployment.address)
    const tokenToDeploy = await tokenFactory.getTokenByParameters("0x0000000000000000000000000000000000000000", ...params);
    if (!tokenToDeploy.isDeployed) {
      await tokenFactory.createOwnerlessToken(...params);
      log(
        `token ${symbol} deployed at ${tokenToDeploy.predictedAddress}`
      );
    }
  };
  func.tags = [symbol];
  func.dependencies = ['TokenFactory'];// this ensure the Token script above is executed first, so `deployments.get('Token')` succeeds
  return func
}