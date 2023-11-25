import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../product.service";
import {CartService} from "../../cart/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(prods => {
      this.products = prods;
      this.filteredProducts = prods;
    })
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open("Product add to cart", "", {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 200
        })
      }
    })
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredProducts = this.products.filter(product => {
      product.name.toLowerCase().includes(searchTerm);
    })
  }
}
