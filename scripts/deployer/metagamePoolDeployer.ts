(async ()=> {
    const MGLand = await ethers.getContractFactory("LuckyDeposit");
    const mgland = await MGLand.deploy();

    await mgland.deployed();
    console.log("MGLand address is", mgland.address);
})();