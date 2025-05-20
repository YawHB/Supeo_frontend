import { useTranslation } from 'react-i18next'

const AdminHomePage = () => {
  const [translate] = useTranslation('global')

  document.title = translate('page_title.admin_home')

  return (
    <div className='d-flex'>
      <div className='flex-grow-1 p-4'>
        <h1>Admin Homepage</h1>
      </div>
    </div>
  )
}

export default AdminHomePage
