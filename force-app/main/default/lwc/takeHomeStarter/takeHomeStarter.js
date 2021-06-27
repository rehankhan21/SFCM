import { LightningElement, wire, track } from 'lwc';

import doChangeFunction from '@salesforce/apex/ChangeMachineController.doChangeFunction'

let changeCounter = 0;
let machineCounter = 0;
let changeMachineCounter = 0;



const columns = [
    { label: 'Time', fieldName: 'time'},
    { label: 'ButtonClicked', fieldName: 'buttonClicked'}
];

export default class TakeHomeStarter extends LightningElement {

    clickedButtonLabel;

    //Wire a method to a property, when method is invoked the result is automatically assigned to
    // @wire(doChange)
    // doChange;
    percentChange;
    percentMachine;
    percentChangeMachine;

    @track
    data = [];
    columns = columns;
    
    handleChange(type){

        if(type == "change")
        {
            changeCounter += 1;
            let total = changeCounter + machineCounter + changeMachineCounter;

            this.percentChange = Math.trunc(100 * (changeCounter / total));
            this.percentMachine = Math.trunc(100 * (machineCounter / total));
            this.percentChangeMachine = Math.trunc(100 * (changeMachineCounter / total));
        }
        else if(type == "machine"){

            machineCounter += 1;
            let total = changeCounter + machineCounter + changeMachineCounter;

            this.percentChange = Math.trunc(100 * (changeCounter / total));
            this.percentMachine = Math.trunc(100 * (machineCounter / total));
            this.percentChangeMachine = Math.trunc(100 * (changeMachineCounter / total));
        }
        else if(type == "changeMachine"){

            changeMachineCounter += 1;
            let total = changeCounter + machineCounter + changeMachineCounter;

            this.percentChange = Math.trunc(100 * (changeCounter / total));
            this.percentMachine = Math.trunc(100 * (machineCounter / total));
            this.percentChangeMachine = Math.trunc(100 * (changeMachineCounter / total));
        }


    }

    handleClick(event) {

        if(event.target.label == "Change Machine"){
            doChangeFunction({change:true, machine:true})
            .then(result => {
                this.clickedButtonLabel = result;
                console.log(result);
            })
            .catch(error => {
                this.error = error;
            });

           this.handleChange("changeMachine");

            var offset = -4;
            let currentTime = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )

            this.data = [{time: currentTime, buttonClicked: event.target.label}, ...this.data];

        }
        else if(event.target.label == "Change"){
            doChangeFunction({change:true, machine:false})
            .then(result => {
                this.clickedButtonLabel = result;
                console.log(result);
            })
            .catch(error => {
                this.error = error;
            });

            this.handleChange("change");

            var offset = -4;
            let currentTime = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )

            this.data = [{time: currentTime, buttonClicked: event.target.label}, ...this.data];
        }
        else if(event.target.label == "Machine") {
            doChangeFunction({change:false, machine:true})
            .then(result => {
                this.clickedButtonLabel = result;
                console.log(result); 
            })
            .catch(error => {
                this.error = error;
            });

            this.handleChange("machine");

            var offset = -4;
            let currentTime = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )

            this.data = [{time: currentTime, buttonClicked: event.target.label}, ...this.data];
        }
    }
}