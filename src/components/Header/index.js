import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className='nav-bar'>
      <div className='nav-bar-container'>
        <ul className='nav-bar-items'>
          <Link to='/'>
            <li>
              <img
                src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
                alt='webiste logo'
                className='website logo'
              />
            </li>
          </Link>
        </ul>
        <ul className='nav-menu'>
          <li>
            <Link to='/' className='nav-link'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/jobs' className='nav-link'>
              Jobs
            </Link>
          </li>
        </ul>
        <button type='button' className='logout-button' onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
