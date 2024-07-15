// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {ChainDelivery} from "../src/ChainDelivery.sol";
import {DeployChainDelivery} from "../script/DeployChainDelivery.s.sol";

contract ChainDeliveryTest is Test {
    ChainDelivery public chainDelivery;

    uint256 public constant PRICE = 1 ether;
    uint256 public constant USER_START_BALANCE = 10 ether;
    string public constant PACKAGE_NAME = "Test Package";
    uint256 public constant DISTANCE = 2;

    address public USER;
    address public COURIER = address(2);

    function setUp() public {
        DeployChainDelivery deployer = new DeployChainDelivery();
        chainDelivery = deployer.deploy();

        vm.deal(USER, USER_START_BALANCE);
    }

    function testCreateOrder() public {
        chainDelivery.createOrder(PACKAGE_NAME, PRICE, DISTANCE);

        ChainDelivery.Order memory order = chainDelivery.getOrder(1);

        assertEq(order.id, 1);
    }

    function testPickupOrder() public {
        chainDelivery.createOrder(PACKAGE_NAME, PRICE, DISTANCE);

        vm.startPrank(COURIER);
        chainDelivery.pickUpOrder(1);
        vm.stopPrank();

        // Get the courier's orders
        uint256[] memory orderIds = chainDelivery.getCourierOrders(COURIER);

        ChainDelivery.Order[] memory orders = new ChainDelivery.Order[](
            orderIds.length
        );

        for (uint256 i = 0; i < orderIds.length; i++) {
            orders[i] = chainDelivery.getOrder(orderIds[i]);
        }

        assertEq(orders.length, 1);
    }

    function testDeliverOrder() public {
        chainDelivery.createOrder(PACKAGE_NAME, PRICE, DISTANCE);

        vm.startPrank(COURIER);
        chainDelivery.pickUpOrder(1);
        vm.stopPrank();

        chainDelivery.deliverOrder(1);

        ChainDelivery.Order memory order = chainDelivery.getOrder(1);

        // assertEq(order.status, ChainDelivery.Status.Delivered);
    }
}
