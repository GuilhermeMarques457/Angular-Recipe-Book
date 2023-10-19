import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  private API_URL =
    'https://recipe-book-angular-proj-cba60-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put(this.API_URL, recipes).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.API_URL).pipe(
      map((recipes) => {
        return recipes.map((temp) => {
          return {
            ...temp,
            ingredients: temp.ingredients ? temp.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
