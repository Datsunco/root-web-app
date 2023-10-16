import MainPage from "./pages/MainPage/MainPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import PaymentPage from "./pages/PaymentPage/PaymentPage"
import { MAINPAGE_ROUTE, LOGIN_ROUTE, CHECKOUT_ROUTE} from "./utils/constants.js"

export const publicRoutes = [
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage,
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage,
    },
    {
        path: CHECKOUT_ROUTE,
        Component: PaymentPage,
    }
]