import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  formGroup!: FormGroup;
  searchField: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)])
 

  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      searchField: this.searchField
    })
  }

  onTeamSearch() {
    //console.log("team search in form.ts: ", this.teamSearch)
    console.log("team searched for: ", this.searchField.value)
    
    let search = this.searchField.value
    // emitting to parent (start.component.html)
    this.onSearch.emit(search)
    //this.formGroup.reset();
    //this.searchField.reset();
  }

  clearOnFocus() {
    this.searchField.reset();
  }

  getErrorMessage(control: AbstractControl): string {
    // Don't say anything if control doesn't exist, or is valid
    if (!control || control.valid) {
      return '';
    }

    // Required always comes first
    if (control.hasError('required')) {
      return "Cannot be empty";
    }

    if (control.hasError('minlength')) {
      const limit = control.getError('minlength').requiredLength;
      return `Must be at least ${limit} characters`;
    }
    // Default general error message
    return "Invalid input";
  }

}
