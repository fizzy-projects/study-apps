import Layout from "../../utils/Layout"
import ArabicList from "./ArabicList"
import ArabicHome from "./Home";
import ProtectedRoute from "../../admin/ProtectedComponent";
import AddWordDetails from "./admin/AddWordDetails";
import ArabicQuiz from "./Quiz";
import { ArabicProvider } from "./ArabicContext";

export const ArabicRoutes = {
    path: "arabic", // 👈 parent path defined ONCE
    element: <ArabicProvider>
                <Layout/>
            </ArabicProvider>,
    children: [
        {index:true, element:<ArabicHome/>},
        {path:"list", element:<ArabicList/>},
        {path:"quiz", element:<ArabicQuiz/>},
        {path:"addword", element:<AddWordDetails/>}

        // {element:<ProtectedRoute/>,  //wrapper route
        // children: [
        //     {element: <Layout/>, //layout wrapper
        //     children:[
        //         {path:"addword", element:<AddWordDetails/>}
        //     ]}
        // ]
        // }

        // {element:<ProtectedRoute/>,  //wrapper route
        // children: [
        //     {path:"addword", element:<AddWordDetails/>}
        //     ]
        // }
    ]
};