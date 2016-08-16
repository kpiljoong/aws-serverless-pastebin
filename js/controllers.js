var endpoint = 'https://c2uzwhmof1.execute-api.us-east-1.amazonaws.com/prod/paste';

angular.module('pastebin.controllers', [])

    .controller('PasteCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

        $scope.title = 'Pastebin!';

        $scope.submitPaste = function() {
            var data = {
                "content": $scope.content
            };
            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            var url = endpoint;
            $http.post(url, data, config).success(function(resp) {
                $location.path('/paste/' + resp);
            }).error(function(err) {
                console.log('err', err);
            });
        };
    }])



    .controller('PasteViewCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

        $scope.paste = {};
        $scope.paste.content = "Loading...";

        var id = $routeParams.pasteId;
        $scope.paste.id = id;

        var url = endpoint + '/' + id;

        $http.get(url).success(function(resp) {
            if (resp.errorMessage != null) {
                $scope.paste.content = "Error: " + resp.errorMessage;
            } else {
                $scope.paste.content = resp;
            }
        });

        $scope.new = function() {
            $location.path("/paste/");
        };

    }])

;
