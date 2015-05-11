'use strict';

angular.module('core').service('CartService',['lodash','Cart',function(_,Cart){
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
    this.addProductToCart = function(product){
        if(!product.quantity)
            product.quantity = 1;
        product.isInCart = true;
        this.cart.products.push(_productForCart(product));
        this.saveCart();
    };
    this.saveCart = function(){
        if(this.cart.cartId){
            this.cart.$update();
        }else {
            this.cart.$save(function(response){
                this.cart = new Cart(response);
            });
        }
    };
    this.removeFromCart = function(product){
        delete product.isInCart;
        delete product.quantity;
        _.remove(this.cart.products,function(object){
            return object.sku === product.sku;
        });
        this.saveCart();
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