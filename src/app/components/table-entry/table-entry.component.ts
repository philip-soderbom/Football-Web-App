import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-entry',
  templateUrl: './table-entry.component.html',
  styleUrls: ['./table-entry.component.css']
})
export class TableEntryComponent implements OnInit {
  @Input() table!: any[];
  @Input() teamSearched!: string;
  @Input() form!: string;

  
  constructor() { }

  ngOnInit(): void {}

  styleNaming(entry: any): Object {
    let styleObj = {
      'color': entry.team.name === this.teamSearched ? 'white' : 'black',
      'font-weight': 'bold',
      'font-size': '18px',
      'background': entry.team.name === this.teamSearched ? 'green' : 'transparent',
      'border-radius': '6px',
      'padding': '3px 8px',
    };
    return styleObj;
  }

  styleEntry(table: any[], rank: number): Object {
    let styleObj = {
      'margin': '8px 0',
      'background-color': this.inRelegationZone(table, rank) ? '#F44336' : 'white'
    };
    return styleObj;
  }

  inRelegationZone(table: any[], rank: number): boolean {
    let positions = table.length;
    return rank > (positions - 3)
  }

  convertToArray(formString: string) {
    return [...formString];
  }

  styleFormContainer() {
    let styleObj = {
      'margin': '0 10px',
      'background-color': 'rgb(215, 215, 215)',
      'border-radius': '5px',
      'padding': '5px',
    }
    return styleObj;
  }

  styleForm(result: string): Object {
    let styleObj = {
      'text-align': 'center',
      'margin': '0',
      'min-width': '15px',
      'font-weight': 'bold',
      'color': this.decideColor(result)
    };
    return styleObj;
  }

  decideColor(result: string) {
    switch(result) {
      case 'W': return 'green';
      case 'D': return 'orange';
      case 'L': return '#F44336';
      default: return 'black';
    }
  }

}




