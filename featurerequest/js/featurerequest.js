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
						$scope.workAroundReqData=null;
					}else {
						$scope.featureRequestView = response.data;
						$scope.upvoteReqid = $scope.featureRequestView.id;
						$scope.featureUpdateData = response.data;
					}
				},function(response){
					$scope.featureRequestView = null;
					$scope.workAroundReqData=null;
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No Feature request found for the given request id').position('top').hideDelay(2000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
					}
				}	
			);
			req = {
				method:"GET",
				url:"http://localhost:8080/SaasDashboard/rest/workaround/all/request/"+$scope.requestView.id
			};
			$http(req).then(function(response){
				$scope.viewMode = true;
				var length = response.data.length;
				if(length > 0){
					$scope.workAroundReqData = response.data;
				}else{
					$mdToast.show($mdToast.simple().textContent('No Workarounds found for given request id').position('top').hideDelay(2000));
					$scope.workAroundReqData=null;
				}
			},function(response){
				$scope.featureRequestView = null;
				$scope.workAroundReqData=null;
				if(response.status === -1){
					$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
				}else if (response.status === 404) {
					$mdToast.show($mdToast.simple().textContent('No Workarounds found for the given request id').position('top').hideDelay(2000));
				}else {
					$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
				}
			});
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
					$scope.requestView.id = upvoteId;
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
						$mdToast.show($mdToast.simple().textContent('No feature requests found for given product id').position('top').hideDelay(2000));
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
	};
	//View requests by customer id
	$scope.viewRequestByCustomer = function(value){
		if(!value){
			var req = {
					method:"GET",
					url:"http://localhost:8080/SaasDashboard/rest/featurerequest/all/customer/"+$scope.requestViewCustomerId
				};
				$http(req).then(
					function(response){
						var length = response.data.length;
						if(length == 0){
							$mdToast.show($mdToast.simple().textContent('No feature requests found for given customer id').position('top').hideDelay(2000));
							$scope.requestCustomerData=null;
						}else {
							$scope.requestCustomerData = response.data;
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
	// Update Feature Request
	$scope.updateRequest = function(value){
		if(!value){
			if($scope.featureUpdateData.customer.id == $scope.featureRequestView.customer.id){
				var req = {
					method:"POST",
					url:"http://localhost:8080/SaasDashboard/rest/featurerequest/update",
					data:$scope.featureUpdateData
				};
				$http(req).then(function(response){
					$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
					$scope.requestView.id = $scope.featureUpdateData.id;
					$scope.viewRequest(); 
					$scope.featureUpdateData=null;
					$scope.requestUpdateForm.$setPristine();
					$scope.requestUpdateForm.$setUntouched();
				},function(response){
					if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred. Recalculation failed').position('top').hideDelay(2000));
					}
				});
			}else{
				$mdToast.show($mdToast.simple().textContent('You are not authorised to update this feature request').position('top').hideDelay(2000));
			}
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	};
	// Create a new Workaround
	$scope.createWorkAround = function(reqId,value){
		if(!value){
			var featureReq = {"id":reqId};
			$scope.workAroundCreate.featureRequest = featureReq;
			var req = {
				method:"POST",
				url:"http://localhost:8080/SaasDashboard/rest/workaround/create",
				data:$scope.workAroundCreate
			};
			$http(req).then(function(response){
				$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
				$scope.requestView.id = $scope.featureUpdateData.id;
				$scope.viewRequest(); 
				$scope.featureUpdateData=null;
				$scope.workAroundCreate=null;
				$scope.workAroundCreateForm.$setPristine();
				$scope.workAroundCreateForm.$setUntouched();
			},function(response){
				if(response.status === -1){
					$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
				}else {
					$mdToast.show($mdToast.simple().textContent('Internal Server error occurred. Workaround create failed').position('top').hideDelay(2000));
				}
			});
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	};
	$scope.upVoteWorkAround = function(requestId,workAroundId, value){
		if(!value){
			var upvoteWorkAroundData = {"id":workAroundId,"customer":{"id":$scope.upvoteWorkAroundCustomerId}};
			var req = {
				method:"POST",
				url:"http://localhost:8080/SaasDashboard/rest/workaround/upvote",
				data:upvoteWorkAroundData
			};
			$http(req).then(function(response){
				$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
				$scope.requestView.id = requestId;
				$scope.viewRequest(); 
			},function(response){
				if(response.status === -1){
					$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
				}else {
					$mdToast.show($mdToast.simple().textContent('Internal Server error occurred. Workaround Upvote faild').position('top').hideDelay(2000));
				}
			});
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	};
	$scope.updateWorkAround = function(value){
		if(!value){
			var req = {
				method:"POST",
				url:"http://localhost:8080/SaasDashboard/rest/workaround/update",
				data:$scope.workAroundUpdateData
			}
			$http(req).then(function(response){
				$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
				$scope.workAroundUpdateId = $scope.workAroundViewData.id;
				$scope.viewWorkAround();
			},function(response){
				if(response.status === -1){
					$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
				}else {
					$mdToast.show($mdToast.simple().textContent('Internal Server error occurred. Workaround update faild').position('top').hideDelay(2000));
				}
			});
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	};
	
	//Fetch WorkAround using workaround Id
	$scope.viewWorkAround = function(value){
		if(!value){
			var req = {
				method:"GET",
				url:"http://localhost:8080/SaasDashboard/rest/workaround/"+$scope.workAroundUpdateId
			};
			$http(req).then(function(response){
				var length = response.data.length;
				if(length == 0){
					$mdToast.show($mdToast.simple().textContent('No feature requests found for given customer id').position('top').hideDelay(2000));
					$scope.workAroundUpdateData=null;
				}else {
					$scope.workAroundUpdateData = response.data;
					$scope.workAroundViewData = response.data;
					$scope.updateWorkAroundCustomerId = $scope.workAroundViewData.customer.id; 
				}
			},function(response){
				$scope.workAroundUpdateData=null;
				if(response.status === -1){
					$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
				}else if (response.status === 404) {
					$mdToast.show($mdToast.simple().textContent('No workaround found for the given workaround id').position('top').hideDelay(2000));
				}else {
					$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
				}
			});
		}else{
			$mdToast.show($mdToast.simple().textContent('Some mandatory fields are not filled').position('top').hideDelay(2000));
		}
	};
	
});