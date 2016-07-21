(function() {
    angular
        .module('app')
        .controller('helpController', ['storageService', helpController]);

    function helpController(storageService) {
        var vm = this;
    }
})();