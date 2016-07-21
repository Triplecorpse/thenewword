(function() {
    angular
        .module('app')
        .controller('editorController', ['nameService', 'storageService', editorController]);

        function editorController(nameService, storageService) {

            var vm = this;
            var dictionary = storageService.activeDictionary;
            var dictionaries = storageService.getAllDictionaries();

            angular.extend(vm, {
                removeWord,
                saveWords: storageService.saveDictionary,
                loadDictionary,
                addDictionary,
                dictionaries,
                dictionary
            });

            function removeWord(index) {
                vm.dictionary.words.splice(index, 1);
                vm.saveWords(vm.dictionary);
            }

            function loadDictionary(machineName) {
                vm.dictionary = storageService.searchDictionary('key', machineName);
            }

            function addDictionary() {
                let newDictionary = {
                    name: 'New Dictionary',
                    machineName: nameService.generate(),
                    from: storageService.activeDictionary.from,
                    to: storageService.activeDictionary.to,
                    words: []
                };
                vm.dictionaries.push(angular.copy(newDictionary));
                storageService.saveDictionary(newDictionary);
                loadDictionary(newDictionary.machineName);
            }
        }
})();