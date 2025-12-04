import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Item {
  id: number;
  name: string;
  description?: string;
}

@Component({
  selector: 'app-select-showcase',
  templateUrl: './select-showcase.component.html',
  styleUrls: ['./select-showcase.component.css']
})
export class SelectShowcaseComponent implements OnInit {
  selectControls2: FormGroup;

  items: Item[] = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Option 4' },
    { id: 5, name: 'Option 5' }
  ];

  extendedItems: Item[] = [
    { id: 1, name: 'Web Development', description: 'Frontend and backend development services' },
    { id: 2, name: 'Mobile Apps', description: 'iOS and Android application development' },
    { id: 3, name: 'UI/UX Design', description: 'User interface and experience design' },
    { id: 4, name: 'Consulting', description: 'Technical consultation and architecture' },
    { id: 5, name: 'DevOps', description: 'Deployment and infrastructure management' },
    { id: 6, name: 'Quality Assurance', description: 'Testing and quality control services' },
    { id: 7, name: 'Data Analytics', description: 'Business intelligence and data analysis' }
  ];

  selectModel = { id: 1, name: 'Option 1' };
  selectMultiModel = [{ id: 2, name: 'Option 2' }, { id: 4, name: 'Option 4' }];
  selectMultiModelPrefill: any;
  advancedSelectModel: number | null = null;
  customSearchModel: any = null;

  constructor(private formBuilder: FormBuilder) {
    this.selectControls2 = this.formBuilder.group({
      selectControl: [undefined, Validators.required],
      placeholderFormControl: [undefined, Validators.required],
      prefixFormControl: [undefined, Validators.required],
      suffixFormControl: [undefined, Validators.required],
      prefixSuffixFormControl: [undefined, Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize prefilled multi-select
    this.selectMultiModelPrefill = [this.items[0]];
  }

  customSearchFn(term: string, item: Item): boolean {
    term = term.toLowerCase();
    return item.name.toLowerCase().indexOf(term) > -1 ||
           !!(item.description && item.description.toLowerCase().indexOf(term) > -1);
  }

  stringify(value: any): string {
    return JSON.stringify(value, null, 2);
  }
}