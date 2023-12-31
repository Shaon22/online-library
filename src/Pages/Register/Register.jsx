import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { MyContext } from "../../AuthProvider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcHome } from "react-icons/fc";
const Register = () => {
    const{createUser,updateUserProfile}=useContext(MyContext)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data =>{
        const name=data.name
        const email=data.email
        const password=data.password

        createUser(email,password)
        .then(result=>{
           
            updateUserProfile(name)
            console.log(result.user)
           if(result.user){
            toast('Registration succuessfull !!!')
           }
        })
    }
    return (
        <div className="bg-[url('https://i.ibb.co/n14ssT2/register-2.jpg')] h-screen">
            <Link to={'/'} className="pl-5 pt-2 flex items-end gap-2"><button><FcHome className="text-4xl block"/></button></Link>
           

           
            <div>
                <h1 className='text-3xl font-bold text-center py-10 text-white'>Register Your Account</h1>
                <div className="w-[30%] mx-auto bg-black p-10 bg-opacity-50 rounded">
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-5 ">
                        
                        <input {...register("name", { required: true })} className="w-full p-2 font-semibold outline-none rounded hover:border-b-cyan-400 border-2" placeholder="Name" type="text" />
                        {errors.name && <span className="text-red-500"> Name is required</span>}

                        <input {...register("email", { required: true })} className="w-full p-2 font-semibold outline-none rounded hover:border-b-cyan-400 border-2" placeholder="Email" type="email" />
                        {errors.email && <span className="text-red-500">Email is required</span>}

                        <input className="w-full p-2 font-semibold outline-none rounded hover:border-b-cyan-400 border-2" placeholder="Password" type="password" {...register("password",
                            {
                                required: "field is required",
                                minLength: {
                                    value: 6,
                                    message: 'Password must be 6 character'
                                },
                                pattern: {
                                    value: /[A-Z]/,
                                    message: "Please provide at least one uppercase character "
                                },

                            })} />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                        <div className="text-center">
                            <input className="btn btn-sm w-full bg-cyan-400 border-none text-white" type="submit" value="REGISTER" />
                        </div>
                    </form>
                    <hr className="my-5" />
                    <button className="btn btn-sm w-full bg-cyan-400 border-none text-white">SIGN UP WITH<FcGoogle className="text-xl" /></button>
                <h1 className="text-white m-5 text-center">Already Have an account? <Link to={'/login'} className="text-blue-600 text-lg font-bold">Login</Link></h1>
                </div>
                
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;