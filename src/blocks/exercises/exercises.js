(function() {
    angular
        .module('app')
        .controller('exercisesController', ['storageService', exercisesController]);

    function exercisesController(storageService) {
        var vm = this;
        var dictionary = {name: 'Select a Dictionary'};
        var dictionaries = storageService.getAllDictionaries();

        angular.extend(vm, {
            dictionaries,
            dictionary,
            loadDictionary,
            learn,
            translate
        });

        function loadDictionary(key) {
            vm.dictionary = storageService.searchDictionary('key', key);
        }

        function learn() {
            vm.state = 'learn';
        }

        function translate() {
            vm.state = 'translate';
        }
    }
})();