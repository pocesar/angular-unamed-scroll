/// <reference path="typings/generic.d.ts" />

'use strict';

import scrollTo = require('scroll-to');

export namespace Directives {

    class UnamedScroll implements angular.IDirective {
        link: angular.IDirectivePrePost;

        constructor(UnamedScroll: Services.UnamedScroll) {
            this.link = {
                post: (scope, el, attrs) => {
                    if (!attrs['unamedScroll'] && !attrs['id']) {
                        return;
                    }

                    var name: string = attrs['unamedScroll'] || attrs['id'];

                    attrs.$observe(attrs['unamedScroll'] ? 'unamedScroll' : 'id', (newName: string) => {
                        UnamedScroll.remove(name);
                        name = newName;
                        UnamedScroll.add(name, el);
                    })

                    scope.$on('$destroy', () => {
                        UnamedScroll.remove(name);
                    });
                }
            };
        }

        static instance(){
            return ['UnamedScroll', (UnamedScroll: Services.UnamedScroll) => new this(UnamedScroll)];
        }

    }

    export var unamedScroll: angular.IDirective = UnamedScroll.instance();
}

export namespace Services {

    export class UnamedScroll {
        private elements: { [name: string]: angular.IAugmentedJQuery } = {};

        add(name: string, element: angular.IAugmentedJQuery) {
            this.elements[name] = element;
        }

        scrollTo(name: angular.IAugmentedJQuery, opts?: any): angular.IPromise<boolean>;
        scrollTo(name: string, opts?: any): angular.IPromise<boolean>;
        scrollTo(name: any, opts: any = {}): angular.IPromise<boolean> {
            return new this.$q<boolean>((resolve) => {
                if (typeof this.elements[name] !== 'undefined') {
                    scrollTo(0,
                        (angular.isString(name) ? this.elements[name] : name).offset().top, opts
                    ).on('end', function(){
                        resolve(true);
                    });
                } else {
                    resolve(false);
                }
            });
        }

        remove(name: string) {
            delete this.elements[name];
        }

        static $inject: string[] = ['$q'];

        constructor(private $q: angular.IQService) {

        }
    }
}

angular
.module('UnamedScroll', [])
.directive(Directives)
.service(Services)
;