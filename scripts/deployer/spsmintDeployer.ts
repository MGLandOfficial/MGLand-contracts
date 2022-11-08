(async ()=> {
    const SpaceshipMint = await ethers.getContractFactory("SpaceshipMint");
    const mint = await SpaceshipMint.deploy("");

    await mint.deployed();
    console.log("mint address is", mint.address);
})();

