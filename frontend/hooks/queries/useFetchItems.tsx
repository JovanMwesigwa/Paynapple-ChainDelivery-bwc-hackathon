import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { useReadContract } from "wagmi";

const useFetchItems = ({ functionName }: { functionName: string }) => {
  const result = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: functionName,
  });

  return {
    ...result,
  };
};

export default useFetchItems;
