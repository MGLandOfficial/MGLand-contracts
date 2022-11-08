
const{ upgrades }  = require("hardhat");

(async () => {
    const pomguups = await ethers.getContractFactory("ProofOfMGLand");

    const pomguupsProxy = await upgrades.deployProxy(pomguups, []);

    await pomguupsProxy.deployed();
    console.log("POMG address deployed to:", pomguupsProxy.address);
}) (); 