import { useTranslation } from 'react-i18next'

const EmployeeHomePage = () => {
  const [translate] = useTranslation('global')

  document.title = translate('nav_bar.employee_home')

  return (
    <div className='d-flex'>
      <div className='flex-grow-1 p-4'>
        <h1>Employee Homepage</h1>
      </div>
    </div>
  )
}

export default EmployeeHomePage
