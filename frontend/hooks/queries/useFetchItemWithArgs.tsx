import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { useReadContract } from "wagmi";

const useFetchItemsWithArgs = ({
  functionName,
  args,
}: {
  functionName: string;
  args: any;
}) => {
  const result = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: functionName,
    args: args,
  });

  return {
    ...result,
  };
};

export default useFetchItemsWithArgs;
