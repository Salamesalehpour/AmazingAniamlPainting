import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit{
  carts: Product[] = [];
  totalPrice: number = 0;
  constructor(private cartService: CartService) {
  }
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(carts => {
      this.carts = carts;
      this.totalPrice = this.sumCartsPrice();
    })
  }

  checkout(): void {
    this.cartService.checkout(this.carts).subscribe();
  }
  clearCarts(): void {
    this.cartService.clearCard().subscribe();
  }
  sumCartsPrice(): number {
    let sum = 0;
    for (let cart of this.carts)
      sum += cart.price;

    return sum;
  }

}
