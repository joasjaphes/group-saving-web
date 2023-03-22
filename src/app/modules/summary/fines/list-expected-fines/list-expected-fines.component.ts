import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Payment } from "../../../../store/payment/payment.model";
import { Group } from "../../../../store/group/group.model";
import { CommonService } from "../../../../services/common.service";
import { FunctionsService } from "../../../../services/functions.service";
import { ExpectedFine } from "../../../../store/expected-fines/expected-fines.model";
import { fadeIn } from "src/app/shared/animations/router-animation";

@Component({
  selector: "app-list-expected-fines",
  templateUrl: "./list-expected-fines.component.html",
  styleUrls: ["./list-expected-fines.component.scss"],
  animations: [fadeIn],
})
export class ListExpectedFinesComponent implements OnInit {
  @Input() contributions: ExpectedFine[];
  @Input() group: Group;
  @Input() showDelete = true;
  @Input() expectedFinesSummary = [];

  @Output() closeForm = new EventEmitter();

  loading = false;
  loadingOne: { [id: string]: boolean } = {};
  memberSearch: string;
  constructor(private commonService: CommonService, private functionsService: FunctionsService) {}

  ngOnInit(): void {
    console.log("Summary", { summaey: this.expectedFinesSummary, fines: this.contributions });
  }

  async deleteFines() {
    const data = {
      groupId: this.group.id,
      payments: this.contributions.map((i) => ({ period: i.period, memberId: i.memberId })),
    };
    this.loading = true;
    try {
      await this.functionsService.saveData("deleteContribution", data);
      this.loading = false;
      this.commonService.showSuccess("Fines deleted Successful");
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError("Fines was not deleted successful");
      console.error(e);
    }
  }

  async deleteOneFine(fine: ExpectedFine) {
    const data = {
      groupId: this.group.id,
      fineId: fine.id,
      memberId: fine.memberId,
    };
    this.loadingOne[fine.id] = true;
    try {
      await this.functionsService.saveData("deleteExpectedFine", data);
      this.loadingOne[fine.id] = false;
      this.commonService.showSuccess("Expected Fine removed Successful");
    } catch (e) {
      this.loadingOne[fine.id] = false;
      this.commonService.showError("Expected Fine was not removed successful");
      console.error(e);
    }
  }

  onClose() {
    this.closeForm.emit();
  }
}
