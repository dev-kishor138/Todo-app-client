import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import SocialLogin from "../Shared/SocialLogin"
import { MyContext } from "../../provider/MyProvider"
import { ToastContainer, toast } from "react-toastify";


const Register = () => {
    const { createUser, updateUserProfile } = useContext(MyContext);
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        // password validation 
        if (!password.length > 6) {
            setError('Password must be 6 character');
            return;
        }
        else if (!/(?=.*[a-z])/.test(password)) {
            setError("Please should be a lowercase character.");
            return;
        }
        else if (!/(?=.*[A-Z])/.test(password)) {
            setError("Please should be a Uppercase character.");
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setError("Please should be a Number.");
            return;
        }
        else if (!/(?=.*[@$!%*?&])/.test(password)) {
            setError("Please should be a Special character.");
            return;
        }

        createUser(email, password)
            .then(result => {
                const createdUser = result.user;
                console.log(createdUser);
                updateUserProfile(name)
                    .then(() => {
                        setError('')
                        form.reset();
                        toast("Successfully create an Account");
                        navigate('/')
                    })
            })



    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <ToastContainer />
            <div className="w-[350px] shadow-xl px-5 py-10 rounded-xl">
                <h2 className="text-center text-xl font-semibold mb-3">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Name" className="input input-bordered input-sm w-full max-w-xs" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Email" className="input input-bordered input-sm w-full max-w-xs" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered input-sm w-full max-w-xs" required />
                        <label className="label">
                            <span className="label-text text-red-500">{error}</span>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary btn-sm">Login</button>
                    </div>
                </form>
                <div className="divider">Or Register with</div>
                <p className="text-center"></p>
                <SocialLogin />
                <p className="text-center">Have an account Please <Link to="/login" className="link text-primary">login</Link></p>
            </div>
        </div>
    )
}

export default Register
