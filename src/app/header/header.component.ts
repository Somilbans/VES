import { Component, OnInit, Inject } from '@angular/core';

import { Leader } from '../shared/leader';

import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  leader:Leader;
  leaderErrMess: string;

  constructor(private leaderservice: LeaderService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader =leader, errmess => this.leaderErrMess = <any>errmess);
 
  }

}
