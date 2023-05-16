"use client";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/**
 * npm i yup
 * npm i @hookform/resolvers
 */

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  channel: yup.string().required("Channel is required"),
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YupForm = () => {
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
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };

  return (
    <div className="flex flex-col min-w-full">
      <h1 className="my-10 text-2xl font-bold">Yup Form</h1>

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

export default YupForm;
