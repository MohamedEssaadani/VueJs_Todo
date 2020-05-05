import App from '../App'
import LandingPage from '../components/pages/LandingPage'
import About from '../components/pages/About'
import Contact from '../components/pages/Contact'
import SignUp from '../components/auth/Sign-up'
import SignIn from '../components/auth/Sign-in'

//create array that contain our routes
const routes = [
    { path: '/', component: LandingPage },
    { path: '/todos', component: App },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '/signup', component: SignUp },
    { path: '/signin', component: SignIn }

]

//export the routes array so that it can be available for importing 
export default routes;