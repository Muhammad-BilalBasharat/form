// "use client";
// import {useForm} from "react-hook-form";
// export default function Home() {
//   const { register, handleSubmit,setError, formState:{errors, isSubmitting}} = useForm();
//   const Delay = (sec) => {
//     return  new Promise((resolve,reject) => {
//       setTimeout(() => resolve(), sec * 1000);
//     });
//   }
//   const onSubmit =async (data) => {
//     await Delay(4),
//     console.log(data)
//     if(data.username !== "admin") {
//       setError("myform", {message: "Username or password is incorrect"})
//     }
//   };
//   return (
//     <>
// <form onSubmit={handleSubmit(onSubmit)}>  
//   <input {...register("username",{ required: {value:true,message:"This field is required"},minLength:{value:4,message:"Min length is 4"}, maxLength:{value:8,message:"Max length is 8"}})} type="username" />
//   {errors.username && <div>{errors.username.message}</div>}
//   <br />
//   <input {...register("password",{ required: {value:true,message:"This field is required"}, minLength:{value:8,message:"Min length is 8"},maxLength:{value:14,message:"Max length is 14"} })} type="password" />
//   {errors.password && <div>{errors.password.message}</div>}
//   <br />
//   <input disabled={isSubmitting} type="submit" />
//   {errors.myform && <div>{errors.myform.message}</div>}
// </form>
// {isSubmitting && <div>Submitting...</div>}
// </>
//   );
// }


"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  // Add loading state to handle client/server mismatch
  const [isClient, setIsClient] = useState(false);
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm();

  // Use useEffect to indicate client-side rendering
  useState(() => {
    setIsClient(true);
  }, []);

  const Delay = (sec) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), sec * 1000);
    });
  };

  const onSubmit = async (data) => {
    await Delay(2);
    console.log(data);
    if (data.username !== "admin") {
      setError("myform", { message: "Username or password is incorrect" });
    }
  };

  // Return null or loading state while client-side code hasn't loaded
  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            className="w-full p-2 border rounded"
            {...register("username", {
              required: { value: true, message: "This field is required" },
              minLength: { value: 4, message: "Min length is 4" },
              maxLength: { value: 8, message: "Max length is 8" }
            })}
            type="text"
            placeholder="Username"
          />
          {errors.username && (
            <div className="text-red-500 text-sm mt-1">{errors.username.message}</div>
          )}
        </div>

        <div>
          <input
            className="w-full p-2 border rounded"
            {...register("password", {
              required: { value: true, message: "This field is required" },
              minLength: { value: 8, message: "Min length is 8" },
              maxLength: { value: 14, message: "Max length is 14" }
            })}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          Submit
        </button>

        {errors.myform && (
          <div className="text-red-500 text-sm">{errors.myform.message}</div>
        )}

        {isSubmitting && (
          <div className="text-blue-500 text-sm">Submitting...</div>
        )}
      </form>
    </div>
  );
}