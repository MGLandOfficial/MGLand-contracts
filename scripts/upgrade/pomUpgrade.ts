async function main() {

    console.log("start deploy...");
    const PomgV2 = await ethers.getContractFactory("ProofOfMGLandV2");
    const PomgV1Address = require('../../.openzeppelin/polygon.json').proxies[0].address;

    const pomgV2 = await upgrades.upgradeProxy(PomgV1Address, PomgV2);

    await pomgV2.deployed();

    console.log("deployed to:", pomgV2.address);
    console.log("end deploy.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
