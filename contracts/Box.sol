// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {
    uint256 private _value;

    event ValueChanged(uint256 value);

    constructor() Ownable(msg.sender) {}

    function store(uint256 value) public onlyOwner {
      _value = value;
      emit ValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
        return _value;
    }
}
