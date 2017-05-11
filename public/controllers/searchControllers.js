YellowPages.controller('searchCtrl', function($scope, searchLogic, databaseMediator) {
    $scope.enterToSearch = function(e) {
        // If previous query still processing then ignore this one
        if ($scope.loading) {
            console.log("ignoring qurey, another query is in progress");
            return;
        }
        // Activating fetch from server when Enter was click(both)
        if (e.which === 13) getPeople();
    }

    function getPeople() {
        // If the query is empty we won't go to server and display empty result array
        if (!$scope.peopleSearch) {
            $scope.people = null;
            return;
        }
        // Resetting loading indication
        $scope.loading = true;
        $scope.error = false;

        // formatting the query string from the object gotten fron the input
        var query = toQueryString($scope.peopleSearch);

        // Calling the server with a new query
        databaseMediator.getByQuery(query).then(function(result) {
            $scope.loading = false;
            $scope.people = result.data;
        }, function(error) {
            $scope.loading = false;
            $scope.error = true;
        });
    }

    function toQueryString(query) {
        return searchLogic.buildQueryByObject(query);
    }
});