var app = angular.module('RevenueApp',['ngMaterial','ngMessages']);
app.controller('revenueCtrl',function($scope,$mdToast,$http){
	// Adding Revenue
	$scope.addRevenue = function(value){
		if(!value){
			var req = {
				method:"POST",
				url:"http://localhost:8080/SaasDashboard/rest/revenue/create",
				data:$scope.revenueAdd
			};
			$http(req).then(
				function(response){
					$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
					$scope.revenueAdd=null;
					$scope.revenueAddForm.$setPristine();
					$scope.revenueAddForm.$setUntouched();
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
	// View Revenue by customer id 
	$scope.viewRevenue = function(value){
		if(!value){
			var req = {
				method:"GET",
				url:"http://localhost:8080/SaasDashboard/rest/revenue/all/customer/"+$scope.revenueView.customer.id
			};
			$http(req).then(
				function(response){
					var length = response.data.length;
					if(length == 0){
						$mdToast.show($mdToast.simple().textContent('No revenue data found for given customer id').position('top').hideDelay(2000));
						$scope.customerRevenueData = null;
					}else {
						$scope.customerRevenueData = response.data;
					}
				},function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No Revenue data found for given customer id').position('top').hideDelay(2000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
					}
				}	
			);
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	}
});