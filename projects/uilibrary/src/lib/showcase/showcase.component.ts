import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationLink } from '../core/models/navigation-link';
import { NavigationLinkType } from '../core/enums/navigation-link-type.enum';
import { ToastService } from '../core/services/toast.service';
import { MenuTrigger } from '../modules/context-menu/menu-trigger.directive';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Item {
  id: number;
  name: string;
  disabled?: boolean
}

@Component({
  selector: 'uilibrary-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css'],
  standalone: false
})
export class ShowcaseComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private toastService: ToastService
  ) { }



  links: NavigationLink[] = [
    { label: 'Route', path: '/', type: NavigationLinkType.Route },
    { label: 'URL', path: 'http://www.google.com/', type: NavigationLinkType.URL },
    { label: 'Blank', path: 'http://www.google.com//', type: NavigationLinkType.TargetBlankURL },
    {
      label: 'DropDown', path: '', type: NavigationLinkType.Route, children: [
        { label: 'Route', path: '/', type: NavigationLinkType.Route },
        { label: 'URL', path: 'http://www.google.com///', type: NavigationLinkType.URL },
        { label: 'Blank', path: 'http://www.google.com////', type: NavigationLinkType.TargetBlankURL }
      ]
    }
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

  @ViewChild(MenuTrigger, { static: true }) menuTrigger!: MenuTrigger;

  rightClick(event: MouseEvent): void {
    event.preventDefault();
    this.menuTrigger.openMenu(event);
  }

  datePickers2 = new FormGroup({
    datePicker1: new FormControl(undefined, [Validators.required]),
    datePicker2: new FormControl(undefined, [Validators.required]),
    datePicker3: new FormControl(undefined, [Validators.required]),
    datePicker4: new FormControl(undefined, [Validators.required]),
    datePicker5: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
    startDate1: new FormControl(undefined, [Validators.required]),
    endDate1: new FormControl(undefined, [Validators.required]),
    startDate2: new FormControl(undefined, [Validators.required]),
    endDate2: new FormControl(undefined, [Validators.required]),
    startDate3: new FormControl(undefined, [Validators.required]),
    endDate3: new FormControl(undefined, [Validators.required]),
    startDate4: new FormControl(undefined, [Validators.required]),
    endDate4: new FormControl(undefined, [Validators.required]),
    startDate5: new FormControl(undefined, [Validators.required]),
    endDate5: new FormControl(undefined, [Validators.required]),
    startDate6: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
    endDate6: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
  })

  damnson(): void {
    console.log(this.datePickers2.value)
  }

  modelDatePicker1: Date = new Date();
  startDateModel: string | undefined = undefined;
  endDateModel: string | undefined = undefined;
  datePickerOpen: boolean = false;

  toggleOpen(): void {
    this.datePickerOpen = !this.datePickerOpen
    console.log(this.datePickerOpen)

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
    textInput1: new FormControl('', [Validators.required]),
    textInput2: new FormControl('', [Validators.required]),
    textInput3: new FormControl('', [Validators.required]),
    textInput4: new FormControl('', [Validators.required]),
    textArea1: new FormControl('', [Validators.required]),
    textArea2: new FormControl('', [Validators.required]),
    textArea3: new FormControl('', [Validators.required]),
    textArea4: new FormControl('', [Validators.required]),
  });

  textInput: string = '';
  textInputError: string = '';

  textInputs2 = new FormGroup({
    textInput21: new FormControl('', [Validators.required]),
    textInput22: new FormControl('Nancy', [Validators.required]),
    textInput23: new FormControl({ value: '', disabled: true }, [Validators.required]),
    textInput24: new FormControl({ value: 'Nancy', disabled: true }, [Validators.required]),
    placeholderFormControl: new FormControl('', [Validators.required]),

    prefixFormControl: new FormControl('', [Validators.required]),
    suffixFormControl: new FormControl('', [Validators.required]),
    prefixSuffixFormControl: new FormControl('', [Validators.required])
  });

  textAreas2 = new FormGroup({
    textArea1: new FormControl('', [Validators.required]),
    textArea2: new FormControl('Nancy', [Validators.required]),
    textArea3: new FormControl({ value: '', disabled: true }, [Validators.required]),
    textArea4: new FormControl({ value: 'Nancy', disabled: true }, [Validators.required]),
    placeholderFormControl: new FormControl('', [Validators.required]),
    prefixFormControl: new FormControl('', [Validators.required]),
    suffixFormControl: new FormControl('', [Validators.required]),
    prefixSuffixFormControl: new FormControl('', [Validators.required])
  });

  selectControls2 = new FormGroup({
    selectControl: new FormControl(undefined, [Validators.required]),
    placeholderFormControl: new FormControl(undefined, [Validators.required]),
    placeholderFormControl2: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
    prefixFormControl: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
    suffixFormControl: new FormControl(undefined, [Validators.required]),
    prefixSuffixFormControl: new FormControl(undefined, [Validators.required])
  });

  selectModel = { id: 1, name: 'Option 1' };
  selectMultiModel = [{ id: 2, name: 'Option 2' }, { id: 4, name: 'Option 4' }];
  selectMultiModelPrefill: any;

  textAreas = new FormGroup({
    textArea1: new FormControl('', [Validators.required]),
    textArea2: new FormControl('', [Validators.required]),
    textArea3: new FormControl('', [Validators.required]),
    textArea4: new FormControl('', [Validators.required]),
  });

  radioButtonDisabled: boolean = false;
  radioButtonModel: string = 'aaa';

  radioButtons = new FormGroup({
    radioButton1: new FormControl(undefined, [Validators.required]),
  });

  radioButtons2 = new FormGroup({
    radioButton1: new FormControl(6, [Validators.required]),
  });

  checkBoxes = new FormGroup({
    checkbox1: new FormControl(undefined, [Validators.required]),
    checkbox2: new FormControl(undefined, [Validators.required]),
  });

  toggles = new FormGroup({
    toggle1: new FormControl(undefined, [Validators.required]),
  })

  datePickers = new FormGroup({
    startDate: new FormControl(new Date().toISOString(), [Validators.required]),
    endDate: new FormControl(new Date().toISOString(), [Validators.required]),
    datePicker2: new FormControl(undefined, [Validators.required])
  });
  dateBindingValue1: string = new Date().toISOString();

  aValue: number = 1;
  checked: boolean = true;
  notChecked: boolean = false;

  radioButtonChecked() {
    this.notChecked = !this.notChecked;
    this.radioButtonDisabled = !this.radioButtonDisabled;
    this.radioButtonModel = '2';
    console.log(this.notChecked);
    console.log(this.radioButtons2.controls.radioButton1.value);
  }

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

  stringify(value: any) {
    return JSON.stringify(value);
  }

  items$ = this.getItems();

  getItems(): Observable<Item[]> {
    const items: Item[] = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' },
      { id: 4, name: 'Option 4' },
      { id: 5, name: 'Option 5' }
    ]
    return of(items)
  }

  setSelectedItems() {
    this.itemsModel = [{ id: 2, name: 'Option 2' }, { id: 3, name: 'Option 3' }]
  }

  setSelectedItem() {
    this.itemModel = { id: 2, name: 'Option 2' };
  }

  itemsModel: Item[] = [];
  itemModel: Item | undefined = undefined;

  $people: Observable<any[]> = of([]);
  selectedPeople: any[] = [];
  selectedPerson: any;

  ngOnInit(): void {
    this.currentSelection2 = this.items[1];
    this.currentSelection5 = this.items[1];

    this.$people = this.getPeople();
    this.setSelectedPeople();
    this.setSelectedPerson();

    this.setSelectedItem();
    this.setSelectedItems();
  }

  getPeople(term?: string): Observable<Person[]> {
    let items = getMockPeople();
    if (term) {
      items = items.filter((x) => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    }
    return of(items).pipe(delay(500));
  }

  setSelectedPeople() {
		this.selectedPeople = [
			{ id: '5a15b13c2340978ec3d2c0ea', name: 'Rochelle Estes' },
			{ id: '5a15b13c663ea0af9ad0dae8', name: 'Mendoza Ruiz' },
			{ id: '5a15b13c728cd3f43cc0fe8a', name: 'Marquez Nolan' },
		];
	}

  setSelectedPerson() {
    this.selectedPerson = { id: '5a15b13c2340978ec3d2c0ea', name: 'Rochelle Estes' };
  }
}

