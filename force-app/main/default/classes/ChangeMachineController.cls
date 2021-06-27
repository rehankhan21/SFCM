public with sharing class ChangeMachineController {


    //TODO: Create your front-end reachable here 

    public static void clickHis(String name){

        Datetime dateToday = DateTime.now();

        try{
            Click_History__c his = new Click_History__c(Button_Clicked__c = name, Click_Time__c = dateToday);

            insert his;
        }catch(DmlException e){
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
        }
    }


    @AuraEnabled(cacheable=false)
    public static String doChangeFunction(Boolean change, Boolean machine){
        try {
            if(change == true && machine == true){
                clickHis('Change Machine');
                
                return changeMachineFunction();
            }
            else if(change == true && machine == false){
                clickHis('Change');

                return changeFunction();
            }
            else if(machine == true && change == false){
                clickHis('Machine');

                return machineFunction();
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return changeFunction();
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