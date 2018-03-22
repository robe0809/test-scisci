myApp.controller('ShoppingListCreationController', ['ShoppingListService', 'UserService', 'ModuleService', function (ShoppingListService, UserService, ModuleService) {
    let self = this;

    self.userObject = UserService.userObject;
    
    self.stepOneComplete = false;
    self.stepTwoComplete = false;
    self.stepThreeComplete = false;
    
    self.moduleLibrary = ModuleService.moduleLibrary;
    ModuleService.getModules();
    self.currentShoppingListId = ShoppingListService.currentShoppingListId
    self.addedModuleLibrary = [];
    self.shoppingList = {}

    self.showSearchResults = false;
    self.showAddedModules = false;
    self.newList = true; //List is shown on load.

    //function for start list button 
    self.createShoppingList = function(name, first_name, last_name) {
        ShoppingListService.createShoppingList(name, first_name, last_name);
        self.shoppingList.name = name;
        self.newList = false; //hide start list button once a new list is created.
    };//end function for start list button to database/service 

    self.getModules = function(keyword) {
        ShoppingListService.getModules(keyword);
    }

    self.addModule = function (moduleData) {
        //Have to catch duplicate adds when pushed, for loop if this is approved. 
        moduleData.quantity = 1  //make default 1     
        self.addedModuleLibrary.push(moduleData);
    }

    // Delete a module from the full list
    self.deleteModule = function(moduleData) {
        for (let i = 0; i < self.addedModuleLibrary.length; i++) {
            if (self.addedModuleLibrary[i].id == moduleData.id) {
                self.addedModuleLibrary.splice(i, 1);
            }
        }
    }

    self.saveShoppingList = function name(arrayOfModules) {
        ShoppingListService.saveShoppingList(arrayOfModules);
    }

}]);
