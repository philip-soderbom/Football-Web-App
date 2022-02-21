import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  teamSearch!: string;

  constructor() { }

  ngOnInit(): void {
  }

  onTeamSearch() {
    console.log("team search in form.ts: ", this.teamSearch)
    
    let search = this.teamSearch
    // emitting to parent (start.component.html)
    this.onSearch.emit(search)
    this.teamSearch = ""
  }

}
