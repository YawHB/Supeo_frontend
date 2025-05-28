import * as XLSX from 'xlsx'

const exportTableData = ({ data, columns, filename = 'export.xlsx', strategy = 'xlsx' }) => {
  const arrayOfArray = [                                           
    columns.map((column) => column.label),                                  
    columns.map(() => ''),                                                 
    ...data.map((row) => columns.map((column) => row[column.key] ?? '')), // værdier fra data baseret på kolonnenøgler
  ]
  const worksheet = XLSX.utils.aoa_to_sheet(arrayOfArray) // konverter arrayet til et Excel-ark (worksheet)
  const workbook = { SheetNames: ['Sheet1'], Sheets: { Sheet1: worksheet } } // opretter en  (workbook) med ét ark kaldet "Sheet1"
  XLSX.writeFile(workbook, `${filename}.${strategy}`) // Gem arbejdsbogen som en fil med angivet filnavn og strategi/format
}

export default exportTableData

// En workbook er hele Excel-filen – den kan indeholde ét eller flere worksheets (faneblade).
// Et worksheet (eller "ark") repræsenterer et enkelt regneark i Excel – ligesom et faneblad i en Excel-fil.
