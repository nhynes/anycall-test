// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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

contract AnyCallTest {
    event Success();

    address public immutable _anycall;
    uint256 public immutable _receiverChain;
    address public _receiver;

    constructor(address anycall, uint256 receiverChain) {
        _anycall = anycall;
        _receiverChain = receiverChain;
    }

    function setReceiver(address receiver) external {
        _receiver = receiver;
    }

    function echo() external payable {
        CallProxy(_anycall).anyCall{value: msg.value}(_receiver, "hi", _receiverChain, 0, "");
    }

    function anyExecute(bytes memory data) external returns (bool success, bytes memory result) {
        // (address from, uint256 fromChainId, ) = CallProxy(_anycall).context();
        // require(from == _receiver && fromChainId == _receiverChain, "wrong context");
        // bytes memory message = abi.decode(data, (bytes));
        // require(keccak256(message) == keccak256("hi"), "wrong message");
        emit Success();
        success = true;
        result = "";
    }
}
