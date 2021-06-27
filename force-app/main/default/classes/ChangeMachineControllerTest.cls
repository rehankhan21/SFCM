@IsTest
public with sharing class ChangeMachineControllerTest {
    @IsTest
    static void ChangeMachineControllerTest() {
        Test.startTest();
        ChangeMachineController.doChangeFunction(true, true);
        Test.stopTest();
    }
}