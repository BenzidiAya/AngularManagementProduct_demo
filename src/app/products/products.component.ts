import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public products : Array<Product>=[];
  public keyword : string = "";
  totalPages:number=0;
  pageSize=3;
  currentPage : number=1;
  constructor(private productService : ProductService,
              private router : Router) {
  }
    ngOnInit() {
        this.getProducts();
    }

    getProducts () {
     this.productService.getProducts(this.keyword,this.currentPage, this.pageSize)
        .subscribe({
          next : (respo) => {
            this.products=respo.body as Product[];
            let totalProducts:number=parseInt(respo.headers.get('x-total-count')!);
            this.totalPages=Math.floor(totalProducts / this.pageSize);
            if(totalProducts % this.pageSize !=0){
              this.totalPages=this.totalPages+1;
            }
          },
          error : err => {
            console.log(err);
          }
        })



      //this.products$=this.productService.getProducts();
    }


  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
        .subscribe({
      next : data => {
        product.checked =! product.checked;
      }
    })
  }

  handleDelete(product: Product) {
    if (confirm("Etes-vous sûre?"))
    this.productService.deleteProduct(product)
      .subscribe({
        next : data => {
          //this.getProducts()
          this.products=this.products.filter(p=>p.id!=product.id);
        }
      })
  }


  handleGotoPage(page:number) {
    this.currentPage=page;
    this.getProducts()
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
