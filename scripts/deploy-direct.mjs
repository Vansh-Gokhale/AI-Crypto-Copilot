import { ethers } from "ethers";
import fs from "fs";
import { execSync } from "child_process";

// ─── Config ───
const RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/wn4XW-K9MzziCDNND8XhxR8hUAGBcoG8";
const PRIVATE_KEY = "e7a8691134f1e64df22cf82db9600b305486651285470ce260be6ecacd0150e4";

async function main() {
  console.log("🔨 Compiling AureumEarningsVault.sol...");

  // Compile with solcjs
  try {
    // Clean build dir
    fs.mkdirSync("./scripts/build", { recursive: true });
    execSync(
      "npx -y solc --bin --abi --optimize -o ./scripts/build ./contracts/AureumEarningsVault.sol",
      { stdio: "inherit", cwd: process.cwd() }
    );
  } catch {
    console.error("❌ Compilation failed");
    process.exit(1);
  }

  // Read compiled artifacts (solcjs uses mangled filenames)
  const buildFiles = fs.readdirSync("./scripts/build");
  const abiFile = buildFiles.find((f) => f.endsWith(".abi"));
  const binFile = buildFiles.find((f) => f.endsWith(".bin"));

  if (!abiFile || !binFile) {
    console.error("❌ Could not find compiled artifacts in ./scripts/build");
    console.error("   Files found:", buildFiles);
    process.exit(1);
  }

  const abi = JSON.parse(
    fs.readFileSync(`./scripts/build/${abiFile}`, "utf8")
  );
  const bytecode =
    "0x" + fs.readFileSync(`./scripts/build/${binFile}`, "utf8").trim();

  console.log("✅ Compiled successfully");
  console.log(`   ABI entries: ${abi.length}`);
  console.log(`   Bytecode size: ${bytecode.length / 2} bytes`);

  // Connect to Sepolia
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const network = await provider.getNetwork();
  console.log(`\n🌐 Network: ${network.name} (chainId: ${network.chainId})`);

  const balance = await provider.getBalance(wallet.address);
  console.log(`💰 Deployer: ${wallet.address}`);
  console.log(`   Balance: ${ethers.formatEther(balance)} ETH`);

  if (balance === 0n) {
    console.error("❌ No Sepolia ETH! Get some from a faucet first.");
    process.exit(1);
  }

  // Deploy
  console.log("\n🚀 Deploying AureumEarningsVault to Sepolia...");
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();

  console.log(`📝 Tx hash: ${contract.deploymentTransaction().hash}`);
  console.log("⏳ Waiting for confirmation...");

  await contract.waitForDeployment();
  const deployedAddress = await contract.getAddress();

  console.log(`\n✅ AureumEarningsVault deployed to: ${deployedAddress}`);
  console.log(`\n🔗 Etherscan: https://sepolia.etherscan.io/address/${deployedAddress}`);

  // Save the address for the frontend
  fs.writeFileSync(
    "./scripts/deployed-address.json",
    JSON.stringify({ address: deployedAddress, network: "sepolia", chainId: 11155111 }, null, 2)
  );
  console.log("\n📁 Address saved to scripts/deployed-address.json");
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});
