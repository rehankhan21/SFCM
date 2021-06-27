@IsTest
public with sharing class ChangeMachineControllerTest {
    @IsTest
    static void ChangeMachineControllerTest() {
        Test.startTest();
        ChangeMachineController.doChangeFunction(true, true);
        ChangeMachineController.doChangeFunction(true, false);
        ChangeMachineController.doChangeFunction(false, true);
        ChangeMachineController.doChangeFunction(false, false);
        ChangeMachineController.clickHistory('test');
        Test.stopTest();
    }
}