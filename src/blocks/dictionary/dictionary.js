(function() {
    angular
        .module('app')
        .controller('dictionaryController', ['$http', 'nameService', dictionaryController]);

        function dictionaryController($http, nameService) {
            var vm = this;
            var newWord = {};
            var dictionary = JSON.parse(localStorage[nameService.getKeys()[0]]);
            var isTranslationsLoading = false;
            var dictionaries = [];
            var machineName = nameService.getKeys()[0];

            function updateList() {
                dictionaries = [];
                for (let key in localStorage) {
                    if (localStorage.hasOwnProperty(key)) {
                        let value = JSON.parse(localStorage[key]);
                        value.machineName = key;
                        dictionaries.push(value);
                    }
                }
            }

            updateList();

            angular.extend(vm, {
                addWord,
                removeWord,
                saveWords,
                clearWords,
                autofill,
                loadDic,
                checkKey,
                addDictionary,
                isTranslationsLoading,
                dictionaries,
                newWord
            });

            fillWords();

            function addWord() {
                var word = angular.copy(vm.newWord);
                word.translations = vm.newWord.translations.split(/,\s*|^\s+|\s+$/);
                dictionary.words.splice(0, 0, word);
                vm.newWord = {
                    word: '',
                    transcription: '',
                    translations: []
                };
                fillWords();
            }

            function removeWord(index) {
                dictionary.words.splice(index, 1);
                fillWords();
            }

            function fillWords() {
                vm.dictionary = angular.copy(dictionary);
                try {
                    vm.dictionary.words = dictionary.words.map((element) => {
                        var newElement = angular.copy(element);
                        newElement.translations = element.translations.join(', ');
                        return newElement;
                    });
                } catch(e) {
                    //TODO: make pretty inform
                    console.log(e);
                }
            }

            function saveWords() {
                dictionary = angular.copy(vm.dictionary);
                dictionary.words = vm.dictionary.words.map((element) => {
                    element.translations = element.translations.split(/,\s*|^\s+|\s+$/);
                    return element;
                });
                localStorage[machineName] = JSON.stringify(dictionary);
                updateList();
                fillWords();
            }

            function clearWords() {
                dictionary.words = JSON.parse(localStorage[machineName]).words;
                vm.newWord = {
                    word: '',
                    transcription: '',
                    translations: []
                };
                fillWords();
            }

            function autofill() {
                var from = 'pl-ru';
                var phrase = vm.newWord.word;
                var key = 'dict.1.1.20160715T201519Z.76b9725ec634ce52.e9ab89e72ef7a3ec322fa4016beb2a8f09028af1';
                var query = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + key + '&lang=' + from + '&text=' + phrase;
                vm.isTranslationsLoading = true;
                $http({
                    method: 'get',
                    url: query
                })
                    .then(fillTranslations)
                    .finally(() => {
                        vm.isTranslationsLoading = false;
                    })
            }

            function fillTranslations(response) {
                var translations = response.data.def.map((element) => {
                    if(element.tr) {
                        return (element.tr.map((element) => {
                            return element.text;
                        })).join(', ');
                    }
                });
                translations = translations.filter((elem) => { return elem != undefined });
                vm.newWord.translations = translations.join(", ");
            }

            function checkKey(event) {
                if(event.keyCode === 13) {
                    addWord();
                    $('#word').focus();
                }
            }

            function loadDic(index) {
                dictionary = JSON.parse(localStorage[dictionaries[index].machineName]);
                machineName = dictionaries[index].machineName;
                fillWords();
            }

            function addDictionary() {
                let newDictionary = {
                    name: 'Dictionary',
                    machineName: nameService.generate(),
                    from: 'PL',
                    to: 'RU',
                    words: []
                };
                vm.dictionaries.push(angular.copy(newDictionary));
                machineName = newDictionary.machineName;
                delete newDictionary.machineName;
                localStorage[machineName] = JSON.stringify(newDictionary);
                loadDic(dictionaries.length - 1);
            }
        }
})();