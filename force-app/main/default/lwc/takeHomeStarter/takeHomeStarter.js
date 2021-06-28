import { LightningElement, wire, track } from 'lwc';

import doChangeFunction from '@salesforce/apex/ChangeMachineController.doChangeFunction'

// Counter varaibles to calculate button click percentage
let changeCounter = 0;
let machineCounter = 0;
let changeMachineCounter = 0;

// Columns for lightning data table
const COLUMNS = [
    { label: 'Time', fieldName: 'time'},
    { label: 'ButtonClicked', fieldName: 'buttonClicked'}
];

export default class TakeHomeStarter extends LightningElement {

    clickedButtonLabel;

    percentChange;
    percentMachine;
    percentChangeMachine;

    // Assigning the lightning data table properties
    @track
    data = [];
    columns = COLUMNS;
    
    // Takes String as Param containing the button label
    // Calculates button clicked percentage
    handlePercent(button){

        if(button == "change")
        {
            changeCounter += 1;
            let total = changeCounter + machineCounter + changeMachineCounter;

            this.percentChange = Math.trunc(100 * (changeCounter / total));
            this.percentMachine = Math.trunc(100 * (machineCounter / total));
            this.percentChangeMachine = Math.trunc(100 * (changeMachineCounter / total));
        }
        else if(button == "machine"){

            machineCounter += 1;
            let total = changeCounter + machineCounter + changeMachineCounter;

            this.percentChange = Math.trunc(100 * (changeCounter / total));
            this.percentMachine = Math.trunc(100 * (machineCounter / total));
            this.percentChangeMachine = Math.trunc(100 * (changeMachineCounter / total));
        }
        else if(button == "changeMachine"){

            changeMachineCounter += 1;
            let total = changeCounter + machineCounter + changeMachineCounter;

            this.percentChange = Math.trunc(100 * (changeCounter / total));
            this.percentMachine = Math.trunc(100 * (machineCounter / total));
            this.percentChangeMachine = Math.trunc(100 * (changeMachineCounter / total));
        }


    }

    // Handles the on click event
    // Returns value from Apex class depending on which button was clicked
    // Reassigns the record value for the lightning data table with the new button that was clicked
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

           this.handlePercent("changeMachine");

            let currentTime = new Date( new Date().getTime() + -4 * 3600 * 1000).toUTCString().replace( / GMT$/, " EST" )

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

            this.handlePercent("change");

            let currentTime = new Date( new Date().getTime() + -4 * 3600 * 1000).toUTCString().replace( / GMT$/, " EST" )

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

            this.handlePercent("machine");

            let currentTime = new Date( new Date().getTime() + -4 * 3600 * 1000).toUTCString().replace( / GMT$/, " EST" )

            this.data = [{time: currentTime, buttonClicked: event.target.label}, ...this.data];
        }
    }
}