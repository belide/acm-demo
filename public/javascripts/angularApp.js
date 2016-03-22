var app = angular.module('acm-demo', ['ngRoute']);

app.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'MainCtrl',
            resolve: {
                // Get all the data from database and display them on the table
                getStuff: ['Main', function(Main) {
                    Main.getAll();
                }]
            }
            // If the URL is something else, redirect to '/'
        }).otherwise({redirectTo: '/'});
    }
]);

// Create a service here
app.factory('Main', [
    '$http',
    function MainFactory($http) {
        var obj = {
            links: []
        };

        // GET all links from the server
        obj.getAll = function() {
            return $http.get('/links').success(function(data){
                console.log(data);
                // Deep copy in angular
                angular.copy(data, obj.links);
            });
        }

        // Add new link
        obj.addLink = function(link) {
            return $http.post('/links', link).success(function(data) {
                obj.links.push(data);
                console.log(data);
            });
        };

        obj.edit = function(link, newName, newLink) {
            return $http.put('/links/' + link._id, {name: newName, link: newLink}).success(function(data) {
                link.name = newName;
                link.link = newLink;
            })
        }

        // Delete a link
        obj.delete = function(link) {
            return $http.delete('/links/' + link._id + '/delete/').success(function(data, status, header) {
                console.log(link);

                var index = obj.links.indexOf(link);
                if(index > -1) {
                    obj.links.splice(index, 1);
                }
            })
        };

        return obj;
    }
]);

app.controller('MainCtrl', [
    '$scope',
    'Main',
    function($scope, Main) {
        $scope.links = Main.links;
        $scope.addLink = function() {
            if($scope.name === '' || $scope.link === '') {return ;}
            Main.addLink({name: $scope.name, link: $scope.link});
            // $scope.links.push({name: $scope.name, link: $scope.link});

            $scope.name = '';
            $scope.link = '';
        };
        $scope.edit = function(link) {
            var newName = window.prompt("New name:", link.name);
            var newLink = window.prompt("New link:", link.link);

            Main.edit(link, newName, newLink);
        };
        $scope.delete = function(link) {
            Main.delete(link);
        };
    }
]);
