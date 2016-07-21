(function() {
    angular
        .module('app')
        .controller('statisticsController', ['storageService', statisticsController]);

    function statisticsController(storageService) {
        var vm = this;
    }
})();