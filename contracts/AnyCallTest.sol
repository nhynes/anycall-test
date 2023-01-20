// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface CallProxy {
    function anyCall(
        address _to,
        bytes calldata _data,
        uint256 _toChainID,
        uint256 _flags,
        bytes calldata _extdata
    ) external payable;

    function config() external view returns (address);

    function context()
        external
        view
        returns (
            address from,
            uint256 fromChainID,
            uint256 nonce
        );

    function executor() external view returns (address executor);
}

contract AnyCallTest is Ownable {
    event Success();

    address public immutable _anycall;
    uint256 public immutable _receiverChain;
    address public _receiver;

    constructor(address anycall, uint256 receiverChain) {
        _anycall = anycall;
        _receiverChain = receiverChain;
    }

    function setReceiver(address receiver) external onlyOwner {
        _receiver = receiver;
    }

    function echo() external onlyOwner {
        CallProxy(_anycall).anyCall(_receiver, "hello", _receiverChain, 2, "");
    }

    function anyExecute(bytes memory data) external returns (bool success, bytes memory result) {
        // (address from, uint256 fromChainId, ) = CallProxy(_anycall).context();
        // require(from == _receiver && fromChainId == _receiverChain, "wrong context");
        // bytes memory message = abi.decode(data, (bytes));
        // require(keccak256(message) == keccak256("hello"), "wrong message");
        emit Success();
        success = true;
        result = "";
    }
}
