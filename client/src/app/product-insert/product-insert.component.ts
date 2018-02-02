import { Component, OnInit } from '@angular/core';

import { StorageService } from '../storage.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.styl']
})
export class ProductInsertComponent implements OnInit {

  reactiveForm: FormGroup;
  formDanger: boolean = false;
  get buttonClasses() {
    return {
      'btn btn-block btn-lg btn-primary': true,
      'btn-danger': this.formDanger,
    }
  }

  constructor(private fb: FormBuilder, private storageService: StorageService){
    
  }

  ngOnInit() {
    this.initForm();
  }
  
  /** Инициализация формы*/
  initForm() {
    this.reactiveForm = this.fb.group({
      name: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      description: ['', [
          Validators.required,
        ]
      ],
      weight: ['', [
          Validators.required,
          Validators.pattern(/[0-9]/),
          Validators.max(100),
          Validators.min(0)
        ]
      ],
    });
  }
  
  addProduct() {
    if (this.isFormValid()) {
      let product = this.reactiveForm.value;
      this.storageService.addProduct(product.name, product.description, product.weight).then(() => {
        alert('Товар добавлен');
      });
    } else {
      alert('Форма заполнена некорректно');
    }
  }
  
  isControlInvalid(controlName: string): boolean {
    const control = this.reactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }
  
  isFormValid() {
    if (this.reactiveForm) {
      const controls = this.reactiveForm.controls;

      if (this.reactiveForm.invalid) {
        Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      }
      return !this.reactiveForm.invalid;
    }
    return true;
  }
  
  onKeyUp() {
    if (this.reactiveForm) {
      this.reactiveForm.invalid ?
        this.formDanger = true :
        this.formDanger = false;
    }
  }
}
