(async ()=> {
    const SpaceshipMint = await ethers.getContractFactory("SpaceshipMint");
    const mint = await SpaceshipMint.deploy("0x2AA5783bA45b5d75284aB795509CCFF737B169A6");

    await mint.deployed();
    console.log("mint address is", mint.address);
})();

