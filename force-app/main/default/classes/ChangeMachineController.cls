public with sharing class ChangeMachineController {


    //TODO: Create your front-end reachable here 

    // Takes String of Button clicked as param
    // Creates a new custom sOb
    // Record contains name of button clicked and the time the button was clicked
    public static void clickHistory(String name){

        Datetime dateToday = DateTime.now();

        try{
            Click_History__c history = new Click_History__c(Button_Clicked__c = name, Click_Time__c = dateToday);

            insert history;
        }catch(DmlException e){
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
        }
    }


    // Takes two Boolean values as Params
    // checks to see if the Booleans are true or false
    // returns the appropriate fucntion accordingly.
    @AuraEnabled(cacheable=false)
    public static String doChangeFunction(Boolean change, Boolean machine){
        try {
            if(change == true && machine == true){
                clickHistory('Change Machine');
                
                return changeMachineFunction();
            }
            else if(change == true && machine == false){
                clickHistory('Change');

                return changeFunction();
            }
            else if(machine == true && change == false){
                clickHistory('Machine');

                return machineFunction();
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return null;
    }
    
    
    private static String changeFunction() {
        return 'make some Changes';
    }

    private static String machineFunction() {
        return 'with Machine';
    }

    private static String changeMachineFunction(){
        return 'Let\'s '+ changeFunction() + ' ' + machineFunction(); 
    }
}