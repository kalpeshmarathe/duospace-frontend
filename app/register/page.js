"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [location, setLocation] = useState("");
  const [apiResponse, setApiResponse] = useState(null); // State for API response
  const [loading, setLoading] = useState(false); // Loading state
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Geolocation function
  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          setLatitude(latitude);
          const longitude = position.coords.longitude;
          setLongitude(longitude);
          setLocation(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Submit Form Function with API Integration
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("https://duospace-backend.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, latitude, longitude }), // Combine form data and location
      });

      const result = await response.json();

      if (response.ok) {
        setApiResponse({ success: true, message: "Registration successful!" });
      } else {
        setApiResponse({ success: false, message: result.message || "Registration failed" });
      }
    } catch (error) {
      console.error("API Error:", error);
      setApiResponse({ success: false, message: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Username</label>
              <input
                {...register("username", { required: true })}
                placeholder="Enter your username"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-800 placeholder-gray-400"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">Username is required</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="info@yourmail.com"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-800 placeholder-gray-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-800 placeholder-gray-400"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", { required: true })}
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-800 placeholder-gray-400"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">Confirm password is required</p>
              )}
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-600">Bio</label>
              <textarea
                {...register("bio")}
                placeholder="Write a short bio about yourself"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-600">Location</label>
              <div className="flex">
                <input
                  value={location}
                  readOnly
                  placeholder="Latitude, Longitude"
                  className="w-full px-3 py-2 border rounded-l focus:outline-none text-gray-800 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={getGeolocation}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-200"
                >
                  Get Location
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded text-white ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 transition duration-200"
              }`}
            >
              {loading ? "Submitting..." : "Register"}
            </button>
          </div>
        </form>

        {/* API Response */}
        {apiResponse && (
          <div
            className={`mt-4 p-3 rounded ${
              apiResponse.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {apiResponse.message}
          </div>
        )}
      </div>
    </div>
  );
}
