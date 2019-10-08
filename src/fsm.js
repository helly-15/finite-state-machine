class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.localConfig=config;

        this.history = [];
        this.history.push(this.localConfig.initial);
        this.undoHistory = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.history[this.history.length - 1];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (Object.keys(this.localConfig.states).includes(state)){
            this.history.push(state);
            this.undoHistory = [];
            return state;
        } else {
            throw new Error("Error");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event){
        return this.changeState(this.localConfig.states[this.getState()]['transitions'][event]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.localConfig.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event){
            return Object.keys(this.localConfig.states)
        }
        let arrStates=[];
        for (let key in this.localConfig.states){
            if (Object.keys(this.localConfig.states[key].transitions).includes(event)){
                arrStates.push (key)
            }
        }
        return arrStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length <= 1) {
            return false;
        }
        this.undoHistory.push(this.history.pop());
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.undoHistory.length == 0){
            return false;
        }
        this.history.push(this.undoHistory.pop());
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        let state = this.history.pop();
        this.history = [];
        this.undoHistory = [];
        this.changeState(state);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/


const config = {
    initial: 'normal',
    states: {
        normal: {
            transitions: {
                study: 'busy',
            }
        },
        busy: {
            transitions: {
                get_tired: 'sleeping',
                get_hungry: 'hungry',
            }
        },
        hungry: {
            transitions: {
                eat: 'normal'
            },
        },
        sleeping: {
            transitions: {
                get_hungry: 'hungry',
                get_up: 'normal',
            },
        },
    }
};

function trial (para){

let c= Object.keys( config.states);
      return c;     
    
    
}
//console.log (trial ("hungry"));