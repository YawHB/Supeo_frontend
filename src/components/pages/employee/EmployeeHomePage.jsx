import { useTranslation } from 'react-i18next'

const EmployeeHomePage = () => {
  const [translate] = useTranslation('global')

  document.title = translate('nav_bar.employee_home')

  return (
    <div className='d-flex'>
      <h1>Employee Homepage</h1>
    </div>
  )
}

export default EmployeeHomePage
