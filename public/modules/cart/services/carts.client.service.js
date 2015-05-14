'use strict';

angular.module('cart').service('CartService',['lodash','Cart',function(_,Cart){
    var self = this;
    Cart.query().$promise.then(function(carts){
        if(carts && carts.length > 0){
            self.cart = new Cart(carts[0]);
        }else {
            self.cart = new Cart({
                products:[]
            });
        }
    });
    this.addProductToCart = function(product,successCallback,errorCallback){
        if(!product.quantity)
            product.quantity = 1;
        product.isInCart = true;
        this.cart.products.push(_productForCart(product));
        this.saveCart(successCallback,errorCallback);
    };
    this.saveCart = function(successCallback,errorCallback){
        if(this.cart.contributors && this.cart.contributors.length > 1){
            this.cart.cartType = 'SHARED';
        }else {
            this.cart.cartType = 'PRIVATE';
        }
        if(this.cart.cartId){
            this.cart.$update(function(response){
                self.cart = new Cart(response);
                if(successCallback){
                    successCallback(self.cart);
                }
            },errorCallback);
        }else {
            this.cart.$save(function(response){
                self.cart = new Cart(response);
                if(successCallback){
                    successCallback(self.cart);
                }
            },errorCallback);
        }
    };
    this.removeFromCart = function(product,successCallback,errorCallback){
        delete product.isInCart;
        delete product.quantity;
        _.remove(this.cart.products,function(object){
            return object.sku === product.sku;
        });
        this.saveCart(successCallback,errorCallback);
    };
    var _productForCart = function(product){
        if(product){
            return {
                sku:product.sku,
                name:product.name,
                quantity:product.quantity,
                salePrice:product.salePrice,
                thumbnailImage:product.thumbnailImage
            }
        }
    };
}]);