import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Workbook, ValueType } from 'exceljs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelReaderService {

  constructor() { }

  async formatSheet(ws, columns) {
    for (let i = 2; i <= 1000; i++) {
      const row = ws.getRow(i);
      for (const col of columns) {
        if (col.key) {
          const cell = row.getCell(col.key);
          if (col.options?.length) {
            cell.dataValidation = {
              type: 'list',
              allowBlank: true,
              showErrorMessage: true,
              formulae: [`"${col.options.join()}"`]
            }
          }
          if (col?.valueType === 'DATE') {
            cell.note = 'mm/dd/yyyy'
            cell.dataValidation = {
              type: 'date',
              operator: 'lessThan',
              showErrorMessage: true,
              // allowBlank: true,
              formulae: [new Date()]
            }
          }
        }
      }
    }
  }

  getExcelData(file):Observable<{[sheetName:string]:any[]}> {
    return new Observable(observer => {
      const excelData: { [sheetName: string]: any[] } = {}
      const target: DataTransfer = <DataTransfer>(file);
      if (target.files.length !== 1) {
        observer.error('Cannot use multiple files');
      }
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[0]);
      reader.onload = (e: any) => {
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
        for (const sheetName of Object.keys(wb.Sheets)) {
          const ws: XLSX.WorkSheet = wb.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(ws);
          excelData[sheetName] = data;
        }
        observer.next(excelData);
        observer.complete();
      }
    });
  }

  excelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    const date = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
    return date;
  }

  async generateExcelTemplate(columns: { name: string; valueType: string; key?: string; options?: string[] }[], sheetNames: string[] | string, fileName: string) {
    const workbook = new Workbook();
    if (isArray(sheetNames)) {
      for (const sheetName of sheetNames) {
        await this.addSheets(workbook, sheetName, columns);
      }
    } else {
      await this.addSheets(workbook, sheetNames, columns);
    }
    const buffer = await workbook.xlsx.writeBuffer();
    const dlink = document.createElement('a');
    const url = URL.createObjectURL(new Blob([buffer]));
    dlink.href = url;
    dlink.setAttribute('download', `${fileName}.xlsx`)
    dlink.click();
    dlink.remove();
  }

  async addSheets(workbook: Workbook, sheetName, columns: { name: string; valueType: string; key?: string; options?: string[] }[]) {
    const ws = workbook.addWorksheet(sheetName);
    ws.columns = columns.map((col) => {
      return { header: col.name, key: col.key, width: 35, style: { numFmt: 'mm-dd-yyyy' } }
    })
    ws.columns.forEach(column => {
      column.eachCell((cell, num) => {
        cell.font = {
          name: 'Arial',
          family: 2,
          bold: true,
          size: 12,
        };
        cell.alignment = {
          vertical: 'middle', horizontal: 'center'
        };
      })
    })
    await this.formatSheet(ws, columns);
  }
}
