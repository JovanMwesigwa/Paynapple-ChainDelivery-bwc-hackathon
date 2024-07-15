// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {ChainDelivery} from "../src/ChainDelivery.sol";

contract DeployChainDelivery is Script {
    // function setUp() public {}

    function deploy() public returns (ChainDelivery) {
        vm.startBroadcast();
        ChainDelivery chainDelivery = new ChainDelivery();

        vm.stopBroadcast();

        return chainDelivery;
    }

    function run() external returns (ChainDelivery) {
        return deploy();
    }
}
