import React from "react";

interface SingleCardProps {
  image: string;
  CardTitle: string;
  CardDescription: string;
  Button?: string;
  btnHref?: string;
}


const HomePage = () => {
  return (
    <section className="bg-gray-100 h-screen flex items-center justify-center p-4 dark:bg-dark">
      <SingleCard
        image="./logo.png"
        CardTitle="Welcome to Duospace..."
        CardDescription="Discover friendship, share your space, and connect with like-minded people."
        Button="Continue"
        btnHref="/register"
      />
    </section>
  );
};

export default HomePage;

const SingleCard = ({
  image,
  CardTitle,
  CardDescription,
  Button,
  btnHref,
}: SingleCardProps) => {
  return (
    <div className="w-full max-w-sm rounded-lg bg-white shadow-lg duration-300 hover:shadow-2xl dark:bg-dark-2">
      {/* Image */}
      <img src={image} alt="Welcome" className="w-full h-48 object-cover rounded-t-lg" />

      {/* Content */}
      <div className="p-6 text-center">
        {/* Title */}
        <h3 className="mb-4 text-xl text-gray-800 dark:text-sky-400">
          {CardTitle}
        </h3>

        {/* Description */}
        <p className="mb-6 text-base text-gray-600 dark:text-gray-400">
          {CardDescription}
        </p>

        {/* Button */}
        {Button && (
          <a
            href={btnHref}
            className="inline-block rounded-lg bg-sky-500 px-6 py-2 text-white font-medium transition hover:bg-sky-600"
          >
            {Button}
          </a>
        )}
      </div>
    </div>
  );
};
