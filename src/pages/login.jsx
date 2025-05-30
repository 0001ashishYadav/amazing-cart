import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/validateFormFields";
import { apiClient } from "../utils/apiClient";
import { setCookie } from "../utils/cookies";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { isLogin, setIsLogin } = useAuthContext();
  const navigate = useNavigate();
  console.log(isLogin);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");
    setValidationError({ email: "", password: "" });
    if (!validateEmail(email)) {
      setValidationError((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setValidationError((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }));
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiClient.login({ email, password });

      console.log(data);

      if (data.error) {
        alert(data.message);
        setError(data.message);
        setIsLoading(false);
        return;
      }

      const {
        access_token,
        refresh_token,
        refresh_token_expires_at,
        access_token_expires_at,
      } = data;

      const currentMilies = Date.now();
      const accesTokenExpiresAt = Date.parse(access_token_expires_at);
      const refreshTokenExpiresAt = Date.parse(refresh_token_expires_at);

      setCookie(
        "access_token",
        access_token,
        parseInt(`${(accesTokenExpiresAt - currentMilies) / 1000}`)
      );
      setCookie(
        "refresh_token",
        refresh_token,
        parseInt(`${(refreshTokenExpiresAt - currentMilies) / 1000}`)
      );
      setIsLogin(true);
      setEmail("");
      setPassword("");
      setValidationError({ email: "", password: "" });
      setError("");
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("Something went wrong. Please try again later.");
      setValidationError({ email: "", password: "" });
    }
  };

  return (
    // <section classNameName="bg-gray-100 min-h-screen flex box-border justify-center items-center">
    //   <div classNameName="bg-red-300 rounded-2xl flex max-w-3xl p-5 items-center">
    //     <div classNameName="md:w-1/2 px-8">
    //       <h2 classNameName="font-bold text-3xl text-[#002D74]">Login</h2>
    //       <p classNameName="text-sm mt-4 text-[#002D74]">
    //         If you already a member, easily log in now.
    //       </p>

    //       <form action="" classNameName="flex flex-col gap-4">
    //         <input
    //           classNameName="p-2 mt-8 rounded-xl border"
    //           type="email"
    //           name="email"
    //           placeholder="Email"
    //         />
    //         <div classNameName="relative">
    //           <input
    //             classNameName="p-2 rounded-xl border w-full"
    //             type="password"
    //             name="password"
    //             id="password"
    //             placeholder="Password"
    //           />
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="16"
    //             height="16"
    //             fill="gray"
    //             id="togglePassword"
    //             classNameName="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
    //             viewBox="0 0 16 16"
    //           >
    //             <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
    //             <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
    //           </svg>
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="16"
    //             height="16"
    //             fill="currentColor"
    //             classNameName="bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer hidden"
    //             id="mama"
    //             viewBox="0 0 16 16"
    //           >
    //             <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"></path>
    //             <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"></path>
    //           </svg>
    //         </div>
    //         <button
    //           classNameName="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
    //           type="submit"
    //         >
    //           Login
    //         </button>
    //       </form>
    //       <div classNameName="mt-6  items-center text-gray-100">
    //         <hr classNameName="border-gray-300" />
    //         <p classNameName="text-center text-sm">OR</p>
    //         <hr classNameName="border-gray-300" />
    //       </div>
    //       <button classNameName="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium">
    //         <svg
    //           classNameName="mr-3"
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 48 48"
    //           width="25px"
    //         >
    //           <path
    //             fill="#FFC107"
    //             d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    //           ></path>
    //           <path
    //             fill="#FF3D00"
    //             d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    //           ></path>
    //           <path
    //             fill="#4CAF50"
    //             d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    //           ></path>
    //           <path
    //             fill="#1976D2"
    //             d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    //           ></path>
    //         </svg>
    //         Login with Google
    //       </button>
    //       <div classNameName="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip">
    //         Forget password?
    //       </div>

    //       <div classNameName="mt-4 text-sm flex justify-between items-center container-mr">
    //         <p classNameName="mr-3 md:mr-0 ">If you don't have an account..</p>
    //         <button classNameName="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">
    //           Register
    //         </button>
    //       </div>
    //     </div>
    //     <div classNameName="md:block hidden w-1/2">
    //       <img
    //         classNameName="rounded-2xl max-h-[1600px]"
    //         src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
    //         alt="login form image"
    //       />
    //     </div>
    //   </div>
    // </section>
    <>
      {!isLogin && <p>Please Login .....</p>}
      <div className="flex items-center justify-center min-h-screen ">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-2xl from-red-200 via-red-300 to-red-200 bg-gradient-to-br"
        >
          <div className="max-w-md mx-auto space-y-3 ">
            <h3 className="text-lg font-semibold">&#128540; My Account</h3>
            <div>
              <label className="block py-1">Your email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border bg-white w-full py-2 px-2 rounded shadow border-none outline-none font-mono"
              />
              <p className="text-sm mt-2 px-2 hidden text-gray-600">
                Text helper
              </p>
            </div>
            <div>
              <label className="block py-1 ">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border bg-white w-full py-2 px-2 rounded shadow border-none outline-none font-mono"
              />
            </div>
            <div className="flex gap-3 pt-3 items-center">
              <button
                type="submit"
                className="border border-transparent px-4 py-2 rounded-lg shadow bg-white hover:bg-red-300 delay-100 hover:border-white"
              >
                Login
              </button>
              <a className="hover:text-white" href="#">
                Forgot Password
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
