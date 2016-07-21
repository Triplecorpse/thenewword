(function() {
    angular
        .module('app')
        .service('storageService', ['nameService', storageService]);

    function storageService (nameService) {

        var activeDictionary;

        var storage = {
            searchDictionary,
            getAllDictionaries,
            saveDictionary,
            init,
            activeDictionary
        };

        init();

        function init() {
            searchDictionary('key', getFirstKey());
        }

        function getFirstKey() {
            for(let key in localStorage) {
                if(localStorage.hasOwnProperty(key) && (key !== 'settings')) {
                    return key
                }
            }
        }

        function searchDictionary(searchBy, value) {
            if(searchBy === 'key') {
                let dictionary = getDictionary(value);
                activeDictionary = dictionary;
                storage.activeDictionary = dictionary;
                return dictionary;
            }
        }

        function getAllDictionaries() {
            let dictionaries = [];
            for(let key in localStorage) {
                if(localStorage.hasOwnProperty(key) && (key !== 'settings')) {
                    let dictionary = getDictionary(key);
                    delete dictionary.words;
                    dictionaries.push(getDictionary(key));
                }
            }
            return dictionaries;
        }

        function getDictionary(key) {
            let dictionary = JSON.parse(localStorage[key]);
            dictionary.machineName = key;
            return dictionary;
        }

        function saveDictionary(dictionary) {
            let dic = angular.copy(dictionary);
            let key = dic.machineName;
            delete dic.machineName;
            localStorage[key] = JSON.stringify(dic);
        }


        return storage;
    }
})();
