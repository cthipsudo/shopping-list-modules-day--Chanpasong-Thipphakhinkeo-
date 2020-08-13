/* eslint-disable indent, quotes */

'use-strict';

//const foo = "bar";

const validateName = name => {
    if(name === ''){
        throw new TypeError('Name must not be blank');
    }
};

function create (name){
    return {
        id: cuid(),
        name,
        checked: false,
        edit: false
    };
}

export default {
    validateName,
    create
};