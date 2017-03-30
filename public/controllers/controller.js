var myApp = angular.module('myApp', [])
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller!!!")

    var refresh = function() {
        $http.get('/contactlist').success(function(response) {
            console.log("I got the data I requested")
            $scope.contactlist = response
            $scope.contact = ""
        })
    }
  
    refresh()

    $scope.addContact = function() {
        console.log($scope.contact)
        if ($scope.contact._id !== null) {
            $scope.contact._id = null;
        }
        $http.post('/contactlist', $scope.contact).success(function(response) {
            console.log(response)
            refresh()
        })

    }

    $scope.remove = function(id) {
        console.log(id)
        $http.delete('/contactlist/' + id).success(function(response) {
            refresh()
        })
    }

    $scope.edit = function(contact) {
        $scope.contact = { name: contact.name, email: contact.email, number: contact.number, _id: contact._id };
    }

    $scope.update = function() {
        console.log($scope.contact._id)
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
            refresh()
        })
    }

    $scope.clear = function() {
        $scope.contact = ""
    }

}])
