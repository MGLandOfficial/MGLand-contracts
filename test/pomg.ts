import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("pomg", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployPOMGFixture() {


    // Contracts are deployed using the first signer/account by default
    const [owner,addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

    const pomuups = await ethers.getContractFactory("ProofOfMGLand");
    const pomuupsProxy = await upgrades.deployProxy(pomuups, []);
    await pomuupsProxy.deployed();

    return { pomuupsProxy, owner, addr1, addr2, addr3, addr4, addr5 };
  }

  describe("simple test", function () {
    it("mint 1", async function () {
        const { pomuupsProxy, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(deployPOMGFixture);
        await pomuupsProxy.mint(addr1.address);
        expect(await pomuupsProxy.totalSupply()).to.equal(1);
    });

    it("mint not allow", async function () {
        const { pomuupsProxy, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(deployPOMGFixture);
        await expect(pomuupsProxy.connect(addr1).mint(addr2.address)).to.be.revertedWith(
            "MintNotAllow()"
        );
    });

    it("mint 2", async function () {
        const { pomuupsProxy, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(deployPOMGFixture);
        await pomuupsProxy.mint(addr1.address);
        expect(await pomuupsProxy.totalSupply()).to.equal(1);
        await expect(pomuupsProxy.mint(addr1.address)).to.be.revertedWith(
            "AlreadyMinted()"
        )
    });

    it("mint over", async function () {
        const { pomuupsProxy, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(deployPOMGFixture);
        await pomuupsProxy.mint(addr1.address);
        await pomuupsProxy.mint(addr2.address);
        await pomuupsProxy.mint(addr3.address);
        await pomuupsProxy.mint(addr4.address);
        await pomuupsProxy.mint(addr5.address);
        await pomuupsProxy.setSupply(5);
        expect(await pomuupsProxy.totalSupply()).to.equal(5);
        expect(await pomuupsProxy.pomgId(addr1.address)).to.equal(1);
        expect(await pomuupsProxy.pomgId(addr2.address)).to.equal(2);
        expect(await pomuupsProxy.pomgId(addr3.address)).to.equal(3);
        expect(await pomuupsProxy.pomgId(addr4.address)).to.equal(4);
        expect(await pomuupsProxy.pomgId(addr5.address)).to.equal(5);
        await expect(pomuupsProxy.mint(owner.address)).to.be.revertedWith(
            "MintOver()"
        )
    });

    it("approve", async function () {
        const { pomuupsProxy, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(deployPOMGFixture);
        await pomuupsProxy.mint(owner.address);
        await expect(pomuupsProxy.approve(addr1.address, 1)).to.be.revertedWith(
            "NonTransferable()"
        )
    });

    it("setApprovalForAll", async function () {
        const { pomuupsProxy, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(deployPOMGFixture);
        await pomuupsProxy.mint(owner.address);
        await expect(pomuupsProxy.setApprovalForAll(addr1.address, 1)).to.be.revertedWith(
            "NonTransferable()"
        )
    });

    it("transfer", async function () {
        const { pomuupsProxy, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(deployPOMGFixture);
        await pomuupsProxy.mint(owner.address);
        await pomuupsProxy.transfer
        await expect(pomuupsProxy.transferFrom(owner.address, addr1.address, 1)).to.be.revertedWith(
            "NonTransferable()"
        )
    });

    it("safetransferfrom", async function () {
        const { pomuupsProxy, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(deployPOMGFixture);
        await pomuupsProxy.mint(owner.address);
        await expect(
            pomuupsProxy["safeTransferFrom(address,address,uint256)"](owner.address, addr1.address, 1))
            .to.be.revertedWith(
            "NonTransferable()"
        )
    });

  });
});
