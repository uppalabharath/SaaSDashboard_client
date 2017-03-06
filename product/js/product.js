var app = angular.module('ProductApp', ['ngMaterial','ngMessages']);
app.controller('productCtrl', function($scope,$http,$mdToast){
	
	// Creating a product
	$scope.createProduct = function(value) {
		if(!value){
			var req = {
					method: "POST",
					url:'http://localhost:8080/SaasDashboard/rest/product/create',
					data:$scope.addProduct
			};
			$http(req).then(
					function(response){
						$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
						$scope.addProduct=null;
						$scope.productCreateForm.$setPristine();
						$scope.productCreateForm.$setUntouched();
					},
					function(response){
						if(response.status === -1){
							$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
						}
					}
			);
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
			$scope.productCreateForm.$setPristine();
		}
	};
	// Getting products by enterprise id
	$scope.getProducts = function(value) {
		if(!value) {
			$scope.data=null;
			var req = {
					method: "GET",
					url:'http://localhost:8080/SaasDashboard/rest/product/all/'+$scope.viewProduct.enterprise.id
			};
			$http(req).then(
				function(response){
					var length = response.data.length;
					if(length == 0){
						$mdToast.show($mdToast.simple().textContent('No products found for given enterprise id').position('top').hideDelay(2000));
					}else {
						$scope.data = response.data;
					}
					$scope.productViewForm.$setPristine();
					$scope.productViewForm.$setUntouched();
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
	//Updating a Product
	$scope.updateProduct = function(value) {
		if(!value){
			var req = {
					method: "POST",
					url:'http://localhost:8080/SaasDashboard/rest/product/update',
					data:$scope.modifyProduct
			};
			$http(req).then(
				function(response){
					$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
					$scope.modifyProduct=null;
					$scope.modifyProductForm.$setPristine();
					$scope.modifyProductForm.$setUntouched();
				},
				function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No products found for given product id. Update failed').position('top').hideDelay(2000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
					}
				}
			);
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	};
	//Deleting a Product
	$scope.deleteProduct = function(value) {
		if(!value) {
			var req = {
					method: "GET",
					url:'http://localhost:8080/SaasDashboard/rest/product/delete/'+$scope.removeProduct.id
			};
			$http(req).then(
				function(response){
					$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
					$scope.removeProduct=null;
					$scope.productDeleteForm.$setPristine();
					$scope.productDeleteForm.$setUntouched();
				},
				function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No product found for given product id. Delete failed').position('top').hideDelay(2000));
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
