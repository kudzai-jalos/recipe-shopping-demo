import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
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

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

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
            ingredientName: new FormControl(ingredient.name, [
              Validators.required,
            ]),
            ingredientAmount: new FormControl(ingredient.amount, [
              // Validators.pattern('^[0-9]+[0-9]*'),
              Validators.required,
              Validators.min(1),
            ]),
          })
        );
      }
    }

    const ingredientsArray = new FormArray(ingredientControls, [
      Validators.required,
    ]);

    const controls = {
      recipeName: new FormControl(this.isEditing ? this.recipe.name : null, [
        Validators.required,
      ]),
      recipeDescription: new FormControl(
        this.isEditing ? this.recipe.description : null,
        [Validators.required]
      ),
      recipeImagePath: new FormControl(
        this.isEditing ? this.recipe.imagePath : null,
        [Validators.required]
      ),
      ingredients: ingredientsArray,
    };

    this.recipeForm = new FormGroup(controls);
  }

  onAddIngredient() {

    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        ingredientName: new FormControl(null, [Validators.required]),
        ingredientAmount: new FormControl(1, [
          // Validators.pattern('^[1-9]+[0-9]*'),
          Validators.min(1),
          Validators.required,
        ]),
      })
    );
  }

  onRemoveIngredient(id: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(id);
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

    for (let ingredient of this.controls) {
      ingredients.push(
        new Ingredient(
          ingredient.value['ingredientName'],
          ingredient.value['ingredientAmount']
        )
      );
    }

    // id should be generated by server
    // use random number as id for testing
    const newRecipe = new Recipe(
      this.isEditing ? this.recipe.getId() : Math.random(),
      nameInput,
      descriptionInput,
      imagePathInput,
      ingredients
    );

    if (this.isEditing) {
      this.recipeService.updateRecipe(newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    // console.log(this.recipeService.getRecipes());
    // this.recipeService.recipesChanged.next(this.recipeService.getRecipes());
    this.router.navigate(['recipes', newRecipe.getId()]);
  }

  onCancel() {
    this.router.navigate(['../'], {
      relativeTo: this.route,
    });
  }

  formValid() {
    // let ingredientsValid = true;

    // for (let ingGroup of this.controls) {
    //   console.log(ingGroup);
    //   ingredientsValid = ingredientsValid && ingGroup.valid;
    // }

    return this.recipeForm.valid;
  }


}
