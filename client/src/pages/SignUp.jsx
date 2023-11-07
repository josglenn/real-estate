import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-6">Sign Up</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="text"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          autoComplete="off"
        />
        <button className="bg-slate-700 text-white uppercase p-3 disabled:opacity-70 rounded-lg hover:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>
          Have an account?
          <span className="text-blue-700">
            <Link to={"/sign-in"}> Sign In</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
