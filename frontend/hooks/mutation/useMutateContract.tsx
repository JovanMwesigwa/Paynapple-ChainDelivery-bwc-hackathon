import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { useWriteContract } from "wagmi";

const useMutateContract = ({
  functionName,
  args,
}: {
  functionName: string;
  args: any;
}) => {
  const mutation = useWriteContract();

  const request = async () => {
    mutation.writeContract({
      abi: CONTRACT_ABI,
      address: CONTRACT_ADDRESS,
      functionName: functionName,
      args: args,
    });
  };

  return {
    request,
    mutation,
  };
};

export default useMutateContract;
