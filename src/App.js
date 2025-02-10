import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/")
      .then((response) => {
        setUserData(response.data.results[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!userData) {
    return <div className="flex justify-center items-center h-screen text-2xl">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-full max-w-5xl">

        {/* Left Side - Profile Image (40% Width on Large Screens) */}
        <div className="flex justify-center items-center w-full md:w-2/5 bg-black-100 p-4">
          <img
            src={userData.picture.large}
            alt="User"
            className="w-56 h-56 md:w-80 md:h-80 rounded-full object-cover"
          />
        </div>

        {/* Right Side - User Details (60% Width on Large Screens) */}
        <div className="flex flex-col justify-center w-full md:w-3/5 p-6 bg-green-100 text-white">

          {/* Name, Gender, Phone - Name Slightly Higher */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-6xl font-bold text-blue-600 mt-[-10px]">
              {userData.name.first} {userData.name.last}
            </h1>
            <p className="text-5xl text-fuchsia-500 font-semibold">
              Gender: {userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)}
            </p>
            <p className="text-5xl text-blue-500 font-semibold">
              Phone: {userData.phone}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
