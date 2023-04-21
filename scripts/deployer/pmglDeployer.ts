(async ()=> {
    const MGLand = await ethers.getContractFactory("ProofOfMGL");
    const mgland = await MGLand.deploy("ProofOfMGL", "PMGL");

    await mgland.deployed();
    console.log("MGLand address is", mgland.address);
})();