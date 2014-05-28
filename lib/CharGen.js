var app = angular.module('app', ['ngClipboard']);

app.config(['ngClipProvider', function(ngClipProvider) {
    ngClipProvider.setPath("/components/zeroclipboard/ZeroClipboard.swf");
}]);

app.controller('CharGenController', ['$scope', function ($scope) {
    $scope.character = new Savage.Character('New Character');

    $scope.races = [Savage.Race.Human];

    function instanceOf(container) {
        return function (n) { return new container[n](); };
    }

    $scope.characterLimits =  { 
        attributePoints: 5,
        skillPoints: 15,
        isAttributesOver: function (character) {
            return character.getAttributePoints() > this.attributePoints;
        },
        isSkillsOver: function (character) {
            return character.getSkillPoints() > this.skillPoints;
        },
    };

    $scope.allSkills = Object.keys(Savage.Skill);
    
    function createSkillsFilter(attribute, character) {
        return function () {
            return  $scope.allSkills.filter(function (skillName) {
                var skill = Savage.Skill[skillName]();
                return !character.hasSkill(skillName) && (new RegExp(attribute)).test(skill.linkedAttribute);
            });
        };
    }

    $scope.availableSkills = createSkillsFilter('.', $scope.character);
    $scope.availableAgilitySkills = createSkillsFilter(Savage.Attribute.Agility, $scope.character);
    $scope.availableSmartsSkills = createSkillsFilter(Savage.Attribute.Smarts, $scope.character);
    $scope.availableSpiritSkills = createSkillsFilter(Savage.Attribute.Spirit, $scope.character);
    $scope.availableStrengthSkills = createSkillsFilter(Savage.Attribute.Strength, $scope.character);

    $scope.learn = function (skillName) {
        var skill = Savage.Skill[skillName]();
        $scope.character.learn(skill);
    };

    $scope.allHindrances = Object.keys(Savage.Hindrance).map(instanceOf(Savage.Hindrance));

    function createHindranceFilter(isMajor, character) {
        return function () {
            return $scope.allHindrances.filter(function (hindrance) {
                return (!character.hindrances.contains(hindrance)) && (typeof isMajor === 'undefined' ? true : isMajor === hindrance.isMajor);
            });    
        };
    }

    $scope.availableHindrances = createHindranceFilter(undefined, $scope.character);
    $scope.availableMinorHindrances = createHindranceFilter(false, $scope.character);
    $scope.availableMajorHindrances = createHindranceFilter(true, $scope.character);

    $scope.clipboardFeedback = '';
}]);