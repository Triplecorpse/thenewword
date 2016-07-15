(function() {
    angular
        .module('app')
        .directive('tnwAddNewWord', ['uiService', addNewWord]);

    function addNewWord (uiService) {

        return {
            restrict: "E",
            templateUrl: "./blocks/dictionary/dictionary.html",
            controller: dictionaryController,
            controllerAs: 'dictionary',
            link: link
        };

        function dictionaryController() {
            var vm = this;
            var newWord = {};
            var dictionary = JSON.parse(localStorage.dictionary || "[]");

            angular.extend(vm, {
                addWord,
                removeWord,
                saveWords,
                clearWords,
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
        }

        function link() {
            //TODO: make new page title
            uiService.pageTitle = 'Add New Words'
        }
    }
})();