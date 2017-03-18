var app = angular.module('FeatureRequestApp',['ngMaterial','ngMessages']);
app.controller('featureRequestCtrl', function($scope,$http,$mdToast) {
	$scope.viewMode = true;
	//Create Request
	$scope.createRequest = function(value){
		if(!value){
			var req = {
				method:"POST",
				url:"http://localhost:8080/SaasDashboard/rest/featurerequest/create",
				data:$scope.featureRequestCreate
			};
			$http(req).then(
				function(response){
					$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
					$scope.featureRequestCreate=null;
					$scope.requestCreateForm.$setPristine();
					$scope.requestCreateForm.$setUntouched();
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
	//Toggle View Mode
	$scope.toggleViewMode = function(){
		$scope.viewMode = !$scope.viewMode;
	};
	// View a Request -- Pending to pull workarounds
	$scope.viewRequest = function(value){
		if(!value){
			var req = {
				method:"GET",
				url:"http://localhost:8080/SaasDashboard/rest/featurerequest/"+$scope.requestView.id
			};
			$http(req).then(
				function(response){
					$scope.viewMode = true;
					var length = response.data.length;
					if(length == 0){
						$mdToast.show($mdToast.simple().textContent('No feature request found for given request id').position('top').hideDelay(2000));
						$scope.featureRequestView = null;
					}else {
						$scope.featureRequestView = response.data;
						$scope.upvoteReqid = $scope.featureRequestView.id;
					}
				},function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No Feature request found for the given request id').position('top').hideDelay(2000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
					}
				}	
			);
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	}
	// Upvote a Feature request
	$scope.upvoteRequest = function(upvoteId,customerId,value){
		if(!value){
			var inputData = {"id":upvoteId,"customer":{"id":customerId}};
			var req = {
				method:"POST",
				url:"http://localhost:8080/SaasDashboard/rest/featurerequest/upvote",
				data:inputData
			};
			$http(req).then(
				function(response){
					$scope.viewMode = true;
					$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
					$scope.requestView.id = upvoteId
					$scope.viewRequest();
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
	//View Requests by Product Id
	$scope.viewRequestByProduct = function(value){
		if(!value){
			var req = {
				method:"GET",
				url:"http://localhost:8080/SaasDashboard/rest/featurerequest/all/product/"+$scope.requestViewProductId
			};
			$http(req).then(
				function(response){
					var length = response.data.length;
					if(length == 0){
						$mdToast.show($mdToast.simple().textContent('No feature request found for given request id').position('top').hideDelay(2000));
						$scope.featureRequestView = null;
						$scope.requestProductData=null;
					}else {
						$scope.requestProductData = response.data;
						$scope.recalculateProductId = $scope.requestViewProductId;
					}
				},function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No Feature requests found for the given product id').position('top').hideDelay(2000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
					}
				}	
			);
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	};
	// Recalculate Impact Factors
	$scope.recalculateImportFactors = function(productId){
		if(productId != null){
			var req = {
				method:"GET",
				url:"http://localhost:8080/SaasDashboard/rest/featurerequest/recalculate/"+productId
			};
			$http(req).then(
				function(response){
					$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
					$scope.requestViewProductId=productId;
					$scope.viewRequestByProduct();
				},function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred. Recalculation failed').position('top').hideDelay(2000));
					}
				}	
			);
		}else{
			// Should not occur usually
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	}
});