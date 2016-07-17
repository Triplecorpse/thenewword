(function() {
    angular
        .module('app')
        .service('storageService', [storageService]);

    function storageService () {

        return {
            searchDictionary,
            getAllDictionaries,
            saveDictionary
        };

        function searchDictionary(searchBy, value) {
            if(searchBy === 'key') {
                return getDictionary(value);
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

        function saveDictionary() {

        }
    }
})();
