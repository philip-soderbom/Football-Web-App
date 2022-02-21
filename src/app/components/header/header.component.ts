import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentSearch!: string;

  constructor(private router: Router) { }

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