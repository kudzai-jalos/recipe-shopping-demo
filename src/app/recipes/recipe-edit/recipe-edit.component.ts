import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Recipe } from '../../shared/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  isEditing = false;

  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // listen for recipe from route resolver
    this.route.data.subscribe(({ recipe }) => {
      if (recipe) {
        this.recipe = recipe;
        this.isEditing = true;
      } else {
        this.isEditing = false;
      }
    });

    // init form
    const ingredientControls = [];

    if (this.isEditing) {
      for (let ingredient of this.recipe.ingredients) {
        ingredientControls.push(
          new FormGroup({
            ingredientName: new FormControl(ingredient.name),
            ingredientAmount: new FormControl(ingredient.amount),
          })
        );
      }
    }

    const ingredientsArray = new FormArray(ingredientControls);

    const controls = {
      recipeName: new FormControl(this.isEditing ? this.recipe.name : null),
      recipeDescription: new FormControl(
        this.isEditing ? this.recipe.description : null
      ),
      recipeImagePath: new FormControl(
        this.isEditing ? this.recipe.imagePath : null
      ),
      ingredients: ingredientsArray,
    };
    this.recipeForm = new FormGroup(controls);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).controls.push(
      new FormGroup({
        ingredientName: new FormControl(null),
        ingredientAmount: new FormControl(1),
      })
    );
  }

  onRemoveIngredient(id: number) {
    (<FormArray>this.recipeForm.get('ingredients')).controls.splice(id, 1);
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    // const recipe = new Recipe();
    // console.log(this.recipeForm.controls);
    //validation here

    // perform update or create

    const nameInput: string = this.recipeForm.value['recipeName'];
    const descriptionInput: string = this.recipeForm.value['recipeDescription'];
    const imagePathInput: string = this.recipeForm.value['recipeImagePath'];
    const ingredients: Ingredient[] = [];

    console.log((<FormArray>this.recipeForm.get('ingredients')));

    for (let ingredient of (<FormArray>this.recipeForm.get('ingredients')).value) {
      ingredients.push(
        new Ingredient(
          ingredient['ingredientName'],
          ingredient['ingredientAmount']
        )
      );
    }

    console.log(ingredients);

    // id should be generated by server
    // use random number as id for testing
    const newRecipe = new Recipe(
      this.isEditing ? this.recipe.getId() : Math.random(),
      nameInput,
      descriptionInput,
      imagePathInput,
      ingredients
    );

    console.log(newRecipe);
    if (this.isEditing) {
    } else {
    }
  }
}
