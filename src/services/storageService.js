(function() {
    angular
        .module('app')
        .service('storageService', [storageService]);

    function storageService () {

        return {
            searchDictionary,
            getAllDictionaries,
            saveDictionary,
            activeDictionary: {}
        };

        function searchDictionary(searchBy, value) {
            if(searchBy === 'key') {
                let dictionary = getDictionary(value);
                this.activeDictionary = dictionary;
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
    }
})();
