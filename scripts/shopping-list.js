/* eslint-disable quotes, no-undef */
import store from './store.js';
import item from './item.js';

const generateItemElement = function (item) {
  let itemTitle = `<span class='shopping-item shopping-item__checked'>${item.name}</span>`;
  let editButton = `<button class='js-item-edit'><span class='button-label'>edit item</span></button>`;
  if (!item.checked) {
    itemTitle = `
      <form class="js-edit-item">
        <input class="shopping-item" type="text" value="${item.name}" />
      </form>
    `;
  }
  /** 
   * If edit is true, render the item differently...
   */
  if(item.edit){
    itemTitle = `<input class="edit-field" type="text" placeholder="${item.name}"></input>`;
    editButton = `<button class='js-item-edit'><span class='button-label'>Done?</span></button>`;
  } 

  return `
    <li class='js-item-element' data-item-id='${item.id}' data-name='${item.name}'>
      ${itemTitle}
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
        ${editButton}
      </div>
    </li>`;
};

const generateShoppingItemsString = function (shoppingList) {
  const items = shoppingList.map((item) => generateItemElement(item));
  return items.join('');
};

const render = function () {
  // Filter item list if store prop is true by item.checked === false
  let items = [...store.items];
  if (store.hideCheckedItems) {
    items = items.filter(item => !item.checked);
  }
  // render the shopping list in the DOM
  const shoppingListItemsString = generateShoppingItemsString(items);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
};

// const addItemToShoppingList = function (itemName) {
//   try{
//     //console.log('In try for add Item');
//     item.validateName(itemName); 
//     store.items.push(item.create(itemName));
//     render();
//   } catch (error){
//     console.log(`${error.message}`);
//   }
//   //store.items.push({ id: cuid(), name: itemName, checked: false });
// };

const handleNewItemSubmit = function () {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    store.addItem(newItemName);
    render();
  });
};

// const toggleCheckedForListItem = function (id) {
//   const foundItem = store.items.find(item => item.id === id);
//   foundItem.checked = !foundItem.checked;
// };


const handleItemCheckClicked = function () {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const id = getItemIdFromElement(event.currentTarget);
    store.findAndToggleChecked(id);
    render();
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
};

/**
 * Responsible for deleting a list item.
 * @param {string} id 
 */

// const deleteListItem = function (id) {
//   const index = store.items.findIndex(item => item.id === id);
//   store.items.splice(index, 1);
// };

const handleDeleteItemClicked = function () {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // get the index of the item in store.items
    const id = getItemIdFromElement(event.currentTarget);
    // delete the item
    store.findAndDelete(id);
    // render the updated shopping list
    console.log(store.items);
    render();
  });
};

const getNewTitle = function(id){
  //Grabs the item we need to change the title of.
  const item = store.items.find(item => id === item.id );
  let newTitle = $(`li[data-item-id="${id}"] input`).val();
  //If the value entered isn't blank
  //Set the new title
  if (newTitle !== ""){
    //console.log(`Setting the new title. \n ${item.name} to ${newTitle}`);
    item.name = newTitle;
  }

};

/**
 * Toggles the value of that item to see if we want to edit it or not
 */
const editItemTitleToggle = function(id){
  const foundItem = store.items.find(item => item.id === id);
  // Once edit is true the conditional will run,
  // Since edit is intially false it won't run.
  if(foundItem.edit){
    getNewTitle(id);
  }
  foundItem.edit = !foundItem.edit;
  // This changes the value ands says hey we're editing something...
  //store.edittingAnItem = !store.edittingAnItem;
  //console.log(`Hey we're editting something! ${store.edittingAnItem}`);
};

/**
 * If you user wants to edit something
 * Edit that item
 */
const handleEditItem = function () {
  $('.js-shopping-list').on('click', '.js-item-edit', event => {
    const id = getItemIdFromElement(event.currentTarget);
    //This says to turn on the edit field
    editItemTitleToggle(id);
    render();
  }); 
};


/**
 * Toggles the store.hideCheckedItems property
 */

// const toggleCheckedItemsFilter = function () {
//   store.hideCheckedItems = !store.hideCheckedItems;
// };

/**
 * Places an event listener on the checkbox
 * for hiding completed items.
 */
const handleToggleFilterClick = function () {
  $('.js-filter-checked').click(() => {
    store.toggleCheckedFilter();
    render();
  });
};

const handleEditShoppingItemSubmit = function () {
  $('.js-shopping-list').on('submit', '.js-edit-item', event => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const itemName = $(event.currentTarget).find('.shopping-item').val();
    store.findAndUpdateName(id, itemName);
    render();
  });
};

const bindEventListeners = function () {
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditShoppingItemSubmit();
  handleToggleFilterClick();
  handleEditItem();
};

// This object contains the only exposed methods from this module:
export default {
  render,
  bindEventListeners
};


console.log(item);