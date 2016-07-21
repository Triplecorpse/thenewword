(function() {
    angular
        .module('app')
        .controller('settingsController', ['storageService', settingsController]);

    function settingsController(storageService) {
        var vm = this;
    }
})();