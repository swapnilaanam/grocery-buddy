import Lottie from "lottie-react";
import { useForm } from "react-hook-form";

import authAnimation from "./../assets/auth-animation.json";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { BiSolidHide } from "react-icons/bi";

const SignUp = () => {
  const [isPassShown, setIsPassShown] = useState(false);
  const [isConfirmPassShown, setIsConfirmPassShown] = useState(false);

  const navigate = useNavigate();
  const { user, loading, createUser, updateUserProfile, logOut } = useAuth();

  useEffect(() => {
    if(!loading && user) {
      return navigate('/');
    }
  }, [loading, navigate, user]);

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();

  const onSubmit = (data) => {
    const username = data?.username;
    const email = data?.email;
    const password = data?.password;

    createUser(email, password)
      .then(() => {
        updateUserProfile(username)
          .then(() => {
            logOut()
              .then(() => {
                toast.success("User created successfully!");
                reset();
                return navigate('/login');
              })
              .catch((error) => {
                toast.error(error?.message);
              });
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }

  return (
    <main className="my-20 px-7 lg:px-4 xl:px-0 w-full lg:max-w-[1200px] mx-auto">
      <section className="pt-0 pb-20 px-4 md:px-12 lg:p-16 bg-[#F5F5F5] flex flex-col-reverse lg:flex-row justify-between items-center rounded-md shadow-lg backdrop-blur-lg shadow-slate-300">
        <div className="flex-1 w-full">
          <h2 className="text-black/90 text-center text-lg md:text-2xl tracking-[2px]">
            Welcome To
            <span className="pl-2 text-green-600 font-semibold tracking-normal">
              Grocery Buddy!
            </span>
          </h2>
          <h4 className="mt-4 text-black/90 text-center text-base md:text-lg font-medium">Sign up to create an account!</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            <div className="flex flex-col items-start justify-start gap-4">
              <label htmlFor="username" className="text-base font-medium">
                Username
              </label>
              <input
                {...register("username", { required: true })}
                type="text" placeholder="Username..." className="py-4 px-6 w-full border border-black/10 rounded-md"
              />
              {errors.username && <span className="text-red-600">** This field is required</span>}
            </div>
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
                {...register("password", { required: true, minLength: 8, pattern: /^(?=.*[A-Z])(?=.*\d)/ })}
                type={isPassShown ? 'text' : 'password'} placeholder="Password..." className="py-4 px-6 w-full border border-black/10 rounded-md"
              />
              <div onClick={() => setIsPassShown(!isPassShown)} className="absolute bottom-5 right-5 text-xl cursor-pointer">
                <BiSolidHide />
              </div>
              {errors?.password?.type === "required" && <span className="text-red-600">** This field is required</span>}
              {errors?.password?.type === "minLength" && <span className="text-red-600">** Password must be at least 8 characters...</span>}
              {errors?.password?.type === "pattern" && <span className="text-red-600">** Password should contain one uppercase letter, one digit</span>}
            </div>
            <div className="mt-6 flex flex-col items-start justify-start gap-4 relative">
              <label htmlFor="confirmpassword" className="text-base font-medium">
                Confirm Password
              </label>
              <input
                {...register("confirmpassword", {
                  required: true,
                  validate: () => {
                    const password = getValues("password");
                    const confirmPassword = getValues("confirmpassword");

                    return password === confirmPassword;
                  }
                })}
                type={isConfirmPassShown ? 'text' : 'password'} placeholder="Confirm Password..." className="py-4 px-6 w-full border border-black/10 rounded-md"
              />
              <div onClick={() => setIsConfirmPassShown(!isConfirmPassShown)} className="absolute bottom-5 right-5 text-xl cursor-pointer">
                <BiSolidHide />
              </div>
              {errors?.confirmpassword?.type === "required" && <span className="text-red-600">** This field is required</span>}
              {errors?.confirmpassword?.type === "validate" && <span className="text-red-600">** Password does not match!</span>}
            </div>
            <div className="mt-8 flex flex-col xl:flex-row justify-start items-start xl:items-center gap-8">
              <input type="submit" value="Sign Up" className="py-4 px-12 bg-green-600 text-white text-sm md:text-base font-medium rounded-md cursor-pointer" />
              <div className="flex justify-center items-center gap-3 text-sm md:text-base">
                <h4>Already Have An Account?</h4>
                <Link to="/login" className="text-green-600 font-medium">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="flex-1 flex">
          <Lottie animationData={authAnimation} className="mt-5 w-full h-full object-cover" />
        </div>
      </section>
    </main>
  )
}

export default SignUp;