 import {Ingredient} from "../shared/ingredient";
 export class ShoppingListService {
  private items: Ingredient[] = [];

  constructor() { }

  getItems() {
    return this.items;
  }

  addItems(items: Ingredient[]) {
    Array.prototype.push.apply(this.items, items);
  }

  addItem(item: Ingredient) {
    this.items.push(item);
  }

  editItem(oldItem: Ingredient, newItem: Ingredient) {
    // console.log("SLS");
    // console.log("old:");
    // console.log(oldItem);
    // console.log("new");
    // console.log(newItem);
    // console.log("array items");
    // console.log(this.items);
    // console.log("index of old in array");
    // console.log(this.items.indexOf(oldItem));
    // console.log("==================================");

    this.items[this.items.indexOf(oldItem)] = newItem;

    // console.log("array items 2");
    // console.log(this.items);
  }

  deleteItem(item: Ingredient) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
