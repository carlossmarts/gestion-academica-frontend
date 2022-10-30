import { Box, Grid, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'

const DescargarExcel = (props) => {

    const {
        json, nombre, fileName
    } = props

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportarComoExcel = async (json, fileName) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const fileExtension = '.xlsx'
        const ws = XLSX.utils.json_to_sheet(json)
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { booktype: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
    }

}

export default DescargarExcel