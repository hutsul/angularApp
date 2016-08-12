var app = require('../app');
var productId = 0;

var Product = function (name, categoryId) {
    this._id = productId++;
    this.name = name;
    this.categoryId = categoryId;
};

Product.prototype.save = function () {
    if (!app.products) {
        app.products = [];
    }

    app.products.push(this);
};

Product.find = function () {
    return app.products;
};

Product.findByCategory = function (categoryId) {
    var categoryId = parseInt(categoryId);
    var products = app.products;
    var productInCategory = [];
    var i = products.length - 1;

    for (i; i >= 0; i--) {
        if (products[i].categoryId == categoryId) {
            productInCategory.push(products[i]);
        }
    }
    return productInCategory;
};

Product.findById = function (id) {
    var id = parseInt(id);
    var products = app.products;
    var productInCategory = [];
    var i = products.length - 1;

    for (i; i >= 0; i--) {
        if (products[i]._id === id) {
            return products[i]
        }
    }
    return null;
};

Product.update = function (_id, name, categoryId) {
    var _id = parseInt(_id);
    var products = app.products;
    var product;
    var i = products.length - 1;

    for (i; i >= 0; i--) {
        if (products[i]._id === _id) {
            products[i].name = name;
            products[i].categoryId = categoryId;
            return product = products[i];
        }
    }
};

Product.delete = function (_id) {
    var _id = parseInt(_id);
    var products = app.products;
    var i = products.length - 1;

    for (i; i >= 0; i--) {
        console.log('delete i = ' + i);
        if (products[i]._id === _id) {
            products.splice(i, 1);
            return products;
        }
    }
};

module.exports = Product;
