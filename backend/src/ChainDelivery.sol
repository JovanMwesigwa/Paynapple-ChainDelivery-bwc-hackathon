// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ChainDelivery {
    error ChainDelivery__OrderNotPending();

    event Created(
        uint256 orderId,
        string packageName,
        address customer,
        uint256 price
    );

    event PickedUp(uint256 orderId, address courier);
    event Delivered(uint256 orderId);

    enum Status {
        Pending,
        InTransit,
        Delivered
    }

    struct Order {
        uint256 id;
        string packageName;
        address customer;
        address courier;
        uint256 distance;
        Status status;
        uint256 price;
    }

    struct Courier {
        address courier;
        uint256[] orders;
        CourierRatings[] ratings;
    }

    struct CourierRatings {
        string comment;
        uint256 rating;
    }

    address private i_owner;

    mapping(uint256 => Order) private s_orders; // Fixed mapping syntax
    mapping(address => uint256[]) private s_customerOrders; // Fixed mapping syntax
    mapping(address => uint256[]) private s_courierOrders; // Fixed mapping syntax

    uint256 public s_orderCount = 0;

    constructor() {
        i_owner = msg.sender;
    }

    // Setters
    // Create a new order
    function createOrder(
        string memory _packageName,
        uint256 _price,
        uint256 _distance
    ) public {
        uint256 orderId = s_orderCount += 1;

        s_orders[orderId] = Order({
            id: orderId,
            packageName: _packageName,
            customer: msg.sender,
            courier: address(0),
            distance: _distance,
            status: Status.Pending,
            price: _price
        });

        s_customerOrders[msg.sender].push(orderId);

        emit Created(orderId, _packageName, msg.sender, _price);
    }

    function pickUpOrder(uint256 _orderId) public {
        Order storage order = s_orders[_orderId];

        if (order.status != Status.Pending) {
            revert ChainDelivery__OrderNotPending();
        }

        order.courier = msg.sender;
        order.status = Status.InTransit;

        s_courierOrders[msg.sender].push(_orderId);

        emit PickedUp(_orderId, msg.sender);
    }

    function deliverOrder(uint256 _orderId) public {
        Order storage order = s_orders[_orderId];

        if (order.status != Status.InTransit) {
            revert ChainDelivery__OrderNotPending();
        }

        order.status = Status.Delivered;

        emit Delivered(_orderId);
    }

    // Getters
    function getCourierOrders(
        address courier
    ) public view returns (uint256[] memory) {
        return s_courierOrders[courier];
    }

    function getCustomerOrders(
        address customer
    ) public view returns (uint256[] memory) {
        return s_customerOrders[customer];
    }

    function getUserOrders() public view returns (uint256[] memory) {
        return s_customerOrders[msg.sender];
    }

    function getOrder(uint256 orderId) public view returns (Order memory) {
        return s_orders[orderId];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }
}
