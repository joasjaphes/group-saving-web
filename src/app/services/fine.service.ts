import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { ApplicationState } from "../store";
import { CommonService } from "./common.service";
import * as fromFineTypes from "../store/fine-type/fine-type.selectors";
import * as fromMember from "../store/member/member.selectors";
import { ExpectedFine } from "../store/expected-fines/expected-fines.model";
import { numberWithCommas } from "../store/fine-type/fine-type.selectors";
import { selectGroupId } from "../store/user/user.selectors";
import * as fromMeeting from "../store/meeting/meeting.selectors";
import * as fromPayment from "../store/payment/payment.selectors";
import * as fromGroup from "../store/group/group.selectors";
import { first, map } from "rxjs/operators";
import { addExpectedFines, deleteExpectedFine, deleteExpectedFines, upsertExpectedFines } from "../store/expected-fines/expected-fines.actions";
import * as fromContributionType from "../store/contribution-type/contribution-type.selectors";
import * as moment from "moment";
import { FineCalculationType } from "../store/fine/fine.model";
import * as fromLoanType from "../store/loan-type/loan-type.selectors";

@Injectable({
  providedIn: "root",
})
export class FineService {
  constructor(private commonService: CommonService, private store: Store<ApplicationState>) {}

  async setExpectedFinesForNotAttendingMeetings(year = "All", month = "All") {
    try {
      const group = await this.store
        .pipe(
          select(fromGroup.selected),
          first((i) => !!i)
        )
        .toPromise();
      const meetings = await this.store
        .pipe(
          select(fromMeeting.selectDetailed),
          first((i) => !!i)
        )
        .toPromise();
      const memberEntities = await this.store
        .pipe(
          select(fromMember.selectEntities),
          first((i) => !!i)
        )
        .toPromise();
      const fineType = await this.store
        .pipe(
          select(fromFineTypes.selectMeetingNotAttendingFineType),
          first((i) => !!i)
        )
        .toPromise();
      const payments = await this.store
        .pipe(
          select(fromPayment.selectFinesDetailedGroupByMember(year, "All")),
          first((i) => !!i)
        )
        .toPromise();
      let fines = {};
      const allMembersIds = Object.keys(memberEntities);
      let expectedFines: ExpectedFine[] = [];
      for (const member of allMembersIds) {
        const memberPayments = payments.filter((pay) => pay.id === member && !!pay.totals[fineType.id]).map((i) => i.totals[fineType.id]?.amount);
        for (const meeting of meetings) {
          if (!meeting.attendance.includes(member) && group.meeting_settings.allow_not_attending_fine) {
            // const fineAmount =  group.meeting_settings?.not_attending_fine_amount;
            if (memberPayments.length) {
              const totalPaid = memberPayments.reduce((i, j) => i + j);
              fines[member] = fines[member] - totalPaid;
            }
            if (fines[member]) {
              fines[member] += group.meeting_settings?.not_attending_fine_amount;
            } else {
              fines[member] = group.meeting_settings?.not_attending_fine_amount;
            }
          }
        }
        if (memberPayments.length) {
          const totalPaid = memberPayments.reduce((i, j) => i + j);
          fines[member] = fines[member] - totalPaid;
        }
        if (fines[member] && fines[member] <= 0) {
          delete fines[member];
        }

        if (fines[member]) {
          expectedFines.push({
            id: `${member}_${fineType.id}`,
            memberId: member,
            groupId: group.id,
            month: "",
            year: "",
            date: "",
            last_update: "",
            period: ``,
            week: "",
            fines: {
              [fineType.id]: fines[member],
            },
          });
        }
      }
      return expectedFines;
      // this.store.dispatch(upsertExpectedFines({ expectedFines }));
    } catch (e) {}
  }

  fineAmount(calculationType, amount, month, year = new Date().getFullYear()) {
    const currentDate = moment(new Date());
    const fineDate = moment(`${year}-${month}-28`);
    let diff = 1;
    switch (calculationType) {
      case FineCalculationType.DAILY:
        diff = currentDate.diff(fineDate, "days");
        return amount * diff;
      case FineCalculationType.MONTHLY:
        diff = currentDate.diff(fineDate, "months");
        return amount * diff;
      case FineCalculationType.WEEKLY:
        diff = currentDate.diff(fineDate, "weeks");
        return amount * diff;
      default:
        return amount * diff;
    }
  }

