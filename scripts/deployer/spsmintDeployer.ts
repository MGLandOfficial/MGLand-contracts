(async ()=> {
    const SpaceshipMint = await ethers.getContractFactory("SpaceshipMint");
    const mint = await SpaceshipMint.deploy("0x7B25aA2a1D75E20291B23D9D40a8826be87150a0");

    await mint.deployed();
    console.log("mint address is", mint.address);
})();

