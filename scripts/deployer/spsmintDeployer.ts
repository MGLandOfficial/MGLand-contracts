(async ()=> {
    const SpaceshipMint = await ethers.getContractFactory("SpaceshipMint");
    const mint = await SpaceshipMint.deploy("0x6bf2FF9c85014d60F01D918C376Ea2BDB6c7b218");

    await mint.deployed();
    console.log("mint address is", mint.address);
})();

