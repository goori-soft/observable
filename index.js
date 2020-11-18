module.exports = class Observable{

    constructor(){
        //nothing to do;
    }

    observers = [];
    subscribers = [];

    complete = (data)=>{
        this.observers.map((observer)=>{
            if(typeof(observer.complete) == 'function'){
                observer.complete(data, this);
            }
        });

        return this;
    }

    /**
     * Issues an error to observers
     */
    error = (e)=>{
        this.observers.map((observer)=>{
            if(typeof(observer.error) == 'function'){
                observer.error(data, this);
            }
        });

        return this;
    }

    /**
     * Transfer data to observers
     * @param {Any} data 
     */
    next = (data)=>{
        this.observers.map((observer)=>{
            if(typeof(observer.next) == 'function'){
                observer.next(data, this);
            }
        });

        return this;
    }

    /**
     * Notify every single subscribers function on this object
     * @param {Any} optionalParameter 
     */
    notify = (optionalParameter)=>{
        this.subscribers.map((f)=>{
            if(typeof(f) == 'function'){
                let param = optionalParameter;
                
                if(typeof(optionalParameter) == 'undefined'){
                    param = this;
                }

                f(param, this);
            }
            return;
        });

        return this;
    }

    /**
     * Subscribe a function to the observable object
     * @param {Function} f 
     */
    subscribe = (f)=>{
        if(!this.subscribers.includes(f) && typeof(f) == 'function'){
            this.subscribers.push(f);
        }
        else if(typeof(f) == 'object'){
            this.observers.push(f);
        }

        return this;
    }

    /**
     * Remove a function of the subscribers list
     * @param {Function} f 
     */
    unsubscribe = (f)=>{
        this.subscribers = this.subscribers.filter((func)=>{
            if(func == f) return false;
            return true;
        });

        this.observers = this.observers.filter((observer)=>{
            if(observer == f) return false;
            return true;
        });

        return this;
    }
}