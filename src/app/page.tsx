"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { setCookies } from "@/server/action/setCookies";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import ModalForgot from "./_components/ModalForgot";
import Image from "next/image";
import ImageLogo from "./images/draw2.webp";
// import Image from "next/image";
// import LoadingPage from "@/components/Loading/LoadingPage";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
// import LoadingLogin from "@/components/Loading/LoadingLogin";

export default function Home() {
  const router = useRouter();
  // const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [loginAttempts, setLoginAttempts] = useState(0);
  const [loadingSuccess, setLoadingSuccess] = useState(false);

  const { mutate: login } = useMutation({
    mutationFn: (data: { username: string; password: string }) => {
      const config = {
        // url: `http://192.168.0.249:8001/api/v1/users/login/`,
        url: `${process.env.baseUrl}/api/v1/users/login/`,
        method: "POST",
        data,
      };
      return axios.request(config);
    },
  });
  if (loadingSuccess) {
    return <LoadingSpinner />;
    // return <LoadingLogin />;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="flex flex-col-reverse lg:flex-row items-center w-full max-w-6xl dark:bg-gray-800 rounded-lg overflow-hidden">
        {/* <div className="flex flex-col-reverse lg:flex-row items-center w-full max-w-6xl shadow-lg bg-white dark:bg-gray-800 rounded-lg overflow-hidden"> */}
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          {/* <Image
            src="/images/draw2.jpg"
            format="webp"
            // src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full h-full object-cover"
            alt="Login visual"
          /> */}
          <Image
            src={ImageLogo}
            alt="Logo"
            width={200}
            height={200}
            className="w-full h-full object-cover"
            // format="webp"
          />
          {/* <Image
            src="/images/logo.png"
            alt="Login visual"
            width={44} // or your preferred size
            height={44}
            className="w-full h-full object-cover"
          /> */}
        </div>
        {/* <Image
          src="/images/logo.png"
          alt="Description of image"
          width={44}
          height={44}
        /> */}

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            {/* Sign in to your account */}
            ERP
          </h1>

          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              login(values, {
                // onSuccess: (data) => {
                //   setCookies("token", data.data.token);
                //   router.push("/erp-v2/dashboard");
                //   // <LoadingPage />;
                // },
                onSuccess: (data) => {
                  setLoadingSuccess(true);
                  setCookies("token", data.data.token);
                  setTimeout(() => {
                    router.push("/erp-v2/dashboard");
                  }, 1000);
                },
                onError: (error) => {
                  if (error instanceof AxiosError) {
                    if (error.code === "ERR_NETWORK") {
                      setErrorMessage("Network error. Please try again.");
                    } else if (error.status === 401) {
                      setErrorMessage("Username or password is incorrect.");
                    } else {
                      setErrorMessage("Something went wrong. Try again.");
                    }
                  }
                  // if (error instanceof AxiosError) {
                  //   if (error.code === "ERR_NETWORK") {
                  //     setErrorMessage("Network error. Please try again.");
                  //   } else if (error.response?.status === 401) {
                  //     const newAttempts = loginAttempts + 1;
                  //     setLoginAttempts(newAttempts);

                  //     if (newAttempts === 1) {
                  //       setErrorMessage("Username or password is incorrect.");
                  //     } else if (newAttempts === 2) {
                  //       setErrorMessage(
                  //         "Still wrong. Please check your credentials."
                  //       );
                  //     } else if (newAttempts === 3) {
                  //       setErrorMessage("mali nga.");
                  //     } else if (newAttempts === 4) {
                  //       setErrorMessage("pupunta nako sa admin pag ganyan.");
                  //     } else {
                  //       setErrorMessage(
                  //         // "Multiple failed attempts. Please try again later or reset your password."
                  //         "bahala ka dyan"
                  //       );
                  //     }
                  //   } else {
                  //     setErrorMessage("Something went wrong. Try again.");
                  //   }
                  // }
                },
                onSettled: () => setSubmitting(false),
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {errorMessage && (
                  <div className="text-sm text-red-600 bg-red-100 p-3 rounded">
                    {errorMessage}
                  </div>
                )}

                {/* Input Fields */}
                {[
                  {
                    type: "text",
                    name: "username",
                    placeholder: "Enter your username",
                    label: "Username",
                  },
                  {
                    type: "password",
                    name: "password",
                    placeholder: "Enter your password",
                    label: "Password",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block mb-1 text-sm font-medium text-gray-700 dark:text-white"
                    >
                      {field.label}
                    </label>
                    <Field
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox"
                    />

                    <span>Remember me</span>
                  </label>
                  {/* <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Forgot password?
                  </a> */}
                  <ModalForgot />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 uppercase hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