  async setExpectedFinesForLateContribution(year = "All", month = "All") {
    try {
      const group = await this.store
        .pipe(
          select(fromGroup.selected),
          first((i) => !!i)
        )
        .toPromise();
      const contributionTypes = await this.store
        .pipe(
          select(fromContributionType.selectDetailed),
          first((i) => !!i)
        )
        .toPromise();
      const memberEntities = await this.store
        .pipe(
          select(fromMember.selectEntities),
          first((i) => !!i)
        )
        .toPromise();
      const memberIds = Object.keys(memberEntities);
      const year = new Date().getFullYear();
      let fines = [];
      for (const id of memberIds) {
        for (const type of contributionTypes) {
          const deadline = type.contribution_deadline;
          const contribution_end = deadline ?? "28";
          const today = new Date().getDate();
          const currentMonth = new Date().getMonth() + 1;
          let months = [...this.months.filter((m) => parseFloat("" + m) <= new Date().getMonth() + 1)];
          if (today < parseFloat("" + contribution_end)) {
            months = [...months.filter((m) => parseFloat("" + m) < currentMonth)];
          }
          let total = 0;
          let totalPaid = 0;
          if (type.allow_late_fine) {
            const fineType = await this.store
              .pipe(
                select(fromFineTypes.selectLateContributionFineType(type.id)),
                first((i) => !!i)
              )
              .toPromise();
            const finePayments = await this.store
              .pipe(
                select(fromPayment.selectFinesDetailedGroupByMember(year, "All")),
                first((i) => !!i),
                map((items) => items.filter((item) => item.id === id && !!item.totals[fineType.id]).map((i) => i.totals[fineType.id]?.amount))
              )
              .toPromise();
            totalPaid = !finePayments.length ? 0 : finePayments.reduce((a, b) => a + b);
            for (const month of months) {
              const payment = await this.store
                .pipe(
                  select(fromPayment.selectContributionByMonthByMember(month, year, id)),
                  map((items) => items.filter((item) => new Date(item.date).getTime() <= new Date(`${item.year}-${item.month}-${contribution_end}`).getTime())),
                  first((i) => !!i)
                )
                .toPromise();
              if (!payment.length || (payment.length && !payment[0]?.contributions[type.id])) {
                total += this.fineAmount(type.fine_period_type, parseFloat("" + type.fine_amount_per_period), month, year);
              }
            }
            const totalFine = total - totalPaid;
            if (totalFine > 0) {
              fines.push({
                id: `${id}_${fineType.id}`,
                memberId: id,
                groupId: group.id,
                month: "",
                year: year,
                date: "",
                last_update: "",
                period: ``,
                week: "",
                fines: {
                  [fineType.id]: totalFine,
                },
              });
            }
          }
        }
      }
      // this.store.dispatch(upsertExpectedFines({ expectedFines: fines }));
      return fines;
    } catch (e) {
      console.error("Failed to calculate fine", e);
    }
  }

