var app = angular.module('ProductDetailApp', ['ngMaterial','ngMessages']);
app.controller('productDetailCtrl', function($scope,$http,$mdToast){
	
	$scope.viewMode = true;
	$scope.viewProductDetail = function(value){
		$scope.viewMode = true;
		if(!value){
			var req = {
					method: "GET",
					url:'http://localhost:8080/SaasDashboard/rest/productdetail/'+$scope.productDetailView.id
			};
			$http(req).then(
				function(response){
					var length = response.data.length;
					if(length == 0){
						$mdToast.show($mdToast.simple().textContent('No product detail found for given product id').position('top').hideDelay(2000));
					}else {
						$scope.productDetailData = response.data;
						$scope.productDetailUpdateData = response.data;
					}
					$scope.productDetailViewForm.$setPristine();
					$scope.productDetailViewForm.$setUntouched();
				},
				function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No product detail found for given product id').position('top').hideDelay(2000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
					}
				}
			);
			
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
			$scope.productDetailViewForm.$setPristine();
		}
	};
	
	$scope.toggleViewMode = function(){
		/*if($scope.viewMode){
			angular.copy($scope.productDetailData, $scope.productDetailUpdateData)
		}*/
		$scope.viewMode = !$scope.viewMode;
	};
	
	$scope.updateProductDetail = function(value){
		if(!value){
			var req = {
				method: "POST",
				url: "http://localhost:8080/SaasDashboard/rest/productdetail/update",
				data: $scope.productDetailUpdateData
			};
			$http(req).then(
				function(response){
					$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
					$scope.productDetailUpdateData=null;
					$scope.productDetailData=null;
					$scope.viewMode=true;
				},
				function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No product detail found for given product id. Update failed').position('top').hideDelay(2000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
					}
				}
			);
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
			$scope.productDetailViewForm.$setPristine();
		}
	}
	
});