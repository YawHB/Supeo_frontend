import * as XLSX from 'xlsx'

const exportTableData = ({ data, columns, filename = 'export.xlsx', strategy = 'xlsx' }) => {
  const arrayOfArray = [
    columns.map((column) => column.label),
    columns.map(() => ''),
    ...data.map((row) => columns.map((column) => row[column.key] ?? '')),
  ]
  const worksheet = XLSX.utils.aoa_to_sheet(arrayOfArray)
  const workbook = { SheetNames: ['Sheet1'], Sheets: { Sheet1: worksheet } }
  XLSX.writeFile(workbook, `${filename}.${strategy}`)
}

export default exportTableData
