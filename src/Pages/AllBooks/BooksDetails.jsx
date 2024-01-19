import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { MyContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { ToastContainer, toast } from "react-toastify";

const BooksDetails = () => {
    const { user } = useContext(MyContext)
    const axiosPublic = useAxiosPublic()
    const booksInfo = useLoaderData()
    const { _id, imageURL, name, author, category,shortDescription } = booksInfo
    console.log(booksInfo)
    const handleReadLater = () => {
        const bookInfo = {
            id: _id,
            email: user.email
        }
        console.log(bookInfo)
        axiosPublic.post('/readLater', bookInfo)
            .then(res => {
                if (res.data.insertedId) {
                    toast('Added for read later succcessfully')
                }
            })

    }
    return (
        <div className="h-screen">
            <h1 className="text-2xl font-bold text-center my-5">Details</h1>
            <div className="flex gap-7 mt-10">
                <img className="w-[300px] p-3" src={imageURL} alt="" />
                <div>
                    <h1 className="text-2xl font-bold mb-6">{name}</h1>
                    <h1 className="text-lg font-medium my-1">Author: {author}</h1>
                    <h1 className="text-lg font-medium my-1">Category: {category}</h1>
                    <p className="font-medium my-5">{shortDescription}</p>
                    <button onClick={handleReadLater} className="items-center btn btn-sm bg-cyan-400 text-white">Read Later</button>
                    <button className=" items-center btn btn-sm bg-cyan-400 text-white mx-2">Read Now</button>
                    <button className=" items-center btn btn-sm bg-cyan-400 text-white">Buy Now</button>
                </div>

            </div>
            <ToastContainer />
        </div>

    );
};



export default BooksDetails;