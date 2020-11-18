# Observable (goori-soft)
Extensible class for observable objects

# Install
```
$ npm install @goori-soft/observable
```

# How to use it
To use this class properly you must extend it into another class. Your class will inherit the observable properties.

```javascript
const Observable = require('@goori-soft/observable');
class MyClass extends Observable{
    myPorp = ''

    setProp = (data)=>{
        this.myPorp = data;
        this.notify(this.myPorp);
    }
}
```
This class is liable to be observed. The observer must be a function capable of handling the parameter passed on by notify.
> **Note:** if notify is invoked without parameters, the first parameter to be passed on to the observer will be the 'this' object.
```javascript
const myObj = new MyClass()

const myObserver = (data, obj)=>{
    console.log(data);
}

myObj
    .subscribe(myObserver)
    .setProp('Johnny');
```
Whenever the setProp method is invoked, the observer will be notified.

