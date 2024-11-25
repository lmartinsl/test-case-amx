import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/core/models/product.interface';
import { User } from 'src/app/core/models/user.interface';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { NotificationAlertService } from 'src/app/core/services/notification-alert.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  totalRecords: number = 0;

  inputFilter: string = '';

  loading: boolean = false;
  visiblePreview: boolean = false;
  visibleEdit: boolean = false;
  editDialogVisible: boolean = false;

  selectedProduct: Product | null = null;

  private originalProducts: Product[] = [];
  private inputFilterSubject = new Subject<string>();

  productForm!: FormGroup;

  currentUser$: Observable<User>;

  constructor(
    private _appService: AppService,
    private _catalogService: CatalogService,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _notificationAlertService: NotificationAlertService
  ) {
    this.currentUser$ = this._appService.getCurrentUser();

    this.productForm = this._fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
    });

    this.inputFilterSubject
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe({
        next: (filterValue) => {
          this.products = this.originalProducts.filter((product) =>
            product.title.toLowerCase().includes(filterValue.toLowerCase())
          );
        },
      });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  filterProducts(searchTerm: string): void {
    if (searchTerm && searchTerm.length >= 3) {
      this.inputFilterSubject.next(searchTerm);
    } else if (searchTerm.length === 0) {
      this.products = [...this.originalProducts];
    }
  }

  loadProducts(): void {
    this.loading = true;
    this._catalogService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.totalRecords = products.length;
        this.loading = false;

        this.originalProducts = [...this.products];
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  delete(productId: number): void {
    this.loading = true;
    this._catalogService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
        this.totalRecords = this.products.length;
        this.loading = false;

        this.originalProducts = [...this.products];

        this._notificationAlertService.success('Sucesso', 'Exclusão efetuada.');
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  edit(productId: number): void {
    this._catalogService.getProductById(productId).subscribe((product) => {
      this.selectedProduct = product;

      this.productForm.patchValue({
        title: product.title,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image,
      });

      this.visibleEdit = true;
    });
  }

  saveChanges(): void {
    if (this.productForm.invalid) {
      return;
    }

    const updatedProduct: Product = {
      ...this.selectedProduct,
      ...this.productForm.value,
    };

    this._catalogService
      .updateProduct(updatedProduct.id, updatedProduct)
      .subscribe({
        next: (product) => {
          const index = this.products.findIndex((p) => p.id === product.id);
          if (index !== -1) {
            this.products = [
              ...this.products.slice(0, index),
              product,
              ...this.products.slice(index + 1),
            ];
          }

          this.visibleEdit = false;

          this.originalProducts = [...this.products];

          this._cdr.detectChanges();

          this._notificationAlertService.success(
            'Sucesso',
            'Produto atualizado.'
          );
        },
        error: () => {
          this.visibleEdit = false;
        },
      });
  }

  preview(product: Product): void {
    this.selectedProduct = product;
    this.visiblePreview = true;
  }
}
