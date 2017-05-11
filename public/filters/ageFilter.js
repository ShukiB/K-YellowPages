YellowPages.filter('age', function() {
    return function(birthday) {
        return new Date().getFullYear() - new Date(birthday).getFullYear();
    };
});