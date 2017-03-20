var app = angular.module('EnterpriseApp', ['ngMaterial','ngMessages']);
    app.controller('enterpriseCtrl', function($scope,$http,$mdToast){
        $scope.getEnterprises = function() {
            var req = { method: 'GET',
                        url: 'http://localhost:8080/SaasDashboard/rest/enterprise/all'
                        };
            $http(req).then(
                // Success
                function(response){
                    var length = response.data.length;
					if(length == 0){
						$mdToast.show($mdToast.simple().textContent('No enterprises found').position('top').hideDelay(2000));
						$scope.data = null;
					}else {
						 $scope.data = response.data;
					}
                },
                // Error
                function(response){
                	if(response.status === -1){
						$mdToast.show($mdToast.simple().textContent('Unable to communicate to server').position('top').hideDelay(1000));
					}else if (response.status === 404) {
						$mdToast.show($mdToast.simple().textContent('No enterprises found').position('top').hideDelay(2000));
					}else {
						$mdToast.show($mdToast.simple().textContent('Internal Server error occurred').position('top').hideDelay(2000));
					}
                }
            );
        };
        // Create enterprise
        $scope.createEnterprise = function(value) {
        	if(!value){
        		var req = {
            			method: "POST",
            			url:'http://localhost:8080/SaasDashboard/rest/enterprise/create',
            			data:$scope.enterprise
            	};
            	$http(req).then(
            			function(response){
            				//$scope.returnMsg = response.data.message;
            				$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
            				$scope.enterprise=null;
            				$scope.enterpriseCreateForm.$setPristine();
            				$scope.enterpriseCreateForm.$setUntouched();
            			},
            			function(response){
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
        // update enterprise
        $scope.updateEnterprise = function(value) {
        	if(!value){
        		var req = {
            			method: "POST",
            			url:'http://localhost:8080/SaasDashboard/rest/enterprise/update',
            			data:$scope.enterprise
            	};
            	$http(req).then(
            			function(response){
            				//$scope.returnMsg = response.data.message;
            				$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
            				$scope.enterprise = null;
            				$scope.enterpriseUpdateForm.$setPristine();
            				$scope.enterpriseUpdateForm.$setUntouched();
            			},
            			function(response){
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
        // Deleting enterprise
        $scope.deleteEnterprise = function(value) {
        	if(!value){
        		var req = {
            			method: "GET",
            			url:'http://localhost:8080/SaasDashboard/rest/enterprise/delete/'+$scope.enterprise.id
            	};
            	$http(req).then(
            			function(response){
            				$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
            				$scope.enterprise=null;
            				$scope.enterpriseDeleteForm.$setPristine();
            				$scope.enterpriseDeleteForm.$setUntouched();
            			},
            			function(response){
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
    });