import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromReducer from "./expected-fines.reducer";
import * as fromFineTypes from "../fine-type/fine-type.selectors";
import * as fromMember from "../member/member.selectors";
import { ExpectedFine } from "./expected-fines.model";
import { numberWithCommas } from "../fine-type/fine-type.selectors";
import { selectGroupId } from "../user/user.selectors";
import * as fromMeeting from "../meeting/meeting.selectors";
import * as fromPayment from "../payment/payment.selectors";
import * as fromGroup from "../group/group.selectors";

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.expectedFinesFeatureKey);

export const selectIds = createSelector(selectCurrentState, fromReducer.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromReducer.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromReducer.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromReducer.selectTotal);
export const selectLoading = createSelector(selectCurrentState, fromReducer.getLoading);
export const selectCurrentId = createSelector(selectCurrentState, fromReducer.getSelectedId);
export const selectError = createSelector(selectCurrentState, fromReducer.getError);

export const selectById = (id: string) => createSelector(selectEntities, (entities) => entities[id]);

export const selected = createSelector(selectEntities, selectCurrentId, (entities, id) => entities[id]);

export const selectByCurrentGroup = createSelector(selectAll, selectGroupId, (allItems, groupId) => allItems.filter((i) => i.groupId === groupId));

export const selectDetailed = createSelector(selectByCurrentGroup, fromFineTypes.selectEntities, fromMember.selectEntities, (allItems, fineTypes, members) => {
  return allItems.map((item) => {
    const contrDetails = [];
    const paymentItems = [];
    const fineDetails = !!item.fines
      ? Object.keys(item.fines).map((contrId) => ({
          id: contrId,
          name: fineTypes[contrId] ? fineTypes[contrId].description : "",
          amount: item.fines[contrId],
        }))
      : null;
    if (fineDetails) {
      contrDetails.push(...fineDetails.map((i) => `${i.name} ${numberWithCommas(i.amount)}`));
      paymentItems.push(...fineDetails);
    }
    return {
      ...item,
      fineDetails,
      paymentItems,
      fineKeys: fineDetails.map((i) => i.id),
      member_name: members[item.memberId]?.name,
      member: members[item.memberId],
      description: contrDetails.join(", "),
      ...findFineTotal(item),
    };
  });
});

export const selectExpectedFineTypesSummary = createSelector(selectDetailed, fromFineTypes.selectByCurrentGroup, (allItems, contributionTypes) => {
  const summary = {};
  summary["All"] = { name: "All", total: 0, id: "All" };
  for (const contr of contributionTypes) {
    summary[contr.id] = { name: contr.description, total: 0, id: contr.id };
    allItems.forEach((item) => {
      if (item.fines) {
        if (Object.keys(item.fines).indexOf(contr.id) !== -1) {
          summary[contr.id].total += parseFloat(item.fines[contr.id] + "");
          summary["All"].total += parseFloat(item.fines[contr.id] + "");
        }
      }
    });
  }
  return Object.keys(summary).map((i) => summary[i]);
});

export const selectExpectedFineTypeSummaryString = createSelector(selectExpectedFineTypesSummary, (fineTypes) =>
  fineTypes
    .filter((i) => i.total > 0 && i.name !== "All")
    .map((i) => `${i.name} ${numberWithCommas(i.total)}`)
    .join(", ")
);

export const selectTotalExpectedFines = createSelector(selectDetailed, (allItems) => allItems.reduce((a, b) => a + parseFloat(b.totalFines + ""), 0));

export const selectExpectedFinesByMember = (id: string) => createSelector(selectDetailed, (allItems) => allItems.filter((item) => item.memberId === id));

export function findFineTotal(payment: ExpectedFine) {
  let sum = 0;
  let totalFines = 0;
  Object.keys(payment.fines).forEach((item) => {
    const val = payment.fines[item];
    if (val) {
      sum += parseFloat(val + "");
      totalFines += parseFloat(val + "");
    }
  });
  return {
    totalAmount: sum,
    totalFines,
  };
}
