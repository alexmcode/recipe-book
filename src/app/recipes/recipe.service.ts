import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from "@angular/http"
import {Recipe} from "./recipe";
import {Ingredient} from "../shared/ingredient";
// to import .map method and also observables methods!
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
  // In order to "tell" to who's listening that new data is available
  recipesChanged = new EventEmitter<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Very tasty', 'http://www.kitchenproject.com/german/recipes/Schnitzel/SchnitzelPreparation/pictures/IMG_4527.JPG', [
      new Ingredient('French fires', 2),
      new Ingredient('Pork meat', 1)
    ]),
    new Recipe('Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [])
  ];

  constructor(private http: Http) { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeDate() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    // recipes.json it's a name up to you. adding json at the end is mandatory
    // put action, instead of post, overrides old data
    return this.http.put('https://recipebook-2d167.firebaseio.com/recipes.json', body, {headers: headers});
  }

  fetchData() {
    return this.http.get('https://recipebook-2d167.firebaseio.com/recipes.json')
    .map((response: Response) => response.json())
    .subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
        this.recipesChanged.emit(this.recipes);
      }
    );
  }

}
