import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle, FcHome } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from '../../AuthProvider/AuthProvider';
import useAxiosPublic from '../../Hooks/UseAxiosPublic';
const Login = () => {
    const axiosPublic = useAxiosPublic()
    const { signIn, googleLogin } = useContext(MyContext)
    const location = useLocation()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const email = data.email
        const password = data.password
        signIn(email, password)
            .then(result => {
                console.log(result)
                navigate(location?.state ? location.state : '/')

            })
    }
    const handleGoogle = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)

                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role:'user'
                }
                toast('hello')
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)

                    })
               
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                console.error(error)

            })
            
    } 
    return (
        <div className="bg-[url('https://i.ibb.co/723JZsf/login-1.jpg')] h-screen">
            <Link to={'/'}><button className='p-5'><FcHome className="text-2xl sm:text-4xl" /></button></Link>
            <div className='px-5'>
                <h1 className='text-lg sm:text-2xl mb-10 font-bold text-center text-white'>Login Now</h1>
                <div className=" mx-auto sm:w-[25%] bg-black p-5 bg-opacity-50 rounded">
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-5 ">

                        <input {...register("email", { required: true })} className="w-full p-2 font-semibold outline-none rounded hover:border-b-cyan-400 border-2" placeholder="Email" type="email" />
                        {errors.email && <span className="text-red-500">Email is required</span>}

                        <input className="w-full  p-2 font-semibold outline-none rounded hover:border-b-cyan-400 border-2" placeholder="Password" type="password" {...register("password",
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
                            <input className="btn btn-sm w-full bg-cyan-400 border-none text-white" type="submit" value="LOG IN" />
                        </div>
                    </form>
                    <hr className="my-5" />
                    <button onClick={handleGoogle} className="btn btn-sm w-full bg-cyan-400 border-none text-white">SIGN IN WITH<FcGoogle className="text-xl" /></button>
                    <h1 className="text-white m-5 text-center">Dont Have any account? <Link to={'/register'} className="text-blue-600 text-lg font-bold">Register</Link></h1>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;