import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?page=1&results=1&seed=abc"
        );
        setUser(response.data.results[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div className="text-center mt-8 animate-pulse text-xl text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white rounded-lg shadow-2xl p-8 flex items-center w-[900px]">
        {/* Left Side - Profile Image */}
        <div className="w-48 h-48 rounded-lg bg-blue-600 flex justify-center items-center p-2">
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            className="w-44 h-44 rounded-lg border-4 border-white"
          />
        </div>
        
        {/* Right Side - User Details */}
        <div className="flex flex-col space-y-4 text-black bg-gray-100 p-6 rounded-lg flex-1 ml-6">
          <div className="flex space-x-3 text-3xl font-bold text-blue-800">
            <h2>{user.name.first}</h2>
            <h2>{user.name.last}</h2>
          </div>
          <p className="text-2xl text-green-600">
            Gender: {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
          </p>
          <p className="text-2xl text-pink-500">Phone: {user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
