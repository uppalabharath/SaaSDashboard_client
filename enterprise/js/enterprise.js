var app = angular.module('EnterpriseApp', ['ngMaterial']);
    app.controller('enterpriseCtrl', function($scope,$http,$mdToast){
        $scope.getEnterprises = function() {
            var req = { method: 'GET',
                        url: 'http://localhost:8080/SaasDashboard/rest/enterprise/all'
                        };
            $http(req).then(
                // Success
                function(response){
                    $scope.data = response.data;
                },
                // Error
                function(response){
                    alert('error');
                }
            );
        };
        // Create enterprise
        $scope.createEnterprise = function() {
        	var req = {
        			method: "POST",
        			url:'http://localhost:8080/SaasDashboard/rest/enterprise/create',
        			data:$scope.enterprise
        	};
        	$http(req).then(
        			function(response){
        				//$scope.returnMsg = response.data.message;
        				$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
        				$scope.enterprise.name='';
        			},
        			function(response){
        				alert(response.data.message);
        			}
        	);
        	
        };
        // update enterprise
        $scope.updateEnterprise = function() {
        	var req = {
        			method: "POST",
        			url:'http://localhost:8080/SaasDashboard/rest/enterprise/update',
        			data:$scope.enterprise
        	};
        	$http(req).then(
        			function(response){
        				//$scope.returnMsg = response.data.message;
        				$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
        				$scope.enterprise.name='';
        				$scope.enterprise.id='';
        			},
        			function(response){
        				$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
        			}
        	);
        };
        // Deleting enterprise
        $scope.deleteEnterprise = function() {
        	var req = {
        			method: "GET",
        			url:'http://localhost:8080/SaasDashboard/rest/enterprise/delete/'+$scope.enterprise.id
        	};
        	$http(req).then(
        			function(response){
        				//$scope.returnMsg = response.data.message;
        				$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
        				$scope.enterprise.id='';
        			},
        			function(response){
        				$mdToast.show($mdToast.simple().textContent(response.data.message).position('top').hideDelay(1000));
        			}
        	);
        };
    });