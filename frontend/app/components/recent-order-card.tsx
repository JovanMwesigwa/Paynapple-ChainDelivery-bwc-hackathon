import { Button } from "@/components/ui/button";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { ArrowRight, Box, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useWriteContract } from "wagmi";

const RecentOrderCard = ({ item }: { item: any }) => {
  const [loading, setLoading] = React.useState(false);
  const mutation = useWriteContract();

  const router = useRouter();

  const getStatus = (status: string | number) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Processing";
      case 2:
        return "Delivered";
      default:
        return "Pending";
    }
  };

  if (!item.packageName) return null;

  const handleDeliver = async () => {
    setLoading(true);
    try {
      await mutation.writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "pickUpOrder",
        args: [item.id],
      });
    } catch (error) {
      toast("An error occurred");
      setLoading(false);
    }
  };

  if (mutation.isSuccess) {
    router.push(`/map/${item.id}`);

    toast("Order picked up successfully");
  }

  if (mutation.isError) {
    toast("An error occurred");
    setLoading(false);
  }

  return (
    <div className="w-full h-20 px-4 bg-green-100 rounded-lg flex flex-row items-center mb-4">
      <div className="size-12 bg-white rounded-full flex items-center justify-center">
        <Box size={24} className="text-green-500" />
      </div>
      <div className="flex flex-col ml-2">
        <h1 className="text-sm font-semibold">{item.packageName}</h1>
        <p className="text-xs  font-thin">
          Distance: {item.distance.toString()} KM
        </p>
        <p className="text-xs  font-thin">Status: {getStatus(item.status)}</p>
      </div>

      <Button
        disabled={mutation.isPending}
        onClick={handleDeliver}
        className="ml-auto text-blue-500 font-semibold flex flex-row items-center"
        variant="ghost"
      >
        {mutation.isPending ? (
          <Loader className="animate-spin text-blue-500" />
        ) : (
          <>
            Deliver
            <ArrowRight size={16} className="ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};

export default RecentOrderCard;
