function CharGen($scope) {
    $scope.character = new Savage.Character();

    $scope.learnShootingSkill = function () {
        var shooting = new Savage.Skill('d4', 'Shooting', Savage.Attribute.Agility);
        $scope.character.learn(shooting);
    };
}