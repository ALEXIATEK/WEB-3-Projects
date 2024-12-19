const hre = require("hardhat");

async function main() {

    await hre.run('compile');


    const CharityDonations = await hre.ethers.getContractFactory("CharityDonations");

    const [deployer] = await hre.ethers.getSigners();
    
    const charityDonations = await CharityDonations.deploy(0xC741e92081b8a1a4f474Ddb2C1EdB3Fd459862ea);

    await charityDonations.waitForDeployment();

    console.log("CharityDonations Contract Address", await charityDonations.getAddress())
        
}

console.log(process.env.WALLET_PRIVATE_KEY);
console.log(process.env.ALCHEMY_API_KEY_SEPOLIA);

main().then(() => process.exit(0))

.catch((error) => { 

    console.error(error);

    process.exit(1);

    })