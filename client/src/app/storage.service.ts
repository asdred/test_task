import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable()
export class StorageService extends Dexie {
	
    products: Dexie.Table<IProduct, number>;

	constructor () {
		super("StorageService");
		this.version(1).stores({
			products: '++id, name, description, weight',
		});
	}
  
	addProduct(name:string, description:string, weight:number) {
		return this.products.add({name: name, description: description, weight: weight});
	}
  
	getProducts() {
		return this.products.toArray();
	}
	
	updateProduct(product: IProduct) {
		return this.products.update(product.id, product);
	}
  
}

export interface IProduct {
	id?: number;
	name: string;
	description: string;
	weight: number
}