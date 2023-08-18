import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { useContext } from "react";
import { toast } from "react-toastify";
import { MyContext } from "../../provider/MyProvider";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(MyContext);
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                toast('user successfully login')
                navigate('/')
            })
    }
    return (
        <div className="my-3 flex gap-3  w-1/3 mx-auto">
            <button onClick={handleGoogleSignIn} className="btn btn-sm btn-circle btn-outline">
                <span><FaGoogle /></span>
            </button>
            <button className="btn btn-sm btn-circle btn-outline">
                <span><FaFacebookF /></span>
            </button>
        </div>
    );
};

export default SocialLogin;