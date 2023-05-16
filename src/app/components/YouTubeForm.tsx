"use client";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[]; //works only on numbers
  age: number;
  dob: Date;
};

const YouTubeForm = () => {
  const {
    reset,
    setValue,
    getValues,
    watch,
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      touchedFields,
      dirtyFields,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitSuccessful,
    },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""], //two empty strings for two phone numbers
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    mode: "onBlur",
  });

  //watching fields, if no argument, all will watch
  const watchUserName = watch(["username", "email"]);

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };

  //watch as subscription/for side effects
  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     //console.log(value);
  //   });

  //   return subscription.unsubscribe;
  // }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleGetValues = () => {
    console.log("getValues", getValues()); //getting all values
    console.log("getValues", getValues("social"));
    console.log("getValues", getValues(["social", "age"]));
  };

  const handleSetValue = () => {
    //setValue('username','')
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  return (
    <div className="flex flex-col min-w-full">
      <h1 className="my-10 text-2xl font-bold">YouTube Form</h1>
      <h2 className="text-xl font-semibold">Watching {watchUserName}</h2>

      <form
        className="flex flex-col max-w-md"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        {/* username */}
        <label htmlFor="username">Username</label>
        <input
          className="p-2"
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
        />
        <p className="text-rose-500">{errors.username?.message}</p>

        {/* email */}
        <label className="mt-5" htmlFor="email">
          E-mail
        </label>
        <input
          className="p-2"
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Invalid E-mail address",
            },
            //custom validation
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@gmail.com" ||
                  "Please enter different E-mail address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain not supported"
                );
              },
              // async validation
              emailAvailable: async (fieldValue) => {
                const response = await fetch(
                  `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                );
                const data = await response.json();
                return data.length === 0 || "Email already exist";
              },
            },
          })}
        />
        <p className="text-rose-500">{errors.email?.message}</p>

        {/* channel */}
        <label className="mt-5" htmlFor="channel">
          Channel
        </label>
        <input
          className="p-2"
          type="text"
          id="channel"
          {...register("channel", {
            required: {
              value: true,
              message: "Channel name is required",
            },
          })}
        />
        <p className="text-rose-500">{errors.channel?.message}</p>

        {/* social */}
        {/* twitter */}
        <label className="mt-5" htmlFor="twitter">
          Twitter
        </label>
        <input
          className="p-2"
          type="text"
          id="twitter"
          {...register("social.twitter", {
            //disabled:true, //disabling this field
            disabled: watch("channel") === "",
            required: {
              value: true,
              message: "Social account Twitter is required",
            },
          })}
        />
        <p className="text-rose-500">{errors.social?.twitter?.message}</p>

        {/* facebook */}
        <label className="mt-5" htmlFor="facebook">
          Facebook
        </label>
        <input
          className="p-2"
          type="text"
          id="facebook"
          {...register("social.facebook", {
            required: {
              value: true,
              message: "Social account Facebook is required",
            },
          })}
        />
        <p className="text-rose-500">{errors.social?.facebook?.message}</p>

        {/* phone numbers - working with arrays */}
        {/* primary */}
        <label className="mt-5" htmlFor="primary-phone">
          Primary Phone Number
        </label>
        <input
          className="p-2"
          type="text"
          id="primary-phone"
          {...register("phoneNumbers.0", {
            required: {
              value: true,
              message: "Primary Phone number is required",
            },
          })} //dot zero for 1st array elements
        />
        <p className="text-rose-500">{errors.phoneNumbers?.[0]?.message}</p>

        {/* secondary */}
        <label className="mt-5" htmlFor="secondary-phone">
          Secondary Phone Number
        </label>
        <input
          className="p-2"
          type="text"
          id="secondary-phone"
          {...register("phoneNumbers.1", {
            required: {
              value: true,
              message: "Secondary Phone number is required",
            },
          })} //dot zero for 1st array elements
        />
        <p className="text-rose-500">{errors.phoneNumbers?.[1]?.message}</p>

        {/* dynamic phone number */}
        <div className="mt-4">
          <label htmlFor="">List of phone Numbers</label>
          <div>
            {fields.map((field, index) => (
              <div className="my-2" key={field.id}>
                <input
                  className="p-2 w-full"
                  type="text"
                  {...register(`phNumbers.${index}.number`)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            {/* this will add new filed to pnNumber */}
            <button type="button" onClick={() => append({ number: "" })}>
              Add Phone Number
            </button>
          </div>
        </div>

        {/* age */}
        {/* channel */}
        <label className="mt-5" htmlFor="age">
          Age
        </label>
        <input
          className="p-2"
          type="number"
          id="age"
          {...register("age", {
            valueAsNumber: true, //for numerical values
            required: {
              value: true,
              message: "Age is required",
            },
          })}
        />
        <p className="text-rose-500">{errors.age?.message}</p>

        {/* dob */}
        <label className="mt-5" htmlFor="dob">
          Date of Birth
        </label>
        <input
          className="p-2"
          type="date"
          id="dob"
          {...register("dob", {
            valueAsDate: true,
            required: {
              value: true,
              message: "DOB name is required",
            },
          })}
        />
        <p className="text-rose-500">{errors.dob?.message}</p>

        {/* submit button */}
        <div className="mt-10">
          <button
            disabled={!isDirty || !isValid || isSubmitting}
            className="bg-blue-400 border py-2 px-4 rounded disabled:bg-gray-500"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleGetValues}
            className="bg-blue-400 border py-2 px-4 rounded"
          >
            Get Values
          </button>
          <button
            type="button"
            onClick={handleSetValue}
            className="bg-blue-400 border py-2 px-4 rounded"
          >
            Set Value
          </button>

          {/* reset button */}
          <button
            type="button"
            onClick={() => reset()}
            className="bg-blue-400 border py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default YouTubeForm;
