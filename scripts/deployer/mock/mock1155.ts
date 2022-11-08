
(async () => {
    const Mock1155 = await ethers.getContractFactory("Mock1155");

    const mock1155 = await Mock1155.deploy("test", "test111");

    await mock1155.deployed();
    console.log("mock1155 rinkeby address deployed to:", mock1155.address);
}) (); 