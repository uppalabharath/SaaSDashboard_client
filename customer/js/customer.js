var app = angular.module('CustomerApp', ['ngMaterial','ngMessages']);
app.controller('customerCtrl', function($scope,$http,$mdToast){
	$scope.viewMode=true;
	//Create customer
	$scope.createCustomer = function(value){
		if(!value){
			var req = {
				method:"POST",
				url:"http://localhost:8080/SaasDashboard/rest/customer/create",
				data:$scope.customerCreate
			};
			$http(req).then(
				function(response){
					$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
					$scope.customerCreate=null;
					$scope.customerCreateForm.$setPristine();
					$scope.customerCreateForm.$setUntouched();
				},function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
					}
				}
			);
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	};
	
	// View Customer
	$scope.viewCustomer = function(value){
		$scope.viewMode = true;
		if(!value){
			var req = {
				method : "GET",
				url : "http://localhost:8080/SaasDashboard/rest/customer/"+$scope.customerSearch.id
			};
			$http(req).then(
				function(response){
					if(response.data == null){
						$mdToast.show($mdToast.simple().textContent('No customer found for given customer id').position('top').hideDelay(2000));
					}else {
						$scope.customerViewData = response.data;
						$scope.customerUpdateData = response.data;
					}
					
				},function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No Customer found for given customer id').position('top').hideDelay(2000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
					}
				}	
			);
			
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	};
	
	$scope.toggleViewMode = function(){
		$scope.viewMode = !$scope.viewMode;
	};
	
	$scope.updateCustomer = function(value){
		if(!value){
			var req = {
				method:"POST",
				url:"http://localhost:8080/SaasDashboard/rest/customer/update",
				data:$scope.customerUpdateData
			};
			$http(req).then(
				function(response){
					$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
					$scope.customerUpdateData=null;
					$scope.customerViewData=null;
					$scope.customerUpdateForm.$setPristine();
					$scope.customerUpdateForm.$setUntouched();
				},function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No Customer found for given customer id. Update failed').position('top').hideDelay(2000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
					}
				}	
			);
			
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
		
	};
	
	// Viewing Customers by products
	$scope.viewCustomerByProduct = function(value){
		if(!value){
			var req = {
				method:"GET",
				url:"http://localhost:8080/SaasDashboard/rest/customer/all/"+$scope.customerProduct.product.id
			};
			$http(req).then(
				function(response){
					var length = response.data.length;
					if(length == 0){
						$mdToast.show($mdToast.simple().textContent('No customers found for given product id').position('top').hideDelay(2000));
						$scope.customerSearchData = null;
					}else {
						$scope.customerSearchData = response.data;
					}
				},function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No customers found for given product id').position('top').hideDelay(2000));
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