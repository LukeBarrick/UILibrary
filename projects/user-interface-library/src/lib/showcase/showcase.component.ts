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
    this.currentSelection2 = this.items[1];
  }

  items: Item[] = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Option 4' },
    { id: 5, name: 'Option 5' }
  ];

  form: FormGroup = this.formBuilder.nonNullable.group({
    button: ['', Validators.required],
  });

  public patchFormValue($event: string): void {
    this.form.patchValue({
      button: $event,
    });
  }

 

  selectControls = new FormGroup({
    selectControl: new FormControl(undefined, [Validators.required]),
    selectControl2: new FormControl(undefined, [Validators.required]),
    selectControl3: new FormControl(undefined, [Validators.required]),
    selectControl4: new FormControl(undefined, [Validators.required]),
    selectControl5: new FormControl(undefined, [Validators.required]),
    selectControl6: new FormControl(undefined, [Validators.required])
  });

  textInputs = new FormGroup({
    textInput1: new FormControl('',[Validators.required]),
    textInput2: new FormControl('',[Validators.required]),
    textInput3: new FormControl('',[Validators.required]),
    textInput4: new FormControl('',[Validators.required]),
  
  });

  currentSelection: Item | undefined;
  currentSelection2: Item | undefined;

  customSearchFn(term: string, item: Item) {
    term = term.toLocaleLowerCase();
    return item.name.toLocaleLowerCase().indexOf(term) > -1;
  }

  debug() {
    console.log(this.selectControls)
    console.log(this.textInputs)
    console.log(this.currentSelection)
    console.log(this.currentSelection2)

    //Getting values from select form control
    let value = this.selectControls.controls.selectControl.value as Item | null;
    console.log(value?.id);
    console.log(value?.name);
  }
}
