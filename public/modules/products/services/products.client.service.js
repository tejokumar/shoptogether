'use strict';

angular.module('products').factory('Products', ['$resource', function($resource){
	return $resource('/products',{},{
			search:{
				method:'GET',
				url:'/products',
				isArray:true
			}
	});
}]);