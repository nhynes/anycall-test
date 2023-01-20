// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface AnyCallConfig {
    function deposit(address _account) external payable;

    function withdraw(uint256 _amount) external;
}
