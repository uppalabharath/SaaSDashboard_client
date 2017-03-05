var app = angular.module('ProductApp', ['ngMaterial','ngMessages']);
app.controller('productCtrl', function($scope,$http,$mdToast){
	
	// Creating a product
	$scope.createProduct = function(value) {
		if(!value){
			var req = {
					method: "POST",
					url:'http://localhost:8080/SaasDashboard/rest/product/create',
					data:$scope.product
			};
			$http(req).then(
					function(response){
						$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
						$scope.product.name='';
						$scope.product.enterprise.id=''
					},
					function(response){
						if(response.status === -1){
							$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
						}
					}
			);
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	};
	// Getting products by enterprise id
	$scope.getProducts = function(value) {
		if(!value) {
			var req = {
					method: "GET",
					url:'http://localhost:8080/SaasDashboard/rest/product/all/'+$scope.product.enterprise.id
			};
			$http(req).then(
				function(response){
					var length = response.data.length;
					if(length == 0){
						$mdToast.show($mdToast.simple().textContent('No products found for given enterprise id').position('top').hideDelay(2000));
					}else {
						$scope.data = response.data;
						$scope.product.enterprise.id=''
					}
				},
				function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No products found for given enterprise id').position('top').hideDelay(2000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
					}
				}
			);
			
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		} 
	};
	
});
