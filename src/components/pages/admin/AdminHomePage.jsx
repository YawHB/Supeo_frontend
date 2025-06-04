import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext.js'

const AdminHomePage = () => {
  const [translate] = useTranslation('global')
  const { user } = useContext(AuthContext)

  document.title = translate('page_title.admin_home')

  return (
    <div className='d-flex'>
      <h1>
        {translate('login.welcome')} {user.email}
      </h1>
    </div>
  )
}

export default AdminHomePage
