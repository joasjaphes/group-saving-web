import {Component, OnInit} from '@angular/core';
import {routeAnimations} from '../shared/animations/router-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AngularFirestore} from '@angular/fire/firestore';
import {OfflineManagerService} from '../services/offline-manager.service';
import {LastUpdatedAt} from '../store/last-updated-at/last-updated-at.model';
import {FirestoreService} from '../services/firestore.service';
import {getGroups} from '../store/group/group.actions';
import {DataKeys} from '../store/data-keys';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routeAnimations]
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private afs: AngularFirestore,
    private offlineService: OfflineManagerService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {}

  async initiateLastUpdatedTimes() {
    this.afs
      .collection('last_updated').doc('times')
      .valueChanges()
      .subscribe(async (updateTimes: any) => {
        // Get Last Updated Times from the local database
        const localTimes: LastUpdatedAt = await this.offlineService.getLastUpdatedTimes();
        this.firestoreService.getUpdatedData(localTimes, updateTimes, DataKeys.Group, this.firestoreService.getData, getGroups());
        this.offlineService.saveLastUpdatedTimes({
          ...updateTimes,
          id: 'times'
        }).then();
      });
  }

}
