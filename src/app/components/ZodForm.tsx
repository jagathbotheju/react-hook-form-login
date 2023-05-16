"use client";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/**
 * npm i zod
 * npm i @hookform/resolvers
 */

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  channel: z.string().nonempty("Channel is required"),
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const ZodForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };

  return (
    <div className="flex flex-col min-w-full">
      <h1 className="my-10 text-2xl font-bold">Zod Form</h1>

      <form
        className="flex flex-col max-w-md"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* username */}
        <label htmlFor="username">Username</label>
        <input
          className="p-2"
          type="text"
          id="username"
          {...register("username")}
        />
        <p className="text-rose-500">{errors.username?.message}</p>

        {/* email */}
        <label className="mt-5" htmlFor="email">
          E-mail
        </label>
        <input className="p-2" type="email" id="email" {...register("email")} />
        <p className="text-rose-500">{errors.email?.message}</p>

        {/* channel */}
        <label className="mt-5" htmlFor="channel">
          Channel
        </label>
        <input
          className="p-2"
          type="text"
          id="channel"
          {...register("channel")}
        />
        <p className="text-rose-500">{errors.channel?.message}</p>

        {/* submit button */}
        <div className="mt-10">
          <button
            disabled={!isDirty || !isValid || isSubmitting}
            className="bg-blue-400 border py-2 px-4 rounded disabled:bg-gray-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ZodForm;
