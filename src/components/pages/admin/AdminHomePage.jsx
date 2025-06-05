import { useTranslation } from 'react-i18next'

const AdminHomePage = () => {
  const [translate] = useTranslation('global')

  document.title = translate('page_title.admin_home')

  return (
    <div className='d-flex'>
      <h1>
        Admin homepage
      </h1>
    </div>
  )
}

export default AdminHomePage
