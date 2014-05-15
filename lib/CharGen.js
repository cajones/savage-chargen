function CharGen($scope) {
    $scope.character = new Savage.Character('New Character');

    $scope.races = [Savage.Race.Human];

    $scope.allSkills = Object.keys(Savage.Skill);
    
    $scope.knowledgeSpecialty = '';

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
}