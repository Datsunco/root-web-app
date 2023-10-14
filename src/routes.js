import MainPage from "./pages/MainPage/MainPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import { MAINPAGE_ROUTE, LOGIN_ROUTE} from "./utils/constants.js"

export const publicRoutes = [
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage,
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage,
    }
]