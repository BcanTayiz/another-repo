import { BrowserRouter as Router, Switch as Routes, Route ,Redirect} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// components
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PaymentForm from './pages/payment-form/PaymentForm'

function App() {
  const {user,authIsReady} = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <Router>
        <Navbar />
        <Routes>
          <Route exact path="/">
            {user && <Home />}
            {!user && <Redirect to='/login'/>}
          </Route>
          <Route path="/signup">
          {!user && <Signup />}
          {user && <Redirect to='/'/>}
          </Route>
          <Route path="/login">
          {!user && <Login />}
          {user && <Redirect to='/'/>}
          </Route>
          <Route path="/payments">
          {!user && <Redirect to='/login'/>}
          {user && <PaymentForm />}
          </Route>
        </Routes>
      </Router>
      )}
      
    </div>
  );
}

export default App
