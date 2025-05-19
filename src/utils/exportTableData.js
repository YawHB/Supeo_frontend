import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const exportTableData = async ({ data, columns, strategy = 'xlsx', filename = 'export' }) => {
  const keys = columns.map((col) => col.key)
  const header = columns.map((col) => col.label)

  const emptyRow = header.map(() => '')
  const sheetData = [header, emptyRow, ...data.map((row) => keys.map((k) => row[k] ?? ''))]

  const worksheet = XLSX.utils.aoa_to_sheet(sheetData)

  const colWidths = header.map((_, colIndex) => {
    let maxLength = header[colIndex]?.length || 10
    data.forEach((row) => {
      const cellValue = row[keys[colIndex]]
      const cellLength = cellValue ? String(cellValue).length : 0
      if (cellLength > maxLength) {
        maxLength = cellLength
      }
    })
    return { wch: maxLength + 2 }
  })
  worksheet['!cols'] = colWidths

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  const wbout = XLSX.write(workbook, {
    bookType: strategy,
    type: 'array',
  })
  const blob = new Blob([wbout], {
    type: strategy === 'csv' ? 'text/csv;charset=utf-8;' : 'application/octet-stream',
  })
  saveAs(blob, `${filename}.${strategy}`)
}


export default exportTableData
