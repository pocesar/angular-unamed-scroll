# angular-unamed-scroll

Scroll to elements on page without relying on IDs. Adds named elements to the
service, then scroll to them anywhere in your code.

It's actually an oxymoron. You name your elements, you just don't rely on the ID attribute.

## Install

```bash
bower install angular-unamed-scroll
```

## Usage

HTML

```html
<div ng-controller="SomeCtrl as ctrl">
    <div unamed-scroll="name"></div>

    <a ng-click="ctrl.go('name')"></a>
</div>
```

JS

```js
angular
.module('YourApp', ['UnamedScroll'])
.controller('SomeCtrl', ['UnamedScroll', function(UnamedScroll){
    this.go = function(name){
        UnamedScroll.scrollTo(name).then(function(exists){
            // exists will be true if the element exists, false otherwise
            // so it's safe to call when the element doesn't exist on the page
        });
    };
}])
;
```

## License

MIT
