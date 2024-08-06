import { Component, OnInit } from '@angular/core';
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
export class ShowcaseComponent implements OnInit {
 
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  
  }

  items: Item[] = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];

  form: FormGroup = this.formBuilder.nonNullable.group({
    button: ['', Validators.required],
  });

  public patchFormValue($event: string): void {
    this.form.patchValue({
      button: $event,
    });
  }

  form2 = new FormGroup({
    selectControl: new FormControl(undefined, [Validators.required]),
    selectControl2: new FormControl(undefined, [Validators.required]),
    selectControl3: new FormControl(undefined, [Validators.required]),
    selectControl4: new FormControl(undefined, [Validators.required]),
    selectControl5: new FormControl(undefined, [Validators.required]),
    selectControl6: new FormControl(undefined, [Validators.required])
  });

  currentSelection: Item | undefined;
  currentSelection2: Item | undefined = { id: 2, name: 'Option 2' };

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.name.toLocaleLowerCase().indexOf(term) > -1;
  }

  debug() {
    console.log(this.form2)
    console.log(this.currentSelection)

    //Getting values from select form control
    let value = this.form2.controls.selectControl.value as Item | null;
    console.log(value?.id);
    console.log(value?.name);
  }
}
