function CharGen($scope) {
    $scope.character = new Savage.Character('New Character');

    $scope.learnFightingSkill = function () {
        var fighting = new Savage.Skill('d4', 'Fighting', Savage.Attribute.Agility);
        $scope.character.learn(fighting);
    };
    $scope.learnShootingSkill = function () {
        var shooting = new Savage.Skill('d4', 'Shooting', Savage.Attribute.Agility);
        $scope.character.learn(shooting);
    };
    $scope.learnThrowingSkill = function () {
        var throwing = new Savage.Skill('d4', 'Throwing', Savage.Attribute.Agility);
        $scope.character.learn(throwing);
    };
}