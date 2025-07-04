import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
          404
        </h1>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/erp-v2/dashboard"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back dashboard
          </Link>
          <a href="#" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
    // <section className="bg-white dark:bg-gray-900">
    //   <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    //     <div className="mx-auto max-w-screen-sm text-center">
    //       <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
    //         404
    //       </h1>
    //       <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white ">
    //         somethings missing
    //       </p>
    //       <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
    //         sorry, we cant find that page
    //       </p>
    //       <Link
    //         className="btn btn-primary uppercase "
    //         href={`/erp-v2/dashboard`}
    //       >
    //         go back to dashboard
    //       </Link>
    //     </div>
    //   </div>
    // </section>
  );
};

export default NotFoundPage;
