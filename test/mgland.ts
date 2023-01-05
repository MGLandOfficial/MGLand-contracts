import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { BigNumber } from "ethers";


describe("landSale", function () {
    async function deployPublicSaleFixture() {
        const [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();
        const Sale = await ethers.getContractFactory("MGLand");
        const sale = await Sale.deploy("MGLand", "MGL");
        const provider = waffle.provider;


        return { owner, addr1, addr2, addr3, addr4, addr5, sale, provider };
    }

    describe("successful cases", function () {
        it("mint 1 super land", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale} = await loadFixture(deployPublicSaleFixture);
            await sale.batchMint(0, 1, {value: ethers.BigNumber.from("1200000000000000000")});
            expect(await sale.balanceOf(owner.address)).to.equal(1);
            expect(await sale.ownerOf(1)).to.equal(owner.address);
            expect(await sale.totalSupply()).to.equal(1);
            
            let supply = await sale.getLandSupply();
            console.log("supply: ", supply);
            expect(supply[0]).to.equal("1");
            expect(supply[1]).to.equal("0");
            expect(supply[2]).to.equal("0");
            expect(supply[3]).to.equal("0");

        });

        it("mint 1 large land", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale} = await loadFixture(deployPublicSaleFixture);
            await sale.batchMint(1, 1, {value: ethers.BigNumber.from("600000000000000000")});
            expect(await sale.balanceOf(owner.address)).to.equal(1);
            expect(await sale.ownerOf(101)).to.equal(owner.address);
            expect(await sale.totalSupply()).to.equal(1);
            let supply = await sale.getLandSupply();
            console.log("supply: ", supply);
            expect(supply[0]).to.equal("0");
            expect(supply[1]).to.equal("1");
            expect(supply[2]).to.equal("0");
            expect(supply[3]).to.equal("0");
        });

        it("mint 1 medium land", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale} = await loadFixture(deployPublicSaleFixture);
            await sale.batchMint(2, 1, {value: ethers.BigNumber.from("300000000000000000")});
            expect(await sale.balanceOf(owner.address)).to.equal(1);
            expect(await sale.ownerOf(1001)).to.equal(owner.address);
            expect(await sale.totalSupply()).to.equal(1);
            let supply = await sale.getLandSupply();
            console.log("supply: ", supply);
            expect(supply[0]).to.equal("0");
            expect(supply[1]).to.equal("0");
            expect(supply[2]).to.equal("1");
            expect(supply[3]).to.equal("0");
        });

        it("mint 1 small land", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale} = await loadFixture(deployPublicSaleFixture);
            await sale.batchMint(3, 1, {value: ethers.BigNumber.from("150000000000000000")});
            expect(await sale.balanceOf(owner.address)).to.equal(1);
            expect(await sale.ownerOf(4001)).to.equal(owner.address);
            expect(await sale.totalSupply()).to.equal(1);
            let supply = await sale.getLandSupply();
            console.log("supply: ", supply);
            expect(supply[0]).to.equal("0");
            expect(supply[1]).to.equal("0");
            expect(supply[2]).to.equal("0");
            expect(supply[3]).to.equal("1");
        });

        it("mint 101 super land", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale, provider} = await loadFixture(deployPublicSaleFixture);
            await sale.batchMint(0, 101, {value: ethers.BigNumber.from("121200000000000000000")});
            expect(await sale.balanceOf(owner.address)).to.equal(100);
            expect(await sale.ownerOf(100)).to.equal(owner.address);
            expect(await ethers.provider.getBalance(sale.address)).to.equal(ethers.BigNumber.from("120000000000000000000"))
            expect(await sale.totalSupply()).to.equal(100);
            let supply = await sale.getLandSupply();
            console.log("supply: ", supply);
            expect(supply[0]).to.equal("100");
            expect(supply[1]).to.equal("0");
            expect(supply[2]).to.equal("0");
            expect(supply[3]).to.equal("0");
        });

        it("mint all large land", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale, provider} = await loadFixture(deployPublicSaleFixture);
            await sale.batchMint(1, 901, {value: ethers.BigNumber.from("540600000000000000000")});
            expect(await sale.balanceOf(owner.address)).to.equal(900);
            expect(await sale.ownerOf(1000)).to.equal(owner.address);

        });

        it("owner mint 880 large land & address1 mint 40 large land", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale, provider} = await loadFixture(deployPublicSaleFixture);
            await sale.batchMint(1, 880, {value: ethers.BigNumber.from("528000000000000000000")});
            expect(await sale.balanceOf(owner.address)).to.equal(880);
            expect(await sale.ownerOf(980)).to.equal(owner.address);
            await sale.connect(addr1).batchMint(1, 40, {value: ethers.BigNumber.from("24000000000000000000")});
            expect(await sale.balanceOf(addr1.address)).to.equal(20);
            expect(await sale.ownerOf(981)).to.equal(addr1.address);
            expect(await sale.ownerOf(1000)).to.equal(addr1.address);
        });

        it("owner mint 2980 medium land & address1 mint 40 medium land", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale, provider} = await loadFixture(deployPublicSaleFixture);
            await sale.batchMint(2, 2980, {value: ethers.BigNumber.from("894000000000000000000")});
            expect(await sale.balanceOf(owner.address)).to.equal(2980);
            expect(await sale.ownerOf(3980)).to.equal(owner.address);
            await sale.connect(addr1).batchMint(2, 40, {value: ethers.BigNumber.from("12000000000000000000")})
            expect(await sale.balanceOf(addr1.address)).to.equal(20);
            expect(await sale.ownerOf(4000)).to.equal(addr1.address);
        });

        it("owner mint 5980 small land & address1 mint 40 small land", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale, provider} = await loadFixture(deployPublicSaleFixture);
            await sale.batchMint(3, 5980, {value: ethers.BigNumber.from("897000000000000000000")});
            expect(await sale.balanceOf(owner.address)).to.equal(5980);
            expect(await sale.ownerOf(9980)).to.equal(owner.address);
            await sale.connect(addr1).batchMint(3, 40, {value: ethers.BigNumber.from("6000000000000000000")})
            expect(await sale.balanceOf(addr1.address)).to.equal(20);
            expect(await sale.ownerOf(10000)).to.equal(addr1.address);
        });

        it("withdraw eth after mint 100 superland & 10 large land", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale, provider} = await loadFixture(deployPublicSaleFixture);
            await sale.connect(addr1).batchMint(0, 101, {value: ethers.BigNumber.from("121200000000000000000")});
            expect(await sale.balanceOf(addr1.address)).to.equal(100);
            expect(await sale.ownerOf(100)).to.equal(addr1.address);
            expect(await ethers.provider.getBalance(sale.address)).to.equal(ethers.BigNumber.from("120000000000000000000"))
            expect(await sale.totalSupply()).to.equal(100);
            let supply = await sale.getLandSupply();
            console.log("supply: ", supply);
            expect(supply[0]).to.equal("100");
            expect(supply[1]).to.equal("0");
            expect(supply[2]).to.equal("0");
            expect(supply[3]).to.equal("0");

            await sale.connect(addr1).batchMint(1, 10, {value: ethers.BigNumber.from("6000000000000000000")});
            expect(await sale.balanceOf(addr1.address)).to.equal(110);
            expect(await sale.ownerOf(110)).to.equal(addr1.address);
            expect(await sale.totalSupply()).to.equal(110);
            //await ethers.provider.connect(addr1.address).transfer()
            let balance = await ethers.provider.getBalance(addr1.address);
            console.log("balance: ", balance);
            await sale.withdraw(addr1.address);
            let balanceAfter = await ethers.provider.getBalance(addr1.address);
            console.log("balance after: ", balanceAfter);
            //9999999999999987158959
            //9873999999999987158959
            // 126000000000000000000
            //   6000000000000000000
        });

    })

    describe("failed cases", function () {
        it("eth amount error", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale} = await loadFixture(deployPublicSaleFixture);
            await expect(
                    sale.batchMint(0, 1, {value: ethers.BigNumber.from("600000000000000000")})
                ).to.revertedWith("Mint fee error");
        });

        it("mint over", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale, provider} = await loadFixture(deployPublicSaleFixture);
            await sale.batchMint(0, 101, {value: ethers.BigNumber.from("121200000000000000000")});
            expect(await sale.balanceOf(owner.address)).to.equal(100);
            expect(await sale.ownerOf(100)).to.equal(owner.address);
            expect(await ethers.provider.getBalance(sale.address)).to.equal(ethers.BigNumber.from("120000000000000000000"))
            expect(await sale.totalSupply()).to.equal(100);
            let supply = await sale.getLandSupply();
            console.log("supply: ", supply);
            expect(supply[0]).to.equal("100");
            expect(supply[1]).to.equal("0");
            expect(supply[2]).to.equal("0");
            expect(supply[3]).to.equal("0");

            let a = await sale.landInfo(0);
            console.log("a ", a);

            await sale.connect(addr1);
            await expect(
                sale.batchMint(0, 1, {value: ethers.BigNumber.from("1200000000000000000")})
            ).to.revertedWith("Mint over");
        });

        it("withdraw eth after mint 100 superlands & 10 largelands but not owner", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale, provider} = await loadFixture(deployPublicSaleFixture);
            await sale.connect(addr1).batchMint(0, 101, {value: ethers.BigNumber.from("121200000000000000000")});
            expect(await sale.balanceOf(addr1.address)).to.equal(100);
            expect(await sale.ownerOf(100)).to.equal(addr1.address);
            expect(await ethers.provider.getBalance(sale.address)).to.equal(ethers.BigNumber.from("120000000000000000000"))
            expect(await sale.totalSupply()).to.equal(100);
            let a = await sale.getLandSupply();
            let supply = await sale.getLandSupply();
            console.log("supply: ", supply);
            expect(supply[0]).to.equal("100");
            expect(supply[1]).to.equal("0");
            expect(supply[2]).to.equal("0");
            expect(supply[3]).to.equal("0");

            await sale.connect(addr1).batchMint(1, 10, {value: ethers.BigNumber.from("6000000000000000000")});
            expect(await sale.balanceOf(addr1.address)).to.equal(110);
            expect(await sale.ownerOf(110)).to.equal(addr1.address);
            expect(await sale.totalSupply()).to.equal(110);
            await expect(sale.connect(addr1).withdraw(owner.address)).to.revertedWith("Ownable: caller is not the owner");
        });

        it("withdraw to zero address", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale, provider} = await loadFixture(deployPublicSaleFixture);
            await sale.connect(addr1).batchMint(0, 101, {value: ethers.BigNumber.from("121200000000000000000")});
            expect(await sale.balanceOf(addr1.address)).to.equal(100);
            expect(await sale.ownerOf(100)).to.equal(addr1.address);
            expect(await ethers.provider.getBalance(sale.address)).to.equal(ethers.BigNumber.from("120000000000000000000"))
            expect(await sale.totalSupply()).to.equal(100);
            let supply = await sale.getLandSupply();
            console.log("supply: ", supply);
            expect(supply[0]).to.equal("100");
            expect(supply[1]).to.equal("0");
            expect(supply[2]).to.equal("0");
            expect(supply[3]).to.equal("0");

            await sale.connect(addr1).batchMint(1, 10, {value: ethers.BigNumber.from("6000000000000000000")});
            expect(await sale.balanceOf(addr1.address)).to.equal(110);
            expect(await sale.ownerOf(110)).to.equal(addr1.address);
            expect(await sale.totalSupply()).to.equal(110);
            await expect(sale.withdraw('0x0000000000000000000000000000000000000000')).to.revertedWith("Transfer to zero address");
        });

        it("mint paused error", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale} = await loadFixture(deployPublicSaleFixture);
            await sale.setMintPaused();
            await expect(
                    sale.batchMint(0, 1, {value: ethers.BigNumber.from("1200000000000000000")})
                ).to.revertedWith("Mint Paused");
        });

        it("land type error", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale} = await loadFixture(deployPublicSaleFixture);
            await expect(
                    sale.batchMint(4, 1, {value: ethers.BigNumber.from("1200000000000000000")})
                ).to.revertedWith("Land type error");
        });
    })

    describe("integration testing", function () {
        it("owner mints 40 superlands & addr2 mint 10 small lands & 5 superlands & addr1 mints 61 superlands", async function () {
            const {owner, addr1, addr2, addr3, addr4, addr5, sale} = await loadFixture(deployPublicSaleFixture);
            // owner mints 40 super lands
            await sale.batchMint(0, 40, {value: ethers.BigNumber.from("48000000000000000000")});
            expect(await sale.balanceOf(owner.address)).to.equal(40);
            expect(await sale.ownerOf(40)).to.equal(owner.address);
            expect(await sale.totalSupply()).to.equal(40);
            let supply = await sale.getLandSupply();
            console.log("supply: ", supply);
            expect(supply[0]).to.equal("40");
            expect(supply[1]).to.equal("0");
            expect(supply[2]).to.equal("0");
            expect(supply[3]).to.equal("0");
            expect(await ethers.provider.getBalance(sale.address)).to.equal(ethers.BigNumber.from("48000000000000000000"))


            // address2 mints 10 small lands 
            await sale.connect(addr2).batchMint(3, 10, {value: ethers.BigNumber.from("1500000000000000000")});
            expect(await sale.balanceOf(addr2.address)).to.equal(10);
            expect(await sale.ownerOf(4010)).to.equal(addr2.address);
            expect(await sale.totalSupply()).to.equal(50);
            let supply2 = await sale.getLandSupply();
            console.log("supply: ", supply2);
            expect(supply2[0]).to.equal("40");
            expect(supply2[1]).to.equal("0");
            expect(supply2[2]).to.equal("0");
            expect(supply2[3]).to.equal("10");
            expect(await ethers.provider.getBalance(sale.address)).to.equal(ethers.BigNumber.from("49500000000000000000"))


            // address3 mints 5 super lands
            await sale.connect(addr2).batchMint(0, 5, {value: ethers.BigNumber.from("6000000000000000000")});
            expect(await sale.balanceOf(addr2.address)).to.equal(15);
            expect(await sale.ownerOf(41)).to.equal(addr2.address);
            expect(await sale.ownerOf(45)).to.equal(addr2.address);
            expect(await sale.totalSupply()).to.equal(55);

            let supply3 = await sale.getLandSupply();
            console.log("supply: ", supply3);
            expect(supply3[0]).to.equal("45");
            expect(supply3[1]).to.equal("0");
            expect(supply3[2]).to.equal("0");
            expect(supply3[3]).to.equal("10");
            expect(await ethers.provider.getBalance(sale.address)).to.equal(ethers.BigNumber.from("55500000000000000000"))


            // address1 mints 61 super lands
            await sale.connect(addr1).batchMint(0, 61, {value: ethers.BigNumber.from("73200000000000000000")});
            expect(await sale.balanceOf(addr1.address)).to.equal(55);
            expect(await sale.ownerOf(100)).to.equal(addr1.address);
            expect(await sale.totalSupply()).to.equal(110);
            
            let supply4 = await sale.getLandSupply();
            console.log("supply4: ", supply4);
            expect(supply4[0]).to.equal("100");
            expect(supply4[1]).to.equal("0");
            expect(supply4[2]).to.equal("0");
            expect(supply4[3]).to.equal("10");

            expect(await ethers.provider.getBalance(sale.address)).to.equal(ethers.BigNumber.from("121500000000000000000"));
        });
    })
})