import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationLink } from '../core/models/navigation-link';
import { NavigationLinkType } from '../core/enums/navigation-link-type.enum';
import { ToastService } from '../core/services/toast.service';

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

  constructor(private formBuilder: FormBuilder,
              private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.currentSelection2 = this.items[1];
    this.currentSelection5 = this.items[1];
  }

  links: NavigationLink[] = [
    { label:'Route', path:'/', type: NavigationLinkType.Route },
    { label:'URL', path:'http://www.google.com', type: NavigationLinkType.URL },
    { label:'Blank', path:'http://www.google.com', type: NavigationLinkType.TargetBlankURL },
    { label: 'DropDown', path:'', type: NavigationLinkType.Route, children: [
      { label:'Route', path:'/', type: NavigationLinkType.Route },
      { label:'URL', path:'http://www.google.com', type: NavigationLinkType.URL },
      { label:'Blank', path:'http://www.google.com', type: NavigationLinkType.TargetBlankURL }
    ]}
  ];

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
    textArea1: new FormControl('',[Validators.required]),
    textArea2: new FormControl('',[Validators.required]),
    textArea3: new FormControl('',[Validators.required]),
    textArea4: new FormControl('',[Validators.required]),
  });

  textInput: string = '';
  textInputError: string = '';

  textInputs2 = new FormGroup({
    textInput21: new FormControl('',[Validators.required]),
    textInput22: new FormControl('Nancy',[Validators.required]),
    textInput23: new FormControl({value: '', disabled: true},[Validators.required]),
    textInput24: new FormControl({value: 'Nancy', disabled: true},[Validators.required]),
    placeholderFormControl: new FormControl('', [Validators.required]),
    prefixFormControl: new FormControl('', [Validators.required]),
    suffixFormControl: new FormControl('', [Validators.required]),
    prefixSuffixFormControl: new FormControl('', [Validators.required])
  });

  textAreas2 = new FormGroup({
    textArea1: new FormControl('',[Validators.required]),
    textArea2: new FormControl('Nancy',[Validators.required]),
    textArea3: new FormControl({value: '', disabled: true},[Validators.required]),
    textArea4: new FormControl({value: 'Nancy', disabled: true},[Validators.required]),
    placeholderFormControl: new FormControl('', [Validators.required]),
    prefixFormControl: new FormControl('', [Validators.required]),
    suffixFormControl: new FormControl('', [Validators.required]),
    prefixSuffixFormControl: new FormControl('', [Validators.required])
  });

  selectControls2 = new FormGroup({
    selectControl: new FormControl(undefined, [Validators.required]),
    placeholderFormControl: new FormControl(undefined, [Validators.required]),
    prefixFormControl: new FormControl(undefined, [Validators.required]),
    suffixFormControl: new FormControl(undefined, [Validators.required]),
    prefixSuffixFormControl: new FormControl(undefined, [Validators.required])
  });

  selectModel =  { id: 1, name: 'Option 1' };

  textAreas = new FormGroup({
    textArea1: new FormControl('',[Validators.required]),
    textArea2: new FormControl('',[Validators.required]),
    textArea3: new FormControl('',[Validators.required]),
    textArea4: new FormControl('',[Validators.required]),
  });

  radioButtons = new FormGroup({
    radioButton1: new FormControl(undefined, [Validators.required]),
  });

  checkBoxes = new FormGroup({
    checkbox1: new FormControl(undefined, [Validators.required]),
    checkbox2: new FormControl(undefined, [Validators.required]),
  });

  toggles = new FormGroup({
    toggle1: new FormControl(undefined, [Validators.required]),
  })

  datePickers = new FormGroup({
    startDate: new FormControl(new Date().toISOString(),[Validators.required]),
    endDate: new FormControl(new Date().toISOString(),[Validators.required]),
    datePicker2: new FormControl(undefined,[Validators.required])
  });
  dateBindingValue1: string = new Date().toISOString();

  checked: boolean = true;

  currentSelection: Item | undefined;
  currentSelection2: Item | undefined;
  currentSelection3: string = '1';
  currentSelection4: string = 'Some text...';
  currentSelection5: Item | undefined;
  

  isDisabled: boolean = true;

  customSearchFn(term: string, item: Item) {
    term = term.toLocaleLowerCase();
    return item.name.toLocaleLowerCase().indexOf(term) > -1;
  }

  debugme() {
    console.log(this.textInputs2);
    console.log(this.selectControls2)

    console.log(this.textInput);
    console.log(this.textInputs2.controls.textInput21.disabled)
    console.log(this.textInputs2.controls.textInput22.disabled)
  }

  debug() {
    console.log(this.selectControls)
    console.log(this.textInputs)
    console.log(this.textAreas)
   
    console.log(this.checkBoxes)
    console.log(this.toggles)
    console.log(this.currentSelection)
    console.log(this.currentSelection2)

    // this.textInputs.disable();
    // this.textAreas.disable()
    // this.selectControls.disable()
    // this.radioButtons.disable()
    // this.checkBoxes.disable()
    // this.toggles.disable()

    console.log(this.checkBoxes)
    console.log(this.radioButtons)
   

    this.isDisabled = false;

    //Getting values from select form control
    let value = this.selectControls.controls.selectControl.value as Item | null;
  }

  debug2() {
    this.toastService.success("message", "title");
    this.toastService.info("message", "title");
    this.toastService.warning("message", "title");
    this.toastService.error("message", "title");

    console.log(this.datePickers);
  }
}
