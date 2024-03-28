#! /usr/bin/env node
import inquirer from "inquirer";

let myBalance = 10000; // Dollar
let myPin = 1441;

let pinAnswer = await inquirer.prompt([
    {
        name: "Pin",
        message: "Enter your Pin Number",
        type: "number"
    }
]);

if (pinAnswer.Pin === myPin) {
    console.log("Correct Pin Code!!!");

    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "Please Select Option",
            type: "list",
            choices: ["withdraw", "Check Balance", "Fastcash", "Other Amount"]
        }
    ]);

    if (operationAns.operation === "withdraw") {
        let amountAns;
        if (operationAns.operation === "OtherAmount") {
            amountAns = await inquirer.prompt([
                {
                    name: "Amount",
                    message: "Enter your Amount",
                    type: "number"
                }
            ]);
        } else {
            amountAns = await inquirer.prompt([
                {
                    name: "Amount",
                    message: "Select predefined amount",
                    type: "list",
                    choices: [10000,20000,30000,40000] // Add your predefined amounts here
                }
            ]);
        }

        if (myBalance >= amountAns.Amount) {
            myBalance -= amountAns.Amount;
            console.log(`Amount of $${amountAns.Amount} withdrawn. Your Remaining Balance is: ${myBalance}`);
        } else {
            console.log("Insufficient funds for withdrawal.");
        }
    } 
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your Balance is: ${myBalance}`);
    } 
    else if (operationAns.operation === "Fastcash") {
        let fastCashAmount = await inquirer.prompt([
            {
                name: "Amount",
                message: "Select Fastcash amount",
                type: "list",
                choices: [10000,20000,30000,40000] // Add your predefined amounts here
            }
        ]);
        
        if (myBalance >= fastCashAmount.Amount) {
            myBalance -= fastCashAmount.Amount;
            console.log(`Fastcash of $${fastCashAmount.Amount} withdrawn. Your Remaining Balance is: ${myBalance}`);
        } else {
            console.log("Insufficient funds for Fastcash withdrawal.");
        }
    }
} else {
    console.log("Incorrect Pin Code");
}