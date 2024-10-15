import Lottie from "lottie-react";
import { useForm } from "react-hook-form";

import authAnimation from "./../assets/auth-animation.json";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import { BiSolidHide } from "react-icons/bi";

function UpdatePassword() {
    const [isUpdated, setIsUpdated] = useState(false);
    const [isPassShown, setIsPassShown] = useState(false);

    const { updateUserPassword } = useAuth();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = data => {
        const newPassword = data?.newpassword;

        updateUserPassword(newPassword)
            .then(() => {
                toast.success('Password Updated!');
                reset();
                return setIsUpdated(true);
            })
            .catch((error) => {
                toast.error(error?.message);
            });
    };

    return (
        <main className="my-20 px-7 lg:px-4 xl:px-0 w-full lg:max-w-[1200px] mx-auto">
            <section className="pt-20 pb-0 px-4 md:px-12 lg:p-16 bg-[#F5F5F5] flex flex-col lg:flex-row justify-between items-center rounded-md shadow-lg backdrop-blur-lg shadow-slate-300">
                <div className="flex-1 w-full">
                    <h2 className="text-black/90 text-center text-lg md:text-2xl tracking-[2px]">
                        Update Password
                    </h2>
                    {
                        !isUpdated && (
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
                                <div className="mt-6 flex flex-col items-start justify-start gap-4 relative">
                                    <label htmlFor="newpassword" className="text-base font-medium">
                                        New Password
                                    </label>
                                    <input
                                        {...register("newpassword", { required: true })}
                                        type={isPassShown ? 'text' : 'password'} placeholder="Type Your New Password..." className="py-4 px-6 w-full border border-black/10 rounded-md"
                                    />
                                    <div onClick={() => setIsPassShown(!isPassShown)} className="absolute bottom-5 right-5 text-xl cursor-pointer">
                                        <BiSolidHide />
                                    </div>
                                    {errors.email && <span className="text-red-600">** This field is required</span>}
                                </div>
                                <div className="mt-8 flex flex-col xl:flex-row justify-start items-start xl:items-center gap-8">
                                    <input type="submit" value="Update Password" className="py-4 px-12 bg-green-600 text-white text-sm md:text-base font-medium rounded-md cursor-pointer" />
                                    <Link to="/" className="text-green-600  text-sm md:text-base font-medium">
                                        Go Back To Dashboard.
                                    </Link>
                                </div>
                            </form>
                        )
                    }
                    {
                        isUpdated && (
                            <>
                                <h4 className="mt-10 mx-7 text-center text-xl leading-[36px] font-light">
                                    Password has been updated!
                                </h4>
                                <div className="mt-10 flex justify-center items-center">
                                    <Link to="/" className="py-4 px-12 bg-green-600 text-white text-base font-medium rounded-md cursor-pointer">
                                        Go Back To Dashboard
                                    </Link>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className="flex-1">
                    <Lottie animationData={authAnimation} className="mt-8 w-full" />
                </div>
            </section>
        </main>
    )
}

export default UpdatePassword;