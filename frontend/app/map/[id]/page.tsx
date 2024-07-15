"use client";

import { Button } from "@/components/ui/button";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import useFetchOrder from "@/hooks/graphql/useFetchOrder";
import useFetchItemsWithArgs from "@/hooks/queries/useFetchItemWithArgs";
import GoogleMapReact from "google-map-react";
import { ArrowLeft, ConciergeBell, Loader, Phone, Truck } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWriteContract } from "wagmi";

const OrderMapPage = () => {
  const { id } = useParams();

  const router = useRouter();

  const mutation = useWriteContract();

  const { data, error, isLoading, isError } = useFetchOrder(id.toString());

  const defaultProps = {
    center: {
      lat: 0.0783686,
      lng: 32.4757764,
    },
    zoom: 15,
  };

  const handleDeliver = async () => {
    try {
      await mutation.writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "deliverOrder",
        args: [Number(id)],
      });
    } catch (error) {
      toast("An error occurred");
    }
  };

  if (mutation.isSuccess) {
    router.push(`/`);

    toast("Order was delivered successfully");
  }

  if (mutation.isError) {
    toast("An error occurred");
  }

  if (!id) {
    router.push("/");
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader size={24} className="animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!isLoading && !data && !isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-lg font-semibold text-neutral-400">
          No order found
        </h1>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <div className="w-full h-24 flex flex-row items-center justify-between absolute top-0 right-0 left-0 z-40 px-4">
        <Link
          href="/"
          className="size-14 bg-white shadow-md rounded-full flex items-center justify-center"
        >
          <ArrowLeft size={24} />
        </Link>

        <div className="bg-white px-6 p-4 rounded-full flex items-center justify-center shadow-md">
          <div className="flex flex-col items-center">
            <h3 className="text-base font-semibold">
              {(data as { packageName: string }).packageName}
            </h3>
            {/* <h1 className="text-xs font-bold">
              Order: #{(data as { id: string }).id.toString()}
            </h1> */}
          </div>
        </div>

        <div className=""></div>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAPS_API! }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
      <div className="w-full bg-white z-50 p-5 justify-between flex flex-col shadow-md h-60 absolute bottom-0 right-0 left-0 rounded-t-xl gap-y-4">
        <h1 className="text-base font-semibold">Package information</h1>

        <div className="w-full h-full rounded-lg bg-orange-100 flex-row flex items-center justify-between">
          <div className="flex w-full flex-col p-4">
            <h4 className="text-xs text-neutral-400">From:</h4>
            <p className="text-sm font-semibold">Gombe Kyaliwajala</p>
          </div>

          <div className="h-2/3 w-[1px] bg-neutral-400" />

          <div className="flex w-full flex-col p-4">
            <h4 className="text-xs text-neutral-400">Delivery to:</h4>
            <p className="text-sm font-semibold ">Kawempe Lugoba, Kampala</p>
          </div>
        </div>

        <div className="w-full h-full rounded-lg bg-green-100 flex-row flex items-center justify-between">
          <div className="flex  flex-row p-4">
            <div className=" size-10 mr-4 bg-yellow-400 flex items-center justify-center rounded-full">
              <Truck size={22} color="#fff" />
            </div>

            <div className="flex flex-col">
              <h4 className="text-xs text-neutral-400">Courier</h4>
              <p className="text-sm font-semibold">
                {(data as { courier: string }).courier.slice(0, 3)}...
                {(data as { courier: string }).courier.slice(-3)}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={handleDeliver}
            disabled={mutation.isPending}
            className=" mr-4 bg-green-500 flex items-center justify-center rounded-md"
          >
            {mutation.isPending ? (
              <Loader size={20} color="#fff" className="animate-spin" />
            ) : (
              <ConciergeBell size={20} color="#fff" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderMapPage;
