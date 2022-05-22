import { Component, OnInit } from '@angular/core';
import {ermsData} from './data-source';
import {FormattedData} from './data-models';
import {Form} from '@angular/forms';

enum DATA_KEYS {
  ActivityCode = 'Activity Code',
  ActivityDescription = 'Activity description',
  GFS_CODE = 'GFS CODE',
  GFSCodesDescription = 'GFS Codes description',
  UnitOfMeasure = 'Unit of measure',
  UnitCost = 'Unit cost',
  NoOfUnit = 'No of unit',
  Estimate = 'Estimate',
  EstimateY1 = 'Estimate Y1',
  NoOfUnitY1 = 'No of unit Y1',
  EstimateY2 = 'Estimate Y2',
  NoOfUnitY2 = 'No of unit Y1',
}

@Component({
  selector: 'app-import-erms-data',
  templateUrl: './import-erms-data.component.html',
  styleUrls: ['./import-erms-data.component.css']
})
export class ImportErmsDataComponent implements OnInit {
  dataSource: any[] = ermsData;
  formattedData: any[] = [];
  departments: any[] = [];
  unitOfMeasures: any[] = [];
  objectives: any[] = [];
  targets: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.prepareData();
  }

  findValueByKey(item: { [id: string]: any }, lookupKey: string, isExact = false): any | null {
    const keys = Object.keys(item);
    const values = Object.values(item);
    const indexKey = isExact
      ? keys.findIndex(i => i.trim().toLowerCase() === lookupKey.trim().toLowerCase())
      : keys.findIndex(i => i.trim().toLowerCase().includes(lookupKey.trim().toLowerCase()))
    if (indexKey > -1) {
      return values[indexKey];
    }
    return null;
  }

  activityExists(item) {
    const activityKeys = [
      DATA_KEYS.ActivityCode,
      DATA_KEYS.ActivityDescription,
      DATA_KEYS.GFS_CODE,
      DATA_KEYS.GFSCodesDescription,
      DATA_KEYS.UnitOfMeasure,
      DATA_KEYS.UnitCost,
      DATA_KEYS.NoOfUnit,
    ];
    const filteredKeys = Object.keys(item)
      .map(val => val.trim().toLowerCase());
    return activityKeys.every(val => {
      return !!filteredKeys.find(i => i.includes(val.trim().toLowerCase()));
    });
  }

  gfsExists(item) {
    const itemKeys = [
      DATA_KEYS.GFS_CODE,
      DATA_KEYS.GFSCodesDescription,
      DATA_KEYS.UnitOfMeasure,
      DATA_KEYS.UnitCost,
      DATA_KEYS.NoOfUnit,
    ]
    const filteredKeys = Object.keys(item)
      .map(val => val.trim().toLowerCase());
    return itemKeys.every(val => {
      return !!filteredKeys.find(i => i.includes(val.trim().toLowerCase()));
    });
  }

  findUpperItem(currentIndex, excelData, stringKey = null): { value: string, index: number } | null {
    const index = currentIndex - 1;
    const targetItem = excelData[index];
    const values = Object
      .values(targetItem)
      // .filter(i => !!(i + '').trim());
    if (values.length === 1) {
      if (stringKey && (values[0] as string).trim().toLowerCase().includes(stringKey)) {
        const value = values[0] as string;
        return {value, index}
      } else {
        const value = values[0] as string;
        // This check is additional as sometime the total colum can be confused with department
        if (value.length >=3 && !value.toLowerCase().includes('total')) {
          return {value, index}
        } else {
          return null
        }
      }
    }
    return null;
  }

  prepareObjectiveCode(objectiveName, activityCode) {
    const name = objectiveName;
    const splittedValue = objectiveName.split(':')[0].trim().split(' ');
    const objectiveCodeFromActivity = activityCode[0];
    const code = objectiveCodeFromActivity;
    const verified = splittedValue[1] && splittedValue[1].trim() === objectiveCodeFromActivity;
    const description = objectiveName.split(':')[1] ? objectiveName.split(':')[1].trim() : objectiveName;
    return {
      name,
      code,
      verified,
      description,
    }
  }

  prepareTargetCode(targetName, activityCode) {
    const name = targetName;
    const splittedTargetName = targetName.split(':')[0].trim().split(' ');
    const targetCodeFromActivity = activityCode.substring(0, 4);
    const code = targetCodeFromActivity;
    const verified = splittedTargetName[1] && splittedTargetName[1].trim().substring(1, 3) === targetCodeFromActivity.substring(1, 3);
    const description = targetName.split(':')[1] ? targetName.split(':')[1].trim() : targetName;
    return {
      name,
      code,
      verified,
      description,
    }
  }

  async prepareData() {
    const excelData = this.dataSource;
    let departmentName = '';
    let objectiveName = '';
    let objectiveDesc = '';
    let objectiveCode = '';
    let objectiveVerified = false;
    let targetName = '';
    let targetCode = '';
    let targetCodeVerified = false;
    let targetDesc = '';
    let activityName = '';
    let activityCodeName = '';
    let gfcCodeName = '';
    let gfsDescriptionName = '';
    let unitOfMeasureName = '';
    let unitOfCostValue = '';
    let noOfUnitValue = '';
    const myFormattedArray: FormattedData[] = [];
    for (let i = 0; i < excelData.length; i++) {
      const item = excelData[i];


      let objectItem: FormattedData;
      if (Object.values(item).length > 7) {

        const filteredKeys = Object.keys(item)
          .map(val => val.trim().toLowerCase());

        // this checks if this row is an activity row
        const hasActivity = this.activityExists(item);

        // Check if this row is an item row
        const hasGfs = this.gfsExists(item);

        if (hasActivity) {
          activityCodeName = this.findValueByKey(item, DATA_KEYS.ActivityCode);
          activityName = this.findValueByKey(item, DATA_KEYS.ActivityDescription);
          const target = this.findUpperItem(i, excelData, 'target');
          if (target) {
            const objective = this.findUpperItem(target.index, excelData, 'objective');
            if (objective) {
              const department = this.findUpperItem(objective.index, excelData);
              if (department) {
                departmentName = department.value;
              }
              const objectiveDetails = this.prepareObjectiveCode(objective.value, activityCodeName);
              objectiveName = objectiveDetails.name;
              objectiveCode = objectiveDetails.code;
              objectiveVerified = objectiveDetails.verified;
              objectiveDesc = objectiveDetails.description;
            }
            const targetDetails = this.prepareTargetCode(target.value, activityCodeName);
            targetName = targetDetails.name;
            targetCode = targetDetails.code;
            targetCodeVerified = targetDetails.verified;
            targetDesc = targetDetails.description;
          }
        }
        if (hasGfs) {
          gfcCodeName = this.findValueByKey(item, DATA_KEYS.GFS_CODE);
          gfsDescriptionName = this.findValueByKey(item, DATA_KEYS.GFSCodesDescription);
          unitOfCostValue = this.findValueByKey(item, DATA_KEYS.UnitCost);
          noOfUnitValue = this.findValueByKey(item, DATA_KEYS.NoOfUnit, true);
          unitOfMeasureName = this.findValueByKey(item, DATA_KEYS.UnitOfMeasure);
        }

        myFormattedArray.push({
          id: this.makeId(),
          department: departmentName,
          objectiveCode: objectiveCode,
          objectiveCodeVerified: objectiveVerified,
          objective: objectiveName,
          objectiveName: objectiveDesc,
          target: targetName,
          targetCode: targetCode,
          targetCodeVerified: targetCodeVerified,
          targetName: targetDesc,
          activityCode: activityCodeName,
          activity: activityName,
          gfsCode: gfcCodeName,
          gfsDescription: gfsDescriptionName,
          unitOfMeasure: unitOfMeasureName,
          noOfUnit: +noOfUnitValue,
          unitOfCost: +unitOfCostValue,
        });
      }
    }
    this.formattedData = [...myFormattedArray];
    this.prepareDepartments();
  }

  prepareDepartments() {
    this.departments = this.getUniqueItems('department');
  }

  getUniqueItems( key: string): string[] {
    const items = [];
    this.formattedData.forEach(item => {
      if (!items.includes(item[key])) {
        items.push(item[key]);
      }
    })
    return items;
  }

  makeId(): string {
    let text = '';
    const possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const first_possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 11; i++) {
      const charPosition = i === 0 ? Math.random() * first_possible_combinations.length : Math.random() * possible_combinations.length;
      text += possible_combinations.charAt(Math.floor(charPosition));
    }
    return text;
  }

}
