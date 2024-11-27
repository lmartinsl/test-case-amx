import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ActionEnum } from 'src/app/core/enums/action.enum';
import { ProfileEnum } from 'src/app/core/enums/profile.enum';
import { Product } from 'src/app/core/models/product.interface';
import { User } from 'src/app/core/models/user.interface';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { NotificationAlertService } from 'src/app/core/services/notification-alert.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  products: Product[] = [];
  categories: { name: string }[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  inputFilter: string = '';

  loading: boolean = false;
  visiblePreview: boolean = false;
  visibleEdit: boolean = false;
  editDialogVisible: boolean = false;
  isEditMode: boolean = false;

  action = ActionEnum;

  inputImageCreate: string | undefined = undefined;
  selectedProduct: Product | undefined = undefined;
  uploadedFileName: string | undefined = undefined;

  private inputFilterSubject = new Subject<string>();
  private originalProducts: Product[] = [];

  productForm!: FormGroup;

  currentUser$: Observable<User>;

  constructor(
    private _utilsService: UtilsService,
    private _appService: AppService,
    private _catalogService: CatalogService,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _notificationAlertService: NotificationAlertService
  ) {
    this.currentUser$ = this._appService.getCurrentUser();
    this.categories = this._utilsService
      .getProductCategories()
      .map((category) => ({
        name: category,
      }));

    this.productForm = this._fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      fileName: [''],
    });

    this.subscriptions.add(
      this.inputFilterSubject
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe({
          next: (filterValue) => {
            this.products = this.originalProducts.filter((product) =>
              product.title.toLowerCase().includes(filterValue.toLowerCase())
            );
          },
        })
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const width = window.innerWidth;
    this.rows = width <= 1058 ? 2 : 5;
  }

  canAction(profile: ProfileEnum, action: string): boolean {
    const permissions = {
      [ProfileEnum.ADMIN]: ['edit', 'delete', 'create', 'view'],
      [ProfileEnum.SELLER]: ['edit', 'create', 'view'],
      [ProfileEnum.CLIENT]: ['view'],
    };

    return permissions[profile]?.includes(action) || false;
  }

  getProfileMap(profile: ProfileEnum): string {
    return this._utilsService.profileMap(profile);
  }

  formatReal(value: number): string | undefined {
    return this._utilsService.formatReal(value);
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
    this.subscriptions.add(
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
      })
    );
  }

  openModalForNewProduct(): void {
    this.isEditMode = false;
    this.selectedProduct = undefined;
    this.inputImageCreate = undefined;
    this.productForm.reset({
      title: '',
      category: '',
      description: '',
      price: 0,
      image: '',
      fileName: '',
    });
    this.visibleEdit = true;
  }

  delete(productId: number): void {
    this.loading = true;
    this.subscriptions.add(
      this._catalogService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(
            (product) => product.id !== productId
          );
          this.totalRecords = this.products.length;
          this.loading = false;

          this.originalProducts = [...this.products];

          this._notificationAlertService.success(
            'Sucesso',
            'Exclusão efetuada.'
          );
        },
        error: () => {
          this.loading = false;
        },
      })
    );
  }

  edit(productId: number): void {
    this.subscriptions.add(
      this._catalogService.getProductById(productId).subscribe((product) => {
        this.selectedProduct = product;

        this.productForm.patchValue({
          title: product.title,
          category: product.category,
          description: product.description,
          price: product.price,
          image: product.image,
          fileName: product.fileName,
        });

        this.visibleEdit = true;
        this.isEditMode = true;
      })
    );
  }

  saveChanges(): void {
    if (this.productForm.invalid) {
      return;
    }

    const productData: Product = { ...this.productForm.value };

    if (this.isEditMode && this.selectedProduct) {
      this.subscriptions.add(
        this._catalogService
          .updateProduct(this.selectedProduct.id, productData)
          .subscribe({
            next: (product) => {
              const index = this.products.findIndex((p) => p.id === product.id);
              if (index !== -1) {
                this.products[index] = product;
              }
              this.products = [...this.products];
              this.totalRecords = this.products.length;
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
          })
      );
    } else {
      this.subscriptions.add(
        this._catalogService.createProduct(productData).subscribe({
          next: (newProduct) => {
            newProduct.rating = { count: 0, rate: 0 };

            this.products = [newProduct, ...this.products];
            this.totalRecords = this.products.length;
            this.visibleEdit = false;
            this.originalProducts = [...this.products];
            this._cdr.detectChanges();
            this._notificationAlertService.success(
              'Sucesso',
              'Produto criado.'
            );
          },
          error: () => {
            this.visibleEdit = false;
          },
        })
      );
    }

    this.inputFilter = '';
    this.filterProducts(this.inputFilter);
  }

  onImageUpload(event: any, fileUploader: any): void {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result as string;

      this.productForm.patchValue({ image: imageUrl, fileName: file.name });

      if (this.selectedProduct) {
        this.selectedProduct.image = imageUrl;
        this.selectedProduct.fileName = file.name;
      } else {
        this.inputImageCreate = imageUrl;
      }

      fileUploader.clear();
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  preview(product: Product): void {
    this.selectedProduct = product;
    this.visiblePreview = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
