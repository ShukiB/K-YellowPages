YellowPages.factory('databaseMediator', function($http) {
    return {
        getAllPeople: function() {
            return $http({
                method: 'GET',
                url: window.location.origin + '/people/all',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getByQuery: function(query) {
            return $http({
                method: 'GET',
                url: window.location.origin + '/people' + query,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
});