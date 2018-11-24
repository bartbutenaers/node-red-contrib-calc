# node-red-contrib-calc
A Node-Red node to perform basic mathematical calculations

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-calc
```

For more advanced mathematical operations, please have a look at the [node-red-contrib-statistics](https://github.com/DeanCording/node-red-contrib-statistics) node.

## Usage
Three steps are involved to execute a mathematical calculation via this node:
1. An input data is send to this node with a number or an array of numbers in the input message.  By default the data will arrive via ```msg.payload```, but another input message field can be selected:  

   ![Input field](https://raw.githubusercontent.com/bartbutenaers/node-red-contrib-calc/master/images/calc_input.png)

   How many numbers should be available in the input message, depends on the *operation* type:
   + Most operations require only a ***single input number***.  For example a single input number ```-3``` is enough to calculate the absolute value.  All operations like this one will also accept an array of numbers as input data.  In that case *the same operation will be executed on every number in the array*!  For example the absolute value of array ```[-7, -3, -9, -12]``` will result in ```[7, 3, 9, 12]```.
   + Some other operations require always an ***array of input numbers***.  For example an array of minimum 2 input numbers ```[2, 3]``` is required to multiply, but the result will be a single output number ```6```.
    + A few operations require a ***fixed-length array of input numbers***.  For example X to the power of Y requires an array of two input numbers.
2. The node will execute the requested operation on the input data.
3. The result of the calculation will be stored in the output message.  The result can be a single output number or an array of output numbers.  By default the data will be put in ```msg.payload```, but another output message field can be selected: 

   ![Output field](https://raw.githubusercontent.com/bartbutenaers/node-red-contrib-calc/master/images/calc_output.png)

## Operations
Following operations are available:
+ **Average (avg)**: average of all the numbers in the input array.

   Input = ```[1, 2, 3, 4]```   => Output = ```2.5```
   
+ **Maximum (max)**: get the number with the highest value from an array of numbers.

   Input = ```[1, 2, 3, 4]```   => Output = ```4```
   
+ **Minimum (min)**: get the number with the lowest value from an array of numbers.

   Input = ```[1, 2, 3, 4]```   => Output = ```1```
   
+ ***Increment (inc)***: add 1 to the number.

   Input = ```4```   => Output = ```5```
   
   Input = ```[1, 2, 3, 4]```   => Output = ```[2, 3, 4, 5]```
   
+ **Decrement (dec)**: subtract 1 from the number.

   Input = ```4```   => Output = ```3```
   
   Input = ```[1, 2, 3, 4]```   => Output = ```[0, 1, 2, 3]```
   
+ **Integer part (trunc)**: truncate (trunc) the number to the integer part.

   Input = ```4.6```   => Output = ```4```
   
   Input = ```[1.3, 2.5, 3.7]```   => Output = ```[1, 2, 3]```
   
+ **Round upwards (ceil)**: round the number upwards (ceil) to the nearest integer.

   Input = ```4.6```   => Output = ```5```
   
   Input = ```[1.3, 2.5, 3.7]```   => Output = ```[2, 3, 4]```
   
+ **Round downwards (floor)**: round the number downwards (floor) to the nearest integer.

   Input = ```4.6```   => Output = ```4```
   
   Input = ```[1.3, 2.5, 3.7]```   => Output = ```[1, 2, 3]```
   
+ **Nearest integer (round)**: rounds the number to the nearest integer.

   Input = ```4.6```   => Output = ```5```
   
   Input = ```[1.3, 2.5, 3.7]```   => Output = ```[1, 3, 4]```
   
+ **Round decimal places (rdec)**: round the number at a specified number of decimal places (from an array of two numbers).

   Input = ```[1.23456, 3]```   => Output = ```[1.234]```
   
+ **Sum (sum)**: sum of the all the numbers in the array.

   Input = ```[1, 2, 3, 4]```   => 1 + 2 + 3 + 4  => Output = ```10```
   
+ **Subtract (sub)**: subtraction of the all the numbers in the array.

   Input = ```[3, 2, 1]```   => 3 - 2 - 1 => Output = ```0```
   
+ **Multiply (mult)**: multiply all the numbers in the array.

   Input = ```[3, 2, 1]```   => 3 * 2 * 1 => Output = ```6```
   
+ **Divide (div)**: division of all the numbers in the array.

   Input = ```[3, 2, 1]```   => 3 : 2 : 1 => Output = ```1.5```
   
+ **Modulus (mod)**: get the remainder of the division of the *two* numbers in the array.

   Input = ```[3, 2]```   => 3 % 2  => Output = ```1```

+ **Absolute value (abs)**: absolute value (abs) of the number.

   Input = ```-4```   => Output = ```4```
   
   Input = ```[-3, -5, -7]```   => Output = ```[3, 5, 7]```
   
+ **Random (rand)**: a random number between 0 and 1.  The input value will not be checked, since it is not required to calculate the output value.  When the input is an array of N length, then the output will also be an array containing N random numbers.

   Input = ```x```   => Output = ```0.xxxxx```
   
   Input = ```[x, x, x]```   => Output = ```[0.xxxxx, 0.xxxxx, 0.xxxxx]```
   
+ **X to the power of y (pow)**: x<sup>y</sup> from an array of two numbers.

   Input = ```[2, 3]```   => 2<sup>3</sup>  => Output = ```8```
   
+ **E to the power of x (exp)**: value of E<sup>x</sup>, where E is Euler's number (approximately 2.7183).
+ **Cubic root (cbrt)**: cubic root (x<sup>3</sup>) of the number.
+ **Natural logarithm (log)**: natural logarithm base E of the number.
+ **Arccosine (acos)**: arccosine (acos) value of the number.
+ **Hyperbolic arccosine (acosh)**: hyperbolic arccosine of the number.
+ **Arcsine (asin)**: arcsine of the number in radians.
+ **Hyperbolic arcsine (asinh)**: hyperbolic arcsine of the number.
+ **Arctangent (atan)**: arctangent of the number, as a numeric value between -PI/2 and PI/2 radians.
+ **Hyperbolic arctangent (atanh)**: hyperbolic arctangent of the number.
+ **Cosine (cos)**: cosine of the number in radians.
+ **Hyperbolic cosine (cosh)**: hyperbolic cosine of the number.
+ **Sine (sin)**: sine of the number in radians.
+ **Hyperbolic sine (sinh)**: hyperbolic sine of the number.
+ **Square root (sqrt)**: square root of the number.
+ **Tangent (tan)**: tangent of an angle.
+ **Hyperbolic tangent (tanh)**: hyperbolic tangent of the number.

## Message based operation
When no operation is specified in the config screen, the operation needs to be specifiedin the ```msg.operation``` field of the input message.  In the above list of available operations, the operation code is specified between angle brackets.

For example to calculate the 'Cubic root' of a number, the ```msg.operation``` field should contain value ```cbrt```.
