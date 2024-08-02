import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import JobItemDetails from './components/JobItemDetails'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
