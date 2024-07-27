import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'uilibrary-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css'],
})
export class ShowcaseComponent {
  form: FormGroup = this.formBuilder.nonNullable.group({
    button: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder) {}
  public patchFormValue($event: string): void {
    this.form.patchValue({
      button: $event,
    });
  }

  //Select Area Setup
  form2 = new FormGroup({
    selectControl: new FormControl('', [Validators.required]),
    selectControl2: new FormControl('', [Validators.required])
  });

  items: Item[] = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];

  customSearchFn(term: string, item: Item) {
    item.name = item.name.replace(',','');
    term = term.toLocaleLowerCase();
    return item.name.toLocaleLowerCase().indexOf(term) > -1;
  }

  debug() {
    console.log(this.form2)
  }

}
