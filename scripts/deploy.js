import hre from "hardhat";

async function main() {
  const AureumVault = await hre.ethers.deployContract("AureumEarningsVault");

  await AureumVault.waitForDeployment();

  console.log(
    `AureumEarningsVault deployed to: ${AureumVault.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
