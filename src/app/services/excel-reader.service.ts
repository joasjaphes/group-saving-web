import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import {Workbook} from 'exceljs';
import {Observable} from 'rxjs';

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
            };
          }
          if (col?.valueType === 'DATE') {
            cell.note = 'mm/dd/yyyy';
            cell.dataValidation = {
              type: 'date',
              operator: 'lessThan',
              showErrorMessage: true,
              // allowBlank: true,
              formulae: [new Date()]
            };
          }
        }
      }
    }
  }

  getExcelData(file): Observable<{[sheetName: string]: any[]}> {
    return new Observable(observer => {
      const excelData: { [sheetName: string]: any[] } = {};
      const target: DataTransfer = (file) as DataTransfer;
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
          excelData[sheetName] = XLSX.utils.sheet_to_json(ws);
        }
        observer.next(excelData);
        observer.complete();
      };
    });
  }

  excelDateToJSDate(serial) {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    const fractional_day = serial - Math.floor(serial) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);
    const seconds = total_seconds % 60;
    total_seconds -= seconds;
    const hours = Math.floor(total_seconds / (60 * 60));
    const minutes = Math.floor(total_seconds / 60) % 60;
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  async generateExcelTemplate(columns: { name: string; valueType: string; key?: string; options?: string[] }[], sheetNames: string[] | string, fileName: string) {
    const workbook = new Workbook();
    if (Array.isArray(sheetNames)) {
      for (const sheetName of sheetNames) {
        await this.addSheets(workbook, sheetName, columns);
      }
    } else {
      await this.addSheets(workbook, sheetNames, columns);
    }
    const buffer = await workbook.xlsx.writeBuffer();
    const dlink = document.createElement('a');
    dlink.href = URL.createObjectURL(new Blob([buffer]));
    dlink.setAttribute('download', `${fileName}.xlsx`);
    dlink.click();
    dlink.remove();
  }

  async generateExcelTemplateWithData(columns: { name: string; valueType: string; key?: string; options?: string[] }[], sheetNames: string, fileName: string, data: any[]) {
    const workbook = new Workbook();
    const worksheet =  await this.addSheets(workbook, sheetNames, columns, 20);
    data.forEach(dataItem => {
      const row = worksheet.addRow(dataItem)
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const dlink = document.createElement('a');
    dlink.href = URL.createObjectURL(new Blob([buffer]));
    dlink.setAttribute('download', `${fileName}.xlsx`);
    dlink.click();
    dlink.remove();
  }

  async addSheets(workbook: Workbook, sheetName, columns: { name: string; valueType: string; key?: string; options?: string[] }[], width: number = 35) {
    const ws = workbook.addWorksheet(sheetName);
    ws.columns = columns.map((col) => {
      return { header: col.name, key: col.key, width };
    });
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
      });
    });
    return ws;
    // await this.formatSheet(ws, columns);
  }

}
