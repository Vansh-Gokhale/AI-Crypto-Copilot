import "@nomicfoundation/hardhat-toolbox";

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/wn4XW-K9MzziCDNND8XhxR8hUAGBcoG8",
      accounts: [
        "e7a8691134f1e64df22cf82db9600b305486651285470ce260be6ecacd0150e4",
      ],
    },
  },
};
