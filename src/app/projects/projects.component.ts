import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public dt:Date = new Date();

  constructor() { }

  ngOnInit() {
  }

  makeHttp() {
    // this.api.get('/test/members_only').subscribe(
    //   resp => {
    //     console.log(resp);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
  }
}
