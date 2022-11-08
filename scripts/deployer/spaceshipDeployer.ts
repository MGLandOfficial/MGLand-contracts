const {ethers} = require('hardhat');

(async ()=> {
    const MGSpaceship = await ethers.getContractFactory("MGSpaceship");
    const mgspaceship = await MGSpaceship.deploy("", "");

    await mgspaceship.deployed();
    console.log("Spaceship address is", mgspaceship.address);
})();

