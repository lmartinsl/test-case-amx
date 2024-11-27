import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { NotificationAlertService } from 'src/app/core/services/notification-alert.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { CatalogComponent } from './catalog.component';

class MockUtilsService {
  getProductCategories() {
    return ['Category1', 'Category2'];
  }

  profileMap(profile: string) {
    return profile;
  }

  formatReal(value: number) {
    return `R$ ${value.toFixed(2)}`;
  }
}

class MockAppService {
  getCurrentUser() {
    return of({ id: 1, name: 'Test User' });
  }

  setCurrentUser(user: any) {}
}

class MockCatalogService {
  getProducts() {
    return of([]);
  }

  getProductById(id: number) {
    return of({
      id,
      title: 'Test Product',
      price: 100,
      description: 'Test Description',
      category: { name: 'Test Category' },
      image: 'test.jpg',
      fileName: 'test.jpg',
      rating: { rate: 5, count: 10 },
    });
  }

  deleteProduct(id: number) {
    return of(null);
  }

  updateProduct(id: number, product: any) {
    return of(product);
  }

  createProduct(product: any) {
    return of({ ...product, id: Math.random() });
  }
}

class MockNotificationAlertService {
  success(title: string, message: string) {}
}

class MockRouter {
  navigateByUrl(url: string) {}
}

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MenubarModule,
        DataViewModule,
        ButtonModule,
        DialogModule,
        InputNumberModule,
        FileUploadModule,
        InputTextareaModule,
        DropdownModule,
        RatingModule,
        PaginatorModule,
      ],
      providers: [
        { provide: UtilsService, useClass: MockUtilsService },
        { provide: AppService, useClass: MockAppService },
        { provide: CatalogService, useClass: MockCatalogService },
        {
          provide: NotificationAlertService,
          useClass: MockNotificationAlertService,
        },
        { provide: Router, useClass: MockRouter },
        ChangeDetectorRef,
      ],
    });

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('should open modal for new product', () => {
    component.openModalForNewProduct();
    expect(component.isEditMode).toBeFalse();
    expect(component.visibleEdit).toBeTrue();
    expect(component.selectedProduct).toBeUndefined();
  });

  it('should delete a product', () => {
    const spy = spyOn(component['subscriptions'], 'add').and.callThrough();
    component.delete(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should edit a product', () => {
    const spy = spyOn(component['subscriptions'], 'add').and.callThrough();
    component.edit(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should save changes for a new product', () => {
    component.isEditMode = false;
    component.productForm.patchValue({
      title: 'New Product',
      category: 'Category1',
      description: 'Description',
      price: 100,
      image: 'image.jpg',
    });

    const spy = spyOn(component['subscriptions'], 'add').and.callThrough();
    component.saveChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should save changes for an edited product', () => {
    component.isEditMode = true;
    component.selectedProduct = {
      id: 1,
      title: '',
      price: 0,
      description: '',
      category: { name: '' },
      image: '',
      fileName: '',
      rating: { rate: 0, count: 0 },
    };
    component.productForm.patchValue({
      title: 'Edited Product',
      category: 'Category1',
      description: 'Description',
      price: 200,
      image: 'image.jpg',
    });

    const spy = spyOn(component['subscriptions'], 'add').and.callThrough();
    component.saveChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should create a new product and add it to the products list', () => {
    component.isEditMode = false;
    component.productForm.patchValue({
      title: 'New Product',
      category: 'Category1',
      description: 'New Description',
      price: 150,
      image: 'new-product.jpg',
    });

    const spy = spyOn(component['subscriptions'], 'add').and.callThrough();
    const createProductSpy = spyOn(
      component['_catalogService'],
      'createProduct'
    ).and.callThrough();

    component.saveChanges();

    expect(createProductSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(component.products.length).toBeGreaterThan(0);
    expect(component.products[0].title).toBe('New Product');
  });

  it('should handle the deletion of a product correctly', () => {
    const productId = 1;
    component.products = [
      {
        id: productId,
        title: 'Product to Delete',
        category: { name: 'Category1' },
        price: 100,
        description: 'Description',
        image: 'image.jpg',
        fileName: 'image.jpg',
        rating: { rate: 4, count: 10 },
      },
    ];

    const spy = spyOn(component['subscriptions'], 'add').and.callThrough();
    const deleteProductSpy = spyOn(
      component['_catalogService'],
      'deleteProduct'
    ).and.callThrough();

    component.delete(productId);

    expect(deleteProductSpy).toHaveBeenCalledWith(productId);
    expect(spy).toHaveBeenCalled();
    expect(component.products.length).toBe(0);
  });
});
