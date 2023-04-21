

(async () => {
    const recycle = await ethers.getContractFactory("MGRecycle");

    const recycleProxy = await upgrades.deployProxy(recycle, []);

    await recycleProxy.deployed();
    console.log("recycle address deployed to:", recycleProxy.address);
}) (); 