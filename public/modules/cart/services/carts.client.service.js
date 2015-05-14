'use strict';

angular.module('cart').service('CartService',['lodash','Cart',function(_,Cart){

    this.allCarts = [];
    this.getCarts = function(callback){
        var self = this;
        Cart.query().$promise.then(function(carts){
            self.allCarts = [];
            if(carts && carts.length > 0){
                _.forEach(carts,function(cart){
                    self.allCarts.push(cart);
                });
                self.cart = self.allCarts[0];
            }else {
                self.cart = new Cart({
                    cartType:'PRIVATE',
                    products:[]
                });
                self.allCarts.push(self.cart);
            }
            if(callback && typeof callback === 'function'){
                callback();
            }
        });
    };
    this.getCarts();
    this.addProductToCart = function(product,successCallback,errorCallback){
        if(!product.quantity)
            product.quantity = 1;
        product.isInCart = true;
        this.cart.products.push(_productForCart(product));
        this.saveCart(successCallback,errorCallback);
    };
    this.saveCart = function(cart,successCallback,errorCallback){
        var self = this;
        var cartToSave = cart ? cart : this.cart;
        if(cartToSave.contributors && cartToSave.contributors.length > 1){
            cartToSave.cartType = 'SHARED';
        }else {
            cartToSave.cartType = 'PRIVATE';
        }
        if(cartToSave.cartId){
            cartToSave.$update(function(response){
                cartToSave = new Cart(response);
                var cartIndex = _.findIndex(self.allCarts,function(cart){
                    return cart.cartId === cartToSave.cartId;
                });
                self.allCarts.splice(cartIndex,1,cartToSave);
                if(successCallback){
                    successCallback(cartToSave);
                }
            },errorCallback);
        }else {
            cartToSave.$save(function(response){
                cartToSave = new Cart(response);
                self.allCarts.push(cartToSave);
                if(successCallback){
                    successCallback(cartToSave);
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