import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from "../../environments"; // Ensure this import path is correct
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

export interface Product {
  id: number;
  name: string;
  description: string;
  default_price: number;
  categories: string[];
  isDeleting: boolean;
}

export interface Category {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {

  private readonly PRODUCTS_ENDPOINT = `${environments.API_HOST}/products/`;
  private readonly CATEGORIES_ENDPOINT = `${environments.API_HOST}/categories/`;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  getAllProducts(): Observable<Product[]> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<{ count: number, next: string, previous: string, results: Product[] }>(this.PRODUCTS_ENDPOINT, { headers })
      .pipe(
        map(response => response.results) // Extract the results array from the response
      );
  }

  getCategories(): Observable<Category[]> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<{ count: number, next: string, previous: string, results: Category[] }>(this.CATEGORIES_ENDPOINT, { headers })
      .pipe(
        map(response => response.results) // Extract the results array from the response
      );
  }

  createProduct(params: any): Observable<Product> {
    const headers = this.getAuthHeaders();
    return this.httpClient.post<Product>(this.PRODUCTS_ENDPOINT, params, { headers });
  }

  deleteProduct(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete<void>(`${this.PRODUCTS_ENDPOINT}${id}/`, { headers });
  }

  getProductDetails(id: number): Observable<Product> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<Product>(`${this.PRODUCTS_ENDPOINT}${id}/`, { headers });
  }

  updateProductDetails(id: number, productDetails: any): Observable<Product> {
    const headers = this.getAuthHeaders();
    return this.httpClient.patch<Product>(`${this.PRODUCTS_ENDPOINT}${id}/`, productDetails, { headers });
  }
}
