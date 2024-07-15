"use client";

import MainLayout from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import {
  DollarSign,
  Loader,
  MapPin,
  Pin,
  SendHorizonal,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useWriteContract } from "wagmi";

interface IFormInput {
  pickup: string;
  delivery: string;
  package: string;
  price: number;
  distance: number;
}

const CreateProductPage: React.FC = () => {
  const mutation = useWriteContract();

  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    try {
      const requestData = {
        packageName: data.package,
        price: data.price,
        distance: data.distance,
      };

      await mutation.writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "createOrder",
        args: [
          requestData.packageName,
          requestData.price,
          requestData.distance,
        ],
      });
    } catch (error) {
      console.error(error);
      toast("An error occurred while creating the product 🚨");
      setLoading(false);
    }
  };

  if (mutation.isSuccess) {
    // reset();

    toast("Product created successfully 🎉");

    router.push("/");
  }

  if (mutation.isError) {
    toast("An error occurred while creating the product 🚨");
    setLoading(false);
  }

  return (
    <MainLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-4 gap-y-5 flex-1 h-full"
      >
        <div className="w-full flex-col">
          <label className="text-sm" htmlFor="pickup">
            Pick up Location
          </label>

          <div className="w-full flex-row items-center my-2 flex gap-x-3 ">
            <Pin size={24} className="text-neutral-500" />
            <Input
              id="pickup"
              className="w-full rounded-md "
              {...register("pickup", {
                required: "Pick up location is required",
              })}
            />
          </div>
          {errors.pickup && (
            <p className="text-red-500 text-xs">{errors.pickup.message}</p>
          )}
        </div>

        <div className="w-full flex-col">
          <label className="text-sm" htmlFor="delivery">
            Delivery Location
          </label>

          <div className="w-full flex-row items-center my-2 flex gap-x-3 ">
            <Truck size={24} className="text-neutral-500" />
            <Input
              id="delivery"
              className="w-full rounded-md "
              {...register("delivery", {
                required: "Delivery location is required",
              })}
            />
          </div>
          {errors.delivery && (
            <p className="text-red-500 text-xs">{errors.delivery.message}</p>
          )}
        </div>

        <div className="w-full flex-col">
          <label className="text-sm" htmlFor="package">
            Package Details
          </label>

          <div className="w-full flex-row items-center my-2 flex gap-x-3 ">
            <Truck size={24} className="text-neutral-500" />
            <Input
              id="package"
              className="w-full rounded-md "
              {...register("package", {
                required: "Package details are required",
              })}
            />
          </div>
          {errors.package && (
            <p className="text-red-500 text-xs">{errors.package.message}</p>
          )}
        </div>

        <div className="w-full flex-col">
          <label className="text-sm" htmlFor="price">
            Price
          </label>

          <div className="w-full flex-row items-center my-2 flex gap-x-3 ">
            <DollarSign size={24} className="text-neutral-500" />
            <Input
              id="price"
              type="number"
              className="w-full rounded-md "
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 1, message: "Price must be at least 1" },
              })}
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price.message}</p>
          )}
        </div>

        <div className="w-full flex-col">
          <label className="text-sm" htmlFor="distance">
            Distance (KM)
          </label>

          <div className="w-full flex-row items-center my-2 flex gap-x-3 ">
            <MapPin size={24} className="text-neutral-500" />
            <Input
              id="distance"
              type="number"
              className="w-full rounded-md "
              {...register("distance", {
                required: "Distance is required",
                valueAsNumber: true,
                min: { value: 1, message: "Distance must be at least 1 KM" },
              })}
            />
          </div>
          {errors.distance && (
            <p className="text-red-500 text-xs">{errors.distance.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full rounded-md bg-green-500 text-white font-semibold text-base p-2 flex flex-row gap-x-3"
        >
          {mutation.isPending ? (
            <Loader size={20} className="text-white animate-spin" />
          ) : (
            <>
              Create product
              <SendHorizonal size={20} className="text-white" />
            </>
          )}
        </Button>
      </form>
    </MainLayout>
  );
};

export default CreateProductPage;
