import Lottie from "lottie-react";
import { useForm } from "react-hook-form";

import authAnimation from "./../assets/auth-animation.json";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { BiSolidHide } from "react-icons/bi";

const Login = () => {
  const [isPassShown, setIsPassShown] = useState(false);

  const navigate = useNavigate();
  const { user, loading, signIn } = useAuth();

  useEffect(() => {
    if(!loading && user) {
      return navigate('/');
    }
  }, [loading, navigate, user]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = data => {
    const email = data?.email;
    const password = data?.password;

    signIn(email, password)
      .then(() => {
        toast.success('User Logged In Successfully!');
        reset();
        return navigate('/');
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <main className="my-20 px-7 lg:px-4 xl:px-0 w-full lg:max-w-[1200px] mx-auto">
      <section className="pt-20 pb-0 px-4 md:px-12 lg:p-16 bg-[#F5F5F5] flex flex-col-reverse lg:flex-row justify-between items-center rounded-md shadow-lg backdrop-blur-lg shadow-slate-300">
        <div className="flex-1">
          <Lottie animationData={authAnimation} className="w-full" />
        </div>
        <div className="flex-1 w-full">
          <h2 className="text-black/90 text-center text-lg md:text-2xl tracking-[2px]">
            Welcome To
            <span className="pl-2 text-green-600 font-semibold tracking-normal">
              Grocery Buddy!
            </span>
          </h2>
          <h4 className="mt-4 text-black/90 text-center text-base md:text-lg font-medium">Log into your account!</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">

            <div className="mt-6 flex flex-col items-start justify-start gap-4">
              <label htmlFor="email" className="text-base font-medium">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email" placeholder="Email..." className="py-4 px-6 w-full border border-black/10 rounded-md"
              />
              {errors.email && <span className="text-red-600">** This field is required</span>}
            </div>
            <div className="mt-6 flex flex-col items-start justify-start gap-4 relative">
              <label htmlFor="password" className="text-base font-medium">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type={isPassShown ? 'text': 'password'} placeholder="Password..." className="py-4 px-6 w-full border border-black/10 rounded-md"
              />
              <div onClick={() => setIsPassShown(!isPassShown)} className="absolute bottom-5 right-5 text-xl cursor-pointer">
                <BiSolidHide />
              </div>
              {errors.email && <span className="text-red-600">** This field is required</span>}
            </div>
            <div className="mt-6">
              <Link to="/forgetpassword" className="text-sm md:text-lg text-green-600">
                Forgotten password?
              </Link>
            </div>
            <div className="mt-8 flex flex-col xl:flex-row justify-start items-start xl:items-center gap-8">
              <input type="submit" value="Login" className="py-4 px-12 bg-green-600 text-white text-sm md:text-base font-medium rounded-md cursor-pointer" />
              <div className="flex justify-center items-center gap-3 text-sm md:text-base">
                <h4>{`Doesn't`} Have An Account?</h4>
                <Link to="/signup" className="text-green-600 font-medium">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login;