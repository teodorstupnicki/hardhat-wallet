// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./access-control/Auth.sol";

contract Box {
    uint256 private _value;
    Auth private _auth;

    event ValueChanged(uint256 value);

    constructor() {
      _auth = new Auth(msg.sender);
    }

    function store(uint256 value) public {
      // Require that the caller is registered as an administrator in Auth
      require(_auth.isAdministrator(msg.sender), "Unauthorized");
      
      _value = value;
      emit ValueChanged(value);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return _value;
    }
}
