import { useContext } from "react";
import { MyContext } from "../provider/MyProvider";
import { Navigate } from "react-router-dom";


const PrivateRouter = ({ children }) => {

    const { user, loading, } = useContext(MyContext);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace />
};

export default PrivateRouter;