(function() {
    angular
        .module('app')
        .service('dictionaryService', ['nameService', 'storageService', dictionaryService]);

    function dictionaryService (nameService, storageService) {

        var watcher;
        var activeDictionary;

        return {
            activeDictionary,
            active: {
                fromCode: '',
                toCode: ''
            },
            newWord: {
                word: '',
                transcription: '',
                translations: ''
            },
            canAddNewWord: false,
            trigger,
            watcher
        };

        function init() {
            storageService.searchDictionary('key',saveDictionary);
            this.activeDictionary = storageService.activeDictionary;
        }

        function trigger() {
            this.watcher = nameService.generate();
        }
    }
})();