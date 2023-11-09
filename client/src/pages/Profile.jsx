import { useState } from "react";

import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-5">Profile</h1>
      {/* {error && <p className="text-red-500 text-center my-2">{error}</p>} */}
      <form onSubmit={() => {}} className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          className="w-24 h-24 rounded-full self-center object-cover mb-3 cursor-pointer"
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={() => {}}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={() => {}}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={() => {}}
          required
          autoComplete="off"
        />
        <button className="bg-slate-700 text-white uppercase p-3 disabled:opacity-70 rounded-lg hover:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between my-4">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer ">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
