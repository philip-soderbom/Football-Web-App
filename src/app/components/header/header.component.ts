import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentSearch!: string | null;

  constructor(private router: Router, private stateService: StateService) { }

  ngOnInit(): void {
    if (window.localStorage.length > 0) {
      let storedString = window.localStorage.getItem('search');
      if (typeof storedString === 'string') {
        let storedObject: string[] = JSON.parse(storedString);
        let teamName = storedObject[0];
        this.currentSearch = teamName;
      }
      
    }
    
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }

}
