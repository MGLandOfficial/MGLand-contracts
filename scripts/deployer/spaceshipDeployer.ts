const {ethers} = require('hardhat');

(async ()=> {
    const MGSpaceship = await ethers.getContractFactory("MGSpaceship");
    const mgspaceship = await MGSpaceship.deploy("MGLand's Spaceships", "MGSP");

    await mgspaceship.deployed();
    console.log("Spaceship address is", mgspaceship.address);
})();

