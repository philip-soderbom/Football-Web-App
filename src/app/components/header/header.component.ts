import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  links: any[] = [['Start', '/'], ['Squad', '/squad']];
  activeLink!: string;
  currentSearch!: string;
  bgColor: string = 'blue';

  constructor() { }

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

  changeActive(newActive: string) {
    this.activeLink = newActive;
  }


}