import assert from "assert";
import { BigNumber } from "ethers";
import {
  CreatedLog,
  CreateOrderTransaction,
  DeliveredLog,
  DeliverOrderTransaction,
  PickedUpLog,
  PickUpOrderTransaction,
} from "../types/abi-interfaces/ChaindelAbi";
import { Created, Delivered, Order, PickedUp } from "../types";

// Type guard to check if log is CreatedLog
function isCreatedLog(log: any): log is CreatedLog {
  return (
    log.args &&
    log.args.orderId !== undefined &&
    log.args.packageDescription !== undefined
  );
}

// Type guard to check if log is DeliveredLog
function isDeliveredLog(log: any): log is DeliveredLog {
  return (
    log.args && log.args.orderId !== undefined && log.args.courier === undefined
  );
}

// Type guard to check if log is PickedUpLog
function isPickedUpLog(log: any): log is PickedUpLog {
  return (
    log.args && log.args.orderId !== undefined && log.args.courier !== undefined
  );
}

export async function handleLog(
  log: CreatedLog | DeliveredLog | PickedUpLog
): Promise<void> {
  logger.info(`New event log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  if (isCreatedLog(log)) {
    const createdEvent = Created.create({
      id: log.transactionHash,
      blockHeight: BigInt(log.blockNumber),
      orderId: BigInt(log.args.orderId.toString()),
      packageDescription: log.args.packageName,
      customer: log.args.customer,
      price: BigInt(log.args.price.toString()),
      contractAddress: log.address,
    });

    await createdEvent.save();

    // Save Order entity
    const order = Order.create({
      id: log.args.orderId.toString(),
      packageDescription: log.args.packageName,
      customer: log.args.customer,
      courier: "",
      distance: BigInt(0), // Default value, update if available
      status: "Pending",
      price: BigInt(log.args.price.toString()),
      blockHeight: BigInt(log.blockNumber),
    });

    await order.save();
  } else if (isDeliveredLog(log)) {
    const deliveredEvent = Delivered.create({
      id: log.transactionHash,
      blockHeight: BigInt(log.blockNumber),
      orderId: BigInt(log.args.orderId.toString()),
      contractAddress: log.address,
    });

    await deliveredEvent.save();

    // Update Order status
    const order = await Order.get(log.args.orderId.toString());
    if (order) {
      order.status = "Delivered";
      await order.save();
    }
  } else if (isPickedUpLog(log)) {
    const pickedUpEvent = PickedUp.create({
      id: log.transactionHash,
      blockHeight: BigInt(log.blockNumber),
      orderId: BigInt(log.args.orderId.toString()),
      courier: log.args.courier,
      contractAddress: log.address,
    });

    await pickedUpEvent.save();

    // Update Order status
    const order = await Order.get(log.args.orderId.toString());
    if (order) {
      order.courier = log.args.courier;
      order.status = "InTransit";
      await order.save();
    }
  }
}

export async function handleTransaction(
  tx: CreateOrderTransaction | DeliverOrderTransaction | PickUpOrderTransaction
): Promise<void> {
  logger.info(`New transaction at block ${tx.blockNumber}`);
  assert(tx.args, "No tx.args");

  // Handle specific logic for each transaction type if necessary
}
