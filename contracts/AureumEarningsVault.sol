// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title AureumEarningsVault
 * @dev Manages spendable DeFi yield directly linked to the user's OrbitX Virtual Card.
 */
contract AureumEarningsVault {
    mapping(address => uint256) public spendableEarnings;
    mapping(address => bool) public isLinkedToOrbitX;

    event EarningsDeposited(address indexed user, uint256 amount);
    // ... event for OrbitX spend trigger
    event OrbitXSpend(address indexed user, uint256 amount, string cardLast4);

    /**
     * @dev User deposits their accrued Aave/DeFi earnings into the Spendable Vault.
     */
    function depositEarnings() external payable {
        spendableEarnings[msg.sender] += msg.value;
        emit EarningsDeposited(msg.sender, msg.value);
    }

    /**
     * @dev Link the vault to an OrbitX card.
     */
    function linkOrbitXCard() external {
        isLinkedToOrbitX[msg.sender] = true;
    }

    /**
     * @dev Trigger a spend from the earnings vault via OrbitX.
     * This would typically be called by the OrbitX relayer/gateway.
     */
    function spendViaOrbitX(uint256 amount, string calldata cardLast4) external {
        require(isLinkedToOrbitX[msg.sender], "Card not linked");
        require(spendableEarnings[msg.sender] >= amount, "Insufficient earnings");

        spendableEarnings[msg.sender] -= amount;
        emit OrbitXSpend(msg.sender, amount, cardLast4);
    }

    function getSpendableEarnings(address user) external view returns (uint256) {
        return spendableEarnings[user];
    }
}
