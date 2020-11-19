const Observable = require('./index.js');

class MyClass extends Observable{

    constructor(){
        super();
        this.state = {
            name: 'John',
            age: 35
        }
    }

    set(newState){
        if(typeof(newState) == 'object'){
            for(let i in newState){
                this.state[i] = newState[i];
            }
        
            this.notify(this.state);
        }
    }
}

const myInstance = new MyClass();
const myFunc = (state, instance)=>{
   console.log('The name is ', state.name);
};

const myObserver = {
    next: (data)=>{ console.log(data)},

    error: (err)=> {console.error(err)},

    complete: (data, obj)=>{
        console.log(data);
        obj.unsubscribe(myObserver);
    }
}

myInstance.subscribe(myFunc);
myInstance.subscribe(myObserver);
myInstance.set({name: 'Johnny'});

setTimeout(() => {
    myInstance.next('Petter').complete('This message should not appear');
}, 2000);

setTimeout(() => {
    myInstance.next('Mary').complete('Finishing the observer...');
}, 1000);