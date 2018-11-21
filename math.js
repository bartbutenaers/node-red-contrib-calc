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

	function MathNode(config) {
		RED.nodes.createNode(this, config);
        this.operation = config.operation;
    
        var node = this;
        
        // Check whether all the values are numbers
        function checkNumbers(payload, minCount, maxCount) {
            var values = [];
            var numbers = [];
            var isArray = Array.isArray(payload);
            
            if (!isArray) {
                if (minCount > 1) {
                    node.error("The msg.payload should be an array");
                    return null;
                }
                
                // Seems we have enough with an array containing a single item
                values.push(payload);
            }
            else {
                // Let's check all the numbers in the array
                values = payload;
            }
            
            if (maxCount && minCount === maxCount) {
                if (values.length !== minCount) {
                    node.error("The msg.payload should be an array with " + minCount + " numbers");
                    return null;
                }
            }
            else {
                if (values.length < minCount) {
                    node.error("The msg.payload should be an array with minimum " + minCount + " numbers");
                    return null;
                }
                if (maxCount && values.length > maxCount) {
                    node.error("The msg.payload should be an array with maximum " + maxCount + " numbers");
                    return null;
                }
            }
            
            for (var i = 0; i < values.length; i++) {
                var number = parseFloat(values[i]);
                if (isNaN(number)){
                    node.error("The msg.payload should only contain number(s)");
                    return null;
                }
                numbers.push(number);
            }

            return numbers;
        }
    
        node.on("input", function(msg) {          
            var operation = node.operation;
            var numbers = [];
            var count;
            var isArray = Array.isArray(msg.payload);
            
            if (!operation || operation === "") {
                operation = msg.operation;
                
                if (!operation) {
                    node.error("An msg.operation should be supplied");
                    return null;
                }
            }
            
            switch(operation) {
                case "abs":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.abs(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "acos":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.acos(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "acosh":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.acosh(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "asin":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.asin(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "asinh":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.asinh(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "atan":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.atan(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "atanh":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.atanh(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "avg":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    msg.payload = numbers.reduce(function(a, b) { return a + b; });
                    msg.payload = msg.payload / numbers.length;
                    break;
                case "cbrt":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.cbrt(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "ceil":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.ceil(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "cos":
                    numbers = checkNumbers(msg.payload, 1);
                     if (!numbers) return;
                   numbers.forEach(function(a, index) {
                        numbers[index] = Math.cos(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "cosh":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.cosh(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "dec":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = a - 1;
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "div":
                    numbers = checkNumbers(msg.payload, 2);
                    if (!numbers) return;
                    
                    for (var i = 1; i < numbers.length; i++) {
                        if (numbers[i] === 0) {
                            node.error("The msg.payload should only contain non-zero number(s) for the denominators");
                            return null;
                        }
                    }
                    
                    msg.payload = numbers.reduce(function(a, b) { return a / b; });
                    break;
                case "exp":
                    numbers = checkNumbers(msg.payload, 1);
                     if (!numbers) return;
                   numbers.forEach(function(a, index) {
                        numbers[index] = Math.exp(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "inc":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = a + 1;
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "floor":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.floor(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "log":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.log(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;                
                case "max":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    msg.payload = numbers.reduce(function(a, b) { return (a > b) ? a : b });
                    break;
                case "min":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    msg.payload = numbers.reduce(function(a, b) { return (a > b) ? b : a });
                    break;
                case "mult":
                    numbers = checkNumbers(msg.payload, 2);
                    if (!numbers) return;
                    msg.payload = numbers.reduce(function(a, b) { return a * b; });
                    break;
                case "mod":
                    numbers = checkNumbers(msg.payload, 2, 2);
                    if (!numbers) return;
                    msg.payload = numbers[0] % numbers[1];
                    break;
                case "pow":
                    numbers = checkNumbers(msg.payload, 2, 2);
                    if (!numbers) return;
                    msg.payload = Math.pow(numbers[0], numbers[1]);
                    break;                
                case "random":
                    // When the payload contains an array, then we will generate an array (with same length) of random numbers.
                    // Regardless of the content of the content of the payload array, since we don't need it for our calculations ...
                    if (isArray) {
                        numbers = new Array(msg.payload.length);
                    }
                    else {
                        numbers = new Array(1);
                    }
                
                    // Remark: 'forEach' does not work on an un-initialized array
                    for (var j = 0; j < numbers.length; j++) {
                        numbers[j] = Math.random();
                    }
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;
                case "round":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.round(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;  
                case "sin":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.sin(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;  
                case "sinh":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.sinh(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;  
                case "sqrt":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.sqrt(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;  
                case "sum":
                    numbers = checkNumbers(msg.payload, 2);
                    if (!numbers) return;
                    msg.payload = numbers.reduce(function(a, b) { return a + b; });
                    break;
                case "sub":
                    numbers = checkNumbers(msg.payload, 2);
                    if (!numbers) return;
                    msg.payload = numbers.reduce(function(a, b) { return a - b; });
                    break;
                case "tan":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.tan(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;  
                case "tanh":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.tanh(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;  
                case "trunc":
                    numbers = checkNumbers(msg.payload, 1);
                    if (!numbers) return;
                    numbers.forEach(function(a, index) {
                        numbers[index] = Math.trunc(a);
                    });
                    msg.payload = (isArray) ? numbers : numbers[0];
                    break;                
                default:
                    node.error("The msg.operation contains an unsupported operation '" + operation + "'");
                    return null;
            }

            node.send(msg);
        });
    }
  
	RED.nodes.registerType("math", MathNode);
}
