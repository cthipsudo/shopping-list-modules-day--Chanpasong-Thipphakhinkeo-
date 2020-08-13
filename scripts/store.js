/* eslint-disable indent */

'use-strict';

import item from './item.js';

// let items = [
//     { id: cuid(), name: 'apples', checked: false, edit: false },
//     { id: cuid(), name: 'oranges', checked: false, edit: false },
//     { id: cuid(), name: 'milk', checked: true, edit: false },
//     { id: cuid(), name: 'bread', checked: false, edit: false }
//   ];
let items = [];
let hideCheckedItems = false;

function findById(id){
    //console.log(`items trying to find in array ${items}`);
    let foundItem = items.find(item => item.id === id);
    //console.log("We are trying to find this item " + foundItem);
    return foundItem;
}

function addItem(name){
    try{
        item.validateName(name);
        this.items.push(item.create(name));
        let newArray = this.items;
        console.log(`Adding this item to the array ${newArray}`);
    }catch(e){
        console.log(`${e.message}`);
    }
}
function findAndToggleChecked(id){
    let currentItem = findById(id);
    currentItem.checked = !currentItem.checked;
}

function findAndUpdateName(id,newName){
    try{
        let currentItem = findById(id);
        currentItem.name = newName;
    } catch(error){
        console.log(`Cannot update name:${error.message}`);
    }
}

function findAndDelete(id){
    
    let newArray = this.items.filter(item => id !== item.id);
    this.items = newArray;
    //this.items = newArray;
}

function toggleCheckedFilter(){
    this.hideCheckedItems = !this.hideCheckedItems;
}
export default {
    items,
    hideCheckedItems,
    addItem,
    findAndToggleChecked,
    findAndUpdateName,
    findAndDelete,
    toggleCheckedFilter
};