import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DataKeys} from '../store/data-keys';
import {AngularIndexedDB} from './angular2-indexddb';


@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  db;
  offlineKeys = {
    last_updated: DataKeys.LastUpdatedTable,
    adjustment: DataKeys.Adjustments,
    announcement: DataKeys.Announcement,
    buying_investment_distribution: DataKeys.BuyingInvestmentDistribution,
    buying_investment_item: DataKeys.BuyingInvestmentItem,
    buying_investment_type: DataKeys.BuyingInvestmentType,
    cash_transfer: DataKeys.CashTransfer,
    contribution_type_balance: DataKeys.ContributionTypeBalance,
    contribution_type: DataKeys.ContributionType,
    expense: DataKeys.Expense,
    expense_type: DataKeys.ExpenseType,
    fine: DataKeys.Fine,
    fine_type: DataKeys.FineType,
    group: DataKeys.Group,
    loan_payment: DataKeys.LoanPayment,
    loan_queue: DataKeys.LoanQueue,
    loans: DataKeys.Loan,
    loan_type: DataKeys.LoanType,
    long_term_investment_item: DataKeys.LongTermInvestmentItem,
    long_term_investment_type: DataKeys.LongTermInvestmentType,
    meeting: DataKeys.Meeting,
    member_balance: DataKeys.MemberBalance,
    member_group: DataKeys.MemberGroup,
    member_share: DataKeys.MemberShare,
    member: DataKeys.Member,
    payment_item: DataKeys.PaymentItem,
    payments: DataKeys.Payments,
    share_dividend_member: DataKeys.ShareDividendMember,
    share_dividend: DataKeys.ShareDividend,
    user: DataKeys.User,
  };
  constructor() {
    this.db = new AngularIndexedDB('group_savings_data', 1);
  }

  /**
   * Initiate the store
   * @returns {Promise<any>}
   * @private
   */
  _initiateStoreObjects() {
    return this.db.createStore(3, (evt) => {
      Object.keys(this.offlineKeys).forEach((key) => {
        console.log(`creating ${key} table`);
        this.createStore(evt, this.offlineKeys[key], 'id');
      });
    });
  }

  createStore( evt, key: string, index: string ) {
    const objectStore = evt.currentTarget.result.createObjectStore(
      key, { keyPath: index });
    objectStore.createIndex(index, index, { unique: false });
  }

  /**
   * Add item to store in existing table
   * @param table
   * @param value
   * @returns {any}
   */
  async add(table: string, value: any) {
    await this._initiateStoreObjects();
    return this.db.add(table, value);
  }

  /**
   * Update existing value in store
   * @param table
   * @param value // this should have the id same as one in system
   * @returns Observable{any}
   */
  async update( table: string, value: any ) {
    await this._initiateStoreObjects();
    return this.db.update(table, value);
  }

  /**
   * get a single item by using index
   * @param table
   * @param index
   * @param index_value
   * @returns {any}
   */
  async getByIndex( table: string, index: string, index_value: string ) {
    await this._initiateStoreObjects();
    return this.db.getByIndex(table, index, index_value );
  }


  /**
   * get an item by key
   * @param table
   * @param key_value
   * @returns {any}
   */
  async getByKey( table: string, key_value: any ) {
    await this._initiateStoreObjects();
    return this.db.getByKey(table, key_value);
  }

  async getByKeys( table: string, keys: Array<any> ) {
    await this._initiateStoreObjects();
    return this.db.getByKeys(table, keys);
  }


  /**
   * get all items in a store
   * @param store_key
   * @returns {any}
   */
  async getAll( store_key: string ) {
    await this._initiateStoreObjects();
    return this.db.getAll(store_key);
  }

  /**
   * delete all items in a store
   * @param store_key
   * @returns {any}
   */
  async clearAll( store_key: string ) {
    await this._initiateStoreObjects();
    return this.db.clear(store_key);
  }

  /**
   * delete all items in a store
   * @returns {any}
   */
  async clearEverything( ) {
    await this._initiateStoreObjects();
    Object.keys(this.offlineKeys).forEach((key) => {
      console.log(`removing items in ${key} table`);
      this.clearAll(this.offlineKeys[key]);
    });
  }

  /**
   * delete a single item in a store
   * @param store_key
   * @param index
   * @returns {any}
   */
  async delete( store_key: string, index: string ) {
    await this._initiateStoreObjects();
    console.log(this.db);
    return this.db.delete(store_key, index);
  }

  /**
   * delete a single item in a store
   * @returns {any}
   */
  deleteDB(): Observable<any> {
    return new Observable(observer => {
      const req = indexedDB.deleteDatabase('facility_tool_metadata');
      req.onsuccess = () => {
        // console.log('Deleted database successfully');
        observer.next('success');
        observer.complete();
      };
      req.onerror = () => {
        // console.log('Couldn't delete database');
        observer.next('success');
        observer.complete();
      };
      req.onblocked =  () => {
        // console.log('delete database due to the operation being blocked');
        observer.error();
      };
    });
  }

}
