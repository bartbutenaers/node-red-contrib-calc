/**
 * Copyright 2018 Bart Butenaers
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
module.exports = function(RED) {

	function CalcNode(config) {
		RED.nodes.createNode(this, config);
        this.inputMsgField = config.inputMsgField;
        this.outputMsgField = config.outputMsgField;
        this.operation = config.operation;
    
        var node = this;
        
        // Test if an object contains the specified property (handles multiple levels like obj.a.b.c).
        // (See https://www.customd.com/articles/37/checking-javascript-objects-for-existence-of-a-nested-element )
        function objectHasProperty(obj, prop) {
            var parts = prop.split('.');
            for (var i = 0, l = parts.length; i < l; i++) {
                var part = parts[i];
                if ((obj !== null) && (typeof(obj) === 'object') && (part in obj)) {
                    obj = obj[part];
                }
                else {
                    return false;
                }
            }
            return true;
        }
        
        // Check whether all the values are numbers
        function checkNumbers(inputValue, minCount, maxCount) {
            var values = [];
            var numbers = [];      
            var isArray = Array.isArray(inputValue);
            
            if (!isArray) {
                if (minCount > 1) {
                    node.error("The msg." + this.inputMsgField + " should be an array");
                    return null;
                }
                
                // Seems we have enough with an array containing a single item
                values.push(inputValue);
            }
            else {
                // Let's check all the numbers in the array
                values = inputValue;
            }
            
            if (maxCount && minCount === maxCount) {
                if (values.length !== minCount) {
                    node.error("The msg." + this.inputMsgField + " should be an array with " + minCount + " numbers");
                    return null;
                }
            }
            else {
                if (values.length < minCount) {
                    node.error("The msg." + this.inputMsgField + " should be an array with minimum " + minCount + " numbers");
                    return null;
                }
                if (maxCount && values.length > maxCount) {
                    node.error("The msg." + this.inputMsgField + " should be an array with maximum " + maxCount + " numbers");
                    return null;
                }
            }
            
            for (var i = 0; i < values.length; i++) {
                var number = parseFloat(values[i]);
                if (isNaN(number)){
                    node.error("The msg." + this.inputMsgField + " should only contain number(s)");
                    return null;
                }
                numbers.push(number);
            }

            return numbers;
        }
    
        node.on("input", function(msg) {          
            var operation = node.operation;
            var numbers = [];
            var msgKeyValue;
            var count;
            var result;
            
            if (!objectHasProperty(msg, node.inputMsgField)) {
                node.error("The input message doesn't have have a msg." + node.inputMsgField + " field")
                return null;
            }
            
            try {
                msgKeyValue = RED.util.getMessageProperty(msg, node.inputMsgField);
            } 
            catch(err) {
                node.error("The msg." + node.inputMsgField + " field can not be read");
                return;
            }
            
            var isArray = Array.isArray(msgKeyValue);
            
            if (!operation || operation === "") {
                operation = msg.operation;
                
                if (!operation) {
                    node.error("An msg.operation should be supplied");
                    return null;
                }
            }
            
            switch(operation) {
                case "abs":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.abs(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "acos":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.acos(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "acosh":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.acosh(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "asin":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.asin(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "asinh":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.asinh(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "atan":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.atan(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "atanh":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.atanh(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "avg":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    result = numbers.reduce(function(a, b) { return a + b; });
                    result = result / numbers.length;
                    break;
                case "cbrt":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.cbrt(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "ceil":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.ceil(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "cos":
                    numbers = checkNumbers(msgKeyValue, 1);
                     if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.cos(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "cosh":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.cosh(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "dec":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = a - 1;
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "div":
                    numbers = checkNumbers(msgKeyValue, 2);
                    if (!numbers) return;
                    
                    for (var i = 1; i < numbers.length; i++) {
                        if (numbers[i] === 0) {
                            node.error("The msg." + msgKeyValue + " should only contain non-zero number(s) for the denominators");
                            return null;
                        }
                    }
                    
                    result = numbers.reduce(function(a, b) { return a / b; });
                    break;
                case "exp":
                    numbers = checkNumbers(msgKeyValue, 1);
                     if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.exp(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "inc":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = a + 1;
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "floor":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.floor(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "log":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.log(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;                
                case "max":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    result = numbers.reduce(function(a, b) { return (a > b) ? a : b });
                    break;
                case "min":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    result = numbers.reduce(function(a, b) { return (a > b) ? b : a });
                    break;
                case "mult":
                    numbers = checkNumbers(msgKeyValue, 2);
                    if (!numbers) return;
                    result = numbers.reduce(function(a, b) { return a * b; });
                    break;
                case "mod":
                    numbers = checkNumbers(msgKeyValue, 2, 2);
                    if (!numbers) return;
                    result = numbers[0] % numbers[1];
                    break;
                case "pow":
                    numbers = checkNumbers(msgKeyValue, 2, 2);
                    if (!numbers) return;
                    result = Math.pow(numbers[0], numbers[1]);
                    break;                
                case "rand":
                    // When the payload contains an array, then we will generate an array (with same length) of random numbers.
                    // Regardless of the content of the content of the payload array, since we don't need it for our calculations ...
                    if (isArray) {
                        numbers = new Array(msgKeyValue.length);
                    }
                    else {
                        numbers = new Array(1);
                    }
                
                    // Remark: 'forEach' does not work on an un-initialized array
                    for (var j = 0; j < numbers.length; j++) {
                        numbers[j] = Math.random();
                    }
                    result = (isArray) ? numbers : numbers[0];
                    break;
                case "rdec":
                    numbers = checkNumbers(msgKeyValue, 2, 2);
                    if (!numbers) return;
                    // See http://www.jacklmoore.com/notes/rounding-in-javascript/
                    result = Number(Math.round(numbers[0] + 'e' + numbers[1]) + 'e-' + numbers[1]);
                    break;
                case "round":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.round(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;  
                case "sin":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.sin(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;  
                case "sinh":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.sinh(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;  
                case "sqrt":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.sqrt(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;  
                case "sum":
                    numbers = checkNumbers(msgKeyValue, 2);
                    if (!numbers) return;
                    result = numbers.reduce(function(a, b) { return a + b; });
                    break;
                case "sub":
                    numbers = checkNumbers(msgKeyValue, 2);
                    if (!numbers) return;
                    result = numbers.reduce(function(a, b) { return a - b; });
                    break;
                case "tan":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.tan(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;  
                case "tanh":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.tanh(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;  
                case "trunc":
                    numbers = checkNumbers(msgKeyValue, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.trunc(a);
                    });
                    result = (isArray) ? numbers : numbers[0];
                    break;                
                default:
                    node.error("The msg.operation contains an unsupported operation '" + operation + "'");
                    return null;
            }
            
            RED.util.setMessageProperty(msg, node.outputMsgField, result, true);

            node.send(msg);
        });
    }
  
	RED.nodes.registerType("calc", CalcNode);
}
