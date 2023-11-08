import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-6">Sign In</h1>
      {error && <p className="text-red-500 text-center my-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white uppercase p-3 disabled:opacity-70 rounded-lg hover:opacity-80"
        >
          {loading ? "loading.." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>
          Dont Have an account?
          <span className="text-blue-700">
            <Link to={"/sign-up"}> Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
