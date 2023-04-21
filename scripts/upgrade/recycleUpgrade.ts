async function main() {

    console.log("start deploy...");
    const PomgV2 = await ethers.getContractFactory("MGRecycleV2");
    const PomgV1Address = require('../../.openzeppelin/unknown-11155111.json').proxies[0].address;

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
