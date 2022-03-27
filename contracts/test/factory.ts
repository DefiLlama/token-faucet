import { expect } from "chai";
import { ethers } from "hardhat";
import { deploy } from '../scripts/utils'

describe("TokenFactory", function () {
  it("can't create the an instance for the parameters twice", async function () {
    const { tokenFactory } = await deploy()
    const parameters = ["USD Coin", "USDC", ethers.BigNumber.from(10).pow(6 + 6), 6] as const
    await tokenFactory.createToken(...parameters)
    await expect(
      tokenFactory.createToken(...parameters)
    ).to.be.revertedWith("");
  });
});