function getMockPeople() {
  return [
    {
      id: '5a15b13c36e7a7f00cf0d7cb',
      index: 2,
      isActive: true,
      picture: 'http://placehold.it/32x32',
      age: 23,
      name: 'Karyn Wright',
      gender: 'female',
      company: 'ZOLAR',
      email: 'karynwright@zolar.com',
      phone: '+1 (851) 583-2547',
    },
    {
      id: '5a15b13c2340978ec3d2c0ea',
      index: 3,
      isActive: false,
      picture: 'http://placehold.it/32x32',
      age: 35,
      name: 'Rochelle Estes',
      disabled: true,
      gender: 'female',
      company: 'EXTRAWEAR',
      email: 'rochelleestes@extrawear.com',
      phone: '+1 (849) 408-2029',
    },
    {
      id: '5a15b13c663ea0af9ad0dae8',
      index: 4,
      isActive: false,
      picture: 'http://placehold.it/32x32',
      age: 25,
      name: 'Mendoza Ruiz',
      gender: 'male',
      company: 'ZYTRAX',
      email: 'mendozaruiz@zytrax.com',
      phone: '+1 (904) 536-2020',
    },
    {
      id: '5a15b13cc9eeb36511d65acf',
      index: 5,
      isActive: false,
      picture: 'http://placehold.it/32x32',
      age: 39,
      name: 'Rosales Russell',
      gender: 'male',
      company: 'ELEMANTRA',
      email: 'rosalesrussell@elemantra.com',
      phone: '+1 (868) 473-3073',
    },
    {
      id: '5a15b13c728cd3f43cc0fe8a',
      index: 6,
      isActive: true,
      picture: 'http://placehold.it/32x32',
      age: 32,
      name: 'Marquez Nolan',
      gender: 'male',
      company: 'MIRACLIS',
      disabled: true,
      email: 'marqueznolan@miraclis.com',
      phone: '+1 (853) 571-3921',
    },
    {
      id: '5a15b13ca51b0aaf8a99c05a',
      index: 7,
      isActive: false,
      picture: 'http://placehold.it/32x32',
      age: 28,
      name: 'Franklin James',
      gender: 'male',
      company: 'CAXT',
      email: 'franklinjames@caxt.com',
      phone: '+1 (868) 539-2984',
    },
    {
      id: '5a15b13cc3b9381ffcb1d6f7',
      index: 8,
      isActive: false,
      picture: 'http://placehold.it/32x32',
      age: 24,
      name: 'Elsa Bradley',
      gender: 'female',
      company: 'MATRIXITY',
      email: 'elsabradley@matrixity.com',
      phone: '+1 (994) 583-3850',
    },
    {
      id: '5a15b13ce58cb6ff62c65164',
      index: 9,
      isActive: true,
      picture: 'http://placehold.it/32x32',
      age: 40,
      name: 'Pearson Thompson',
      gender: 'male',
      company: 'EZENT',
      email: 'pearsonthompson@ezent.com',
      phone: '+1 (917) 537-2178',
    },
    {
      id: '5a15b13c90b95eb68010c86e',
      index: 10,
      isActive: true,
      picture: 'http://placehold.it/32x32',
      age: 32,
      name: 'Ina Pugh',
      gender: 'female',
      company: 'MANTRIX',
      email: 'inapugh@mantrix.com',
      phone: '+1 (917) 450-2372',
    },
    {
      id: '5a15b13c2b1746e12788711f',
      index: 11,
      isActive: true,
      picture: 'http://placehold.it/32x32',
      age: 25,
      name: 'Nguyen Elliott',
      gender: 'male',
      company: 'PORTALINE',
      email: 'nguyenelliott@portaline.com',
      phone: '+1 (905) 491-3377',
    },
    {
      id: '5a15b13c605403381eec5019',
      index: 12,
      isActive: true,
      picture: 'http://placehold.it/32x32',
      age: 31,
      name: 'Mills Barnett',
      gender: 'male',
      company: 'FARMEX',
      email: 'millsbarnett@farmex.com',
      phone: '+1 (882) 462-3986',
    },
    {
      id: '5a15b13c67e2e6d1a3cd6ca5',
      index: 13,
      isActive: true,
      picture: 'http://placehold.it/32x32',
      age: 36,
      name: 'Margaret Reynolds',
      gender: 'female',
      company: 'ROOFORIA',
      email: 'margaretreynolds@rooforia.com',
      phone: '+1 (935) 435-2345',
    },
    {
      id: '5a15b13c947c836d177aa85c',
      index: 14,
      isActive: false,
      picture: 'http://placehold.it/32x32',
      age: 29,
      name: 'Yvette Navarro',
      gender: 'female',
      company: 'KINETICA',
      email: 'yvettenavarro@kinetica.com',
      phone: '+1 (807) 485-3824',
    },
    {
      id: '5a15b13c5dbbe61245c1fb73',
      index: 15,
      isActive: false,
      picture: 'http://placehold.it/32x32',
      age: 20,
      name: 'Elisa Guzman',
      gender: 'female',
      company: 'KAGE',
      email: 'elisaguzman@kage.com',
      phone: '+1 (868) 594-2919',
    },
    {
      id: '5a15b13c38fd49fefea8db80',
      index: 16,
      isActive: false,
      picture: 'http://placehold.it/32x32',
      age: 33,
      name: 'Jodie Bowman',
      gender: 'female',
      company: 'EMTRAC',
      email: 'jodiebowman@emtrac.com',
      phone: '+1 (891) 565-2560',
    },
    {
      id: '5a15b13c9680913c470eb8fd',
      index: 17,
      isActive: false,
      picture: 'http://placehold.it/32x32',
      age: 24,
      name: 'Diann Booker',
      gender: 'female',
      company: 'LYRIA',
      email: 'diannbooker@lyria.com',
      phone: '+1 (830) 555-3209',
    },
  ];
}

export interface Person {
  id: string;
  isActive: boolean;
  age: number;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  disabled?: boolean;
}