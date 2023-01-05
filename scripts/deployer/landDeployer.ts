(async ()=> {
    const MGLand = await ethers.getContractFactory("MGLand");
    const mgland = await MGLand.deploy("MG Land", "MGLand");

    await mgland.deployed();
    console.log("MGLand address is", mgland.address);
})();