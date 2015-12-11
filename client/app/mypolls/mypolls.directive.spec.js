'use strict';

describe('Directive: mypolls', function () {

  // load the directive's module and view
  beforeEach(module('kinleyVotingappApp'));
  beforeEach(module('app/mypolls/mypolls.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mypolls></mypolls>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the mypolls directive');
  }));
});