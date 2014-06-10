'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('SheetCtrl', ['$scope', '$http', function($scope, $http) {
    
    $scope._count = 0;
    
    $scope.tabs = [{name: 'new', id: $scope._count++, str: 0, con: 0, siz: 0, int: 0, pow: 0, dex: 0, cha: 0, ranks:{},
                rlegAp: 0, llegAp:  0, abdomenAp:  0, chestAp: 0, rarmAp: 0, larmAp: 0, headAp: 0
     }];
     
     $http.get('commonSkills.json').success(function(data) {
        $scope.commonSkills = data;
      });
         
    $scope.close = function(tab) {
        var idx = $scope.tabs.indexOf(tab);
        
        if(idx > -1) {
            $scope.tabs.splice(idx, 1);
        }
    };
    $scope.new = function() {
        $scope.tabs.push({
            name: 'new', 
            id: $scope._count++, 
            active: true
            });
    };
    
    $scope.getBasicVal = function(name, tab) {
        switch(name){
            case "STR":
                return tab.str;
            case "CON":
                return tab.con;
            case "SIZ":
                return tab.siz;
            case "INT":
                return tab.int;
            case "POW":
                return tab.pow;
            case "DEX":
                return tab.dex;
            case "CHA":
                return tab.cha;
        }
        
        return 0;
    };
    
    $scope.calcTotal = function(skill, tab) {
        
        var total = $scope.getBasicVal(skill.basicA, tab) + $scope.getBasicVal(skill.basicB, tab);
        
        if(tab.ranks[skill.name]) {
            total += tab.ranks[skill.name];
        }
        
        /*
        TODO: Make it auto add ranks from the culture separately
        if(tab.cultureSkills[skill.name]) {
            total += tab.cultureSkills[skill.name];
        }
        */
        
        return total;
    };
    
    $scope.calcHp = function(tab) {
    
        return {
            rlegHp: Math.ceil((tab.con + tab.siz)/5),
            llegHp:  Math.ceil((tab.con + tab.siz)/5),
            abdomenHp:  Math.ceil((tab.con + tab.siz)/5) + 1,
            chestHp:  Math.ceil((tab.con + tab.siz)/5) + 2,
            rarmHp:  Math.ceil((tab.con + tab.siz)/5) - 1,
            larmHp:  Math.ceil((tab.con + tab.siz)/5) -1,
            headHp:  Math.ceil((tab.con + tab.siz)/5)
        };
    };
    
    $scope.strikeRank = function(tab) {
        return Math.ceil(tab.dex + (tab.int/2)) + $scope.armorPenalty(tab);
    };
    
    $scope.magicPoints = function(tab) { return tab.pow;};
    
    $scope.impMod = function(tab) { return Math.ceil(tab.cha/6)-2;};
    
    $scope.damageMod = function(tab) {
        var sum = tab.str + tab.siz;
        if(sum < 5) return '-1D8';
        if(sum < 10) return '-1D6';
        if(sum < 15) return '-1D4';
        if(sum < 20) return '-1D2';
        if(sum < 25) return '+0';
        if(sum < 30) return '+1D2';
        if(sum < 35) return '+1D4';  
        if(sum < 40) return '+1D6';
        if(sum < 45) return '+1D8';
        if(sum < 50) return '+1D10';
        if(sum < 60) return '+1D12';
        if(sum < 70) return '+2D6';
        if(sum < 80) return '+2D8';
        if(sum < 90) return '+2D10';
        if(sum < 100) return '+2D12';
    };
    
    $scope.combatActions = function(tab) {
        return Math.ceil(((tab.dex + tab.int) / 2)/6);
    };
    
    $scope.armorPenalty = function(tab) {
        var sum = tab.rlegAp + tab.llegAp + tab.abdomenAp + tab.chestAp + tab.rarmAp + tab.larmAp + tab.headAp;
        return Math.ceil(sum / 5) * -1;        
    };
    
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
