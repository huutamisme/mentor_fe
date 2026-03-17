"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

const Signup: React.FC = () => {

    type FormData = z.infer<typeof schema>;
    const onSubmit = (data: FormData) => {
        const { username } = data;

        localStorage.setItem("username", username);

        router.push("/");
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const [isSignUp, setIsSignUp] = useState(false);
    const router = useRouter();

    const handleSignUpClick = () => {
        setIsSignUp(true);
        setTimeout(() => {
            router.push("/login");
        }, 1000)
    };

    return (
        <div className="grid grid-cols-2 min-h-screen overflow-hidden">
            <motion.div
                initial={isSignUp ? { x: 0, opacity: 1 } : { x: 300, opacity: 0 }}
                animate={isSignUp ? { x: 300, opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex items-center justify-center bg-background"
            >
                <div className="p-8 max-w-sm w-full text-center shadow-lg">
                    <h2 className="text-6xl font-semibold text-gray-800 mb-8">Sign Up</h2>
                    <p className="my-6 text-gray-600 text-xl">
                        Already a member?{" "}
                        <button onClick={handleSignUpClick} className="text-blue-600 hover:underline">
                            Log In
                        </button>
                    </p>

                    <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("username")}
                            type="text"
                            placeholder="Username"
                            className="w-full py-3 px-4 bg-backround border border-black text-black hover:bg-gray-100 transition"
                        />
                        <p className="text-red-600">{errors.username?.message}</p>

                        <input
                            {...register("password")}
                            type="password"
                            placeholder="Password"
                            className="w-full py-3 px-4 bg-backround border border-black text-black hover:bg-gray-100 transition"
                        />
                        <p className="text-red-600">{errors.password?.message}</p>

                        <input
                            {...register("confirmPassword")}
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full py-3 px-4 bg-backround border border-black text-black hover:bg-gray-100 transition"
                        />
                        <p className="text-red-600">{errors.confirmPassword?.message}</p>
                        <button type="submit" className="w-full py-3 px-4 bg-background text-black border border-black hover:bg-blue-400 hover:border-blue-500">Submit</button>
                    </form>

                    {/* Divider */}
                    <div className="relative flex py-3 items-center mb-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <button className="w-full py-3 bg-backround border border-black text-black hover:bg-gray-100 transition">
                        Sign up with Email
                    </button>
                </div>
            </motion.div>
            <motion.div
                initial={isSignUp ? { x: 0, opacity: 1 } : { x: 0, opacity: 0 }}
                animate={isSignUp ? { x: -300, opacity: 0 } : { x: 100, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Image
                    src="/capy.jpg"
                    alt="Signup"
                    fill
                />
            </motion.div>
        </div>
    );
};
export default Signup;
