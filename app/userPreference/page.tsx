"use client";

import { useState } from "react";

export default function PreferencesForm() {
  const [form, setForm] = useState({
    gender_preference: "",
    age_min: "",
    age_max: "",
    radius_km: "",
    preferred_hobbies: [] as string[],
    preferred_habitat: "",
    smoking_preference: false,
    drinking_preference: false,
    education_level: "",
    occupation: "",
  });

  const hobbiesList = ["Reading", "Traveling", "Cooking", "Music", "Sports", "Gaming", "Art"];

  const getCookie = (cookieName: any) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return value;
      }
    }
    return null;
  };

  const userId = getCookie("user_id");

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleHobbySelection = (hobby: string) => {
    setForm((prevForm) => {
      const hobbies = prevForm.preferred_hobbies.includes(hobby)
        ? prevForm.preferred_hobbies.filter((h) => h !== hobby)
        : [...prevForm.preferred_hobbies, hobby];
      return { ...prevForm, preferred_hobbies: hobbies };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://duospace-backend.onrender.com/preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form, user_id: userId }),
        }
      );
      if (response.ok) {
        alert("Preferences submitted successfully!");
        setForm({
          gender_preference: "",
          age_min: "",
          age_max: "",
          radius_km: "",
          preferred_hobbies: [],
          preferred_habitat: "",
          smoking_preference: false,
          drinking_preference: false,
          education_level: "",
          occupation: "",
        });
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error submitting preferences:", error);
      alert("Failed to submit preferences.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4">
      <form
        className="bg-white shadow-xl rounded-lg p-8 max-w-xl w-full space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-bold text-gray-800 text-center">Preferences</h2>

        {/* Gender Preference */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium text-lg mb-2">Gender Preference</label>
          <select
            name="gender_preference"
            value={form.gender_preference}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
          >
            <option value="">Select Gender Preference</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
          </select>
        </div>

        {/* Age Range */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-800 font-medium text-lg mb-2">Min Age</label>
            <input
              type="number"
              name="age_min"
              value={form.age_min}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-medium text-lg mb-2">Max Age</label>
            <input
              type="number"
              name="age_max"
              value={form.age_max}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Radius */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium text-lg mb-2">Radius (km)</label>
          <input
            type="number"
            name="radius_km"
            value={form.radius_km}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Preferred Hobbies */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium text-lg mb-2">Preferred Hobbies</label>
          <div className="flex flex-wrap gap-2">
            {hobbiesList.map((hobby) => (
              <button
                type="button"
                key={hobby}
                onClick={() => toggleHobbySelection(hobby)}
                className={`px-4 py-2 border rounded-lg text-gray-800 focus:outline-none transition-all duration-300 ${
                  form.preferred_hobbies.includes(hobby)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {hobby}
              </button>
            ))}
          </div>
        </div>

        {/* Smoking Preference */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium text-lg mb-2">Smoking Preference</label>
          <select
            name="smoking_preference"
            value={form.smoking_preference.toString()}
            onChange={(e) =>
              handleInputChange({
                target: {
                  name: "smoking_preference",
                  value: e.target.value === "true",
                },
              })
            }
            className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
          >
            <option value="">Select Smoking Preference</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Drinking Preference */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium text-lg mb-2">Drinking Preference</label>
          <select
            name="drinking_preference"
            value={form.drinking_preference.toString()}
            onChange={(e) =>
              handleInputChange({
                target: {
                  name: "drinking_preference",
                  value: e.target.value === "true",
                },
              })
            }
            className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
          >
            <option value="">Select Drinking Preference</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Education Level */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium text-lg mb-2">Education Level</label>
          <select
            name="education_level"
            value={form.education_level}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
          >
            <option value="">Select Education Level</option>
            <option value="High School">High School</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Occupation */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium text-lg mb-2">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={form.occupation}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-3 px-4 rounded-lg text-lg hover:bg-blue-600 transition-all duration-300"
        >
          Submit Preferences
        </button>
      </form>
    </div>
  );
}
