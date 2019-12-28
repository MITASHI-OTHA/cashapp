import { ServerService } from './../server.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit {
  id
  pari
  constructor(public route: ActivatedRoute, public service: ServerService) { }

  ngOnInit() {
    let id = this.route.snapshot.queryParams.id
    console.log(this.route.snapshot)
    this.id = id
    this.service.parisSubscription.subscribe((e:any)=> {
      this.pari = e.find((i)=> {
        
          return i.id_p == id
      })
    })
    this.service.getparis()
    console.log('paris current ', this.pari)
  }

}