  async setExpectedFinesForLateLoanReturn() {
    try {
      const group = await this.store
        .pipe(
          select(fromGroup.selected),
          first((i) => !!i)
        )
        .toPromise();
      const members = await this.store
        .pipe(
          select(fromMember.selectDetailed),
          first((i) => !!i)
        )
        .toPromise();
      const loanTypeEntities = await this.store
        .pipe(
          select(fromLoanType.selectEntities),
          first((i) => !!i)
        )
        .toPromise();
      const loanTypeIds = Object.keys(loanTypeEntities).map((id) => id);
      let fines = [];
      const year = new Date().getFullYear();
      for (const member of members) {
        if (member.active_loans) {
          const memberLoans = Object.keys(member.active_loans).map((key) => member.active_loans[key]);
          for (const loanTypeId of loanTypeIds) {
            const loanType = loanTypeEntities[loanTypeId];
            const memberLoansOfType = memberLoans.filter((loan) => loan.loan_used === loanTypeId);
            if (loanType.is_fine_for_returns) {
              if (memberLoansOfType.length) {
                for (const loan of memberLoansOfType) {
                  let total = 0;
                  let totalPaid = 0;
                  const fineType = await this.store
                    .pipe(
                      select(fromFineTypes.selectLateReturnsFine(loan.loan_used)),
                      first((i) => !!i)
                    )
                    .toPromise();
                  if (loan.remaining_balance > 0) {
                    const startYear = loan.start_year;
                    let year = parseFloat("" + startYear);
                    const currentYear = new Date().getFullYear();
                    let startMonth = loan.start_month;
                    const endYear = loan.end_year;
                    const endMonth = loan.end_month;
                    const currentMonth = new Date().getMonth() + 1;
                    const finePayments = await this.store
                      .pipe(
                        select(fromPayment.selectFinesDetailedGroupByMember(year, "All")),
                        first((i) => !!i),
                        map((items) => items.filter((item) => item.id === member.id && !!item.totals[fineType.id]).map((i) => i.totals[fineType.id]?.amount))
                      )
                      .toPromise();
                    totalPaid = !finePayments.length ? 0 : finePayments.reduce((a, b) => a + b);
                    while (year <= currentYear) {
                      let months = this.months;
                      if (year === parseFloat("" + startYear)) {
                        months = this.months.filter((m) => parseFloat("" + m) > parseFloat("" + startMonth));
                      }
                      if (year === parseFloat("" + currentYear)) {
                        months = this.months.filter((m) => parseFloat("" + m) < parseFloat("" + currentMonth));
                      }
                      for (const month of months) {
                        const payment = loan.payments.find((pay) => parseFloat("" + pay.month) === parseFloat("" + month) && parseFloat("" + pay.year) === parseFloat("" + year));
                        if (!payment) {
                          total += fineType.fixed_amount;
                        }
                      }
                      year += 1;
                      startMonth = "01";
                    }
                  }
                  total -= totalPaid;
                  if (total > 0) {
                    fines.push({
                      id: `${member.id}_${loan.id}`,
                      memberId: member.id,
                      groupId: group.id,
                      month: "",
                      year: year,
                      date: "",
                      last_update: "",
                      period: ``,
                      week: "",
                      fines: {
                        [fineType.id]: total,
                      },
                    });
                  }
                }
              }
            }
          }
        }
      }
      // this.store.dispatch(upsertExpectedFines({ expectedFines: fines }));
      return fines;
    } catch (e) {
      console.error("failed to set fines for late loan return", e);
    }
  }

  async setExpectedFines() {
    let expectedFines = [];
    const group = await this.store
      .pipe(
        select(fromGroup.selected),
        first((i) => !!i)
      )
      .toPromise();
    const fines = [...(await this.setExpectedFinesForNotAttendingMeetings()), ...(await this.setExpectedFinesForLateContribution()), ...(await this.setExpectedFinesForLateLoanReturn())];
    const members = await this.store
      .pipe(
        select(fromMember.selectDetailed),
        first((i) => !!i)
      )
      .toPromise();
    for (const member of members) {
      let finesObject = {};
      const memberFines: ExpectedFine[] = fines.filter((fine) => fine.memberId === member.id);
      for (const fine of memberFines) {
        finesObject = {
          ...finesObject,
          ...fine.fines,
        };
      }
      this.store.dispatch(
        deleteExpectedFine({
          id: member.id,
        })
      );
      expectedFines.push({
        id: member.id,
        memberId: member.id,
        groupId: group.id,
        month: "",
        year: "",
        date: "",
        last_update: "",
        period: ``,
        week: "",
        fines: finesObject,
      });
    }
    this.store.dispatch(upsertExpectedFines({ expectedFines }));
  }

  get months() {
    const months = [];
    const dateStart = moment();
    const dateEnd = moment().add(11, "month");
    while (dateEnd.diff(dateStart, "months") >= 0) {
      let month = dateStart.format("M");
      month = month.length > 1 ? month : `0${month}`;
      months.push(month);
      dateStart.add(1, "month");
    }
    return months.sort((a, b) => (parseFloat(a + "") > parseFloat(b + "") ? 1 : -1));
  }
}
