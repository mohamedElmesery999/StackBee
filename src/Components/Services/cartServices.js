import axios from 'axios';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

export async function addProductToCart(productId){
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart" , {
        productId
    }, {
        headers:{
            token : localStorage.getItem("token")
        }
    })
    toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
}