import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormParamsObject } from './form-params-object';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  hasObj = false;
  jsonFormError = false;
  jsonForm = new FormGroup({
    data: new FormControl(''),
  });

  displayForm = new FormGroup({
    data: new FormControl(''),
  });

  formParamsObject: FormParamsObject | null = null;

  constructor() {}

  setDisplayFormValue(value: any) {
    this.displayForm.setValue({
      data: value !== null ? JSON.stringify(value, null, 2) : 'null',
    });
  }

  createObj() {
    try {
      if (this.jsonForm.value.data) {
        const parsedData = JSON.parse(this.jsonForm.value.data);
        this.formParamsObject = new FormParamsObject(parsedData);
        this.hasObj = true;
      } else {
        throw new Error('No value');
      }
    } catch (e) {
      alert('Invalid JSON');
    }
  }

  resetForm() {
    this.jsonForm.reset();
    this.formParamsObject = null;
  }

  getFullObject() {
    const obj = this.formParamsObject?.getFullObject();
    this.setDisplayFormValue(obj);
  }

  convertObjectToArray() {
    let path = prompt('Please enter params', '');
    if (path) {
      const arr = this.formParamsObject?.convertObjectToArray(path);
      this.setDisplayFormValue(arr);
    }
  }

  getObjectProperty() {
    let input = prompt('Please enter params', '');

    if (input) {
      const objProperty = this.formParamsObject?.getObjectProperty(input);
      this.setDisplayFormValue(objProperty);
    }
  }

  setObjectProperty() {
    let input = prompt('Please enter params', '');

    if (input) {
      let [path, value] = input
        .trim()
        .split(',')
        .map((item) => item.trim());
      this.formParamsObject?.setObjectProperty(path, value);
    }
  }
}
