import { Component, OnInit } from '@angular/core';
import { StorageService, IProduct } from '../storage.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.styl']
})
export class ProductListComponent implements OnInit {

	products: Array<IProduct>;
	isProductSelected: boolean = false;
	selectedProduct: IProduct;
	reactiveForm: FormGroup;
	formDanger: boolean = false;
	
	get buttonClasses() {
	  return {
	    'btn btn-block btn-lg btn-primary': true,
	    'btn-danger': this.formDanger
	  }
	}

	constructor(private fb: FormBuilder, private storageService: StorageService) { }

	ngOnInit() {
		this.getProducts();
		this.initForm();
	}
	
	getProducts() {
		let self = this;
		this.storageService.getProducts().then((products) => {
			self.products = products;
		})
	}
	
	selectProduct(event, product) {
		this.isProductSelected = true;
		this.reactiveForm.controls.name.setValue(product.name);
		this.reactiveForm.controls.description.setValue(product.description);
		this.reactiveForm.controls.weight.setValue(product.weight);
		this.selectedProduct = product;
	}
	
	updateProduct() {
		let self = this;
		this.selectedProduct.name = this.reactiveForm.controls.name.value;
		this.selectedProduct.description = this.reactiveForm.controls.description.value;
		this.selectedProduct.weight = this.reactiveForm.controls.weight.value;
		this.storageService.updateProduct(this.selectedProduct).then((product) => {
			alert('товар изменён');
			self.cancel();
			self.getProducts();
		})
	}
	
	/* можно вынести в отдельный компонент, но времени нет */
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
	
	cancel() {
		if (this.reactiveForm) {
			this.selectedProduct = null;
			this.isProductSelected = false;
		}
	}
}
