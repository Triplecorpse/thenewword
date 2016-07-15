(function() {
    angular
        .module('app')
        .directive('tnwAddNewWord', ['uiService', addNewWord]);

    function addNewWord (uiService) {

        return {
            restrict: "E",
            templateUrl: "./blocks/dictionary/dictionary.html",
            controller: ['$http', dictionaryController],
            controllerAs: 'dictionary',
            link: link
        };

        function dictionaryController($http) {
            var vm = this;
            var newWord = {};
            var dictionary = JSON.parse(localStorage.dictionary || "[]");

            angular.extend(vm, {
                addWord,
                removeWord,
                saveWords,
                clearWords,
                autofill,
                newWord
            });

            fillWords();

            function addWord() {
                var word = angular.copy(vm.newWord);
                word.translations = newWord.translations.split(/,\s*|^\s+|\s+$/);
                dictionary.splice(0, 0, word);
                fillWords();
            }

            function removeWord(index) {
                dictionary.splice(index, 1);
                fillWords();
            }

            function fillWords() {
                try {
                    vm.dictionary = dictionary.map((element) => {
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
                localStorage.dictionary = JSON.stringify(dictionary);
            }

            function clearWords() {
                dictionary = JSON.parse(localStorage.dictionary || "[]");
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
                $http({
                    method: 'get',
                    url: query
                })
                    .then(fillTranslations)
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
        }

        function link() {
            //TODO: make new page title
            uiService.pageTitle = 'Add New Words'
        }
    }
})();