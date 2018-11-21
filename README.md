# node-red-contrib-math
A Node-Red node to perform basic mathematical operations

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-math
```

For more advanced mathematical operations, please have a look at the [node-red-contrib-statistics](https://github.com/DeanCording/node-red-contrib-statistics) node.

## Usage
Three steps are involved to execute a mathematical calculation via this node:
1. An input data is send to this node with a number or an array of numbers in the ```msg.payload```.  How many numbers should be available in the input message, depends on the *operation* type:
+ Most operations require only a ***single input number***.  For example a single input number ```-3``` is enough to calculate the absolute value.  All operations like this one will also accept an array of numbers as input data.  In that case *the same operation will be executed on every number in the array*!  For example the absolute value of array ```[-7, -3, -9, -12]``` will result in ```[7, 3, 9, 12]```.
+ Some other operations require always an ***array of input numbers***.  For example an array of minimum 2 input numbers ```[2, 3]``` is required to multiply, but the result will be a single output number ```6```.
+ A few operations require a ***fixed-length array of input numbers***.  For example X to the power of Y requires an array of two input numbers.
2. The node will execute the requested operation on the input data.
3. The result of the calculation will be stored in ```msg.payload``` of the output message.  The result can be a single output number or an array of output numbers.

## Operations
+ ***Average***: average of all the numbers in the input array.

   Input = ```[1, 2, 3, 4]```   => Output = ```2.5```
   
+ ***Maximum***: get the number with the highest value from an array of numbers.

   Input = ```[1, 2, 3, 4]```   => Output = ```4```
   
+ ***Minimum***: get the number with the lowest value from an array of numbers.

   Input = ```[1, 2, 3, 4]```   => Output = ```1```
   
+ ***Increment***: add 1 to the number.

   Input = ```4```   => Output = ```5```
   
   Input = ```[1, 2, 3, 4]```   => Output = ```[2, 3, 4, 5]```
   
+ ***Decrement***: subtract 1 from the number.

   Input = ```4```   => Output = ```3```
   
   Input = ```[1, 2, 3, 4]```   => Output = ```[0, 1, 2, 3]```
   
+ ***Integer part***: truncate (trunc) the number to the integer part.

   Input = ```4.6```   => Output = ```4```
   
   Input = ```[1.3, 2.5, 3.7]```   => Output = ```[1, 2, 3]```
   
+ ***Round upwards***: round the number upwards (ceil) to the nearest integer.

   Input = ```4.6```   => Output = ```5```
   
   Input = ```[1.3, 2.5, 3.7]```   => Output = ```[2, 3, 4]```
   
+ ***Round downwards***: round the number downwards (floor) to the nearest integer.

   Input = ```4.6```   => Output = ```4```
   
   Input = ```[1.3, 2.5, 3.7]```   => Output = ```[1, 2, 3]```
   
+ ***Nearest integer***: rounds the number to the nearest integer.

   Input = ```4.6```   => Output = ```5```
   
   Input = ```[1.3, 2.5, 3.7]```   => Output = ```[1, 3, 4]```
   
+ ***Sum***: sum of the all the numbers in the array.

   Input = ```[1, 2, 3, 4]```   => 1 + 2 + 3 + 4  => Output = ```10```
   
+ ***Subtract***: subtraction of the all the numbers in the array.

   Input = ```[3, 2, 1]```   => 3 - 2 - 1 => Output = ```0```
   
+ ***Multiply***: multiply all the numbers in the array.

   Input = ```[3, 2, 1]```   => 3 * 2 * 1 => Output = ```6```
   
+ ***Divide***: division of all the numbers in the array.

   Input = ```[3, 2, 1]```   => 3 : 2 : 1 => Output = ```1.5```
   
+ ***Modulus***: get the remainder of the division of the *two* numbers in the array.

   Input = ```[3, 2]```   => 3 % 2  => Output = ```1```

+ ***Absolute value***: absolute value (abs) of the number.

   Input = ```-4```   => Output = ```4```
   
   Input = ```[-3, -5, -7]```   => Output = ```[3, 5, 7]```
   
+ ***Random***: a random number between 0 and 1.  The input value will not be checked, since it is not required to calculate the output value.  When the input is an array of N length, then the output will also be an array containing N random numbers.

   Input = ```x```   => Output = ```0.xxxxx```
   
   Input = ```[x, x, x]```   => Output = ```[0.xxxxx, 0.xxxxx, 0.xxxxx]```
   
+ ***X to the power of y***: x<sup>y</sup> from an array of two numbers.

   Input = ```[2, 3]```   => 2<sup>3</sup>  => Output = ```8```
   
+ ***E to the power of x***: value of E<sup>x</sup>, where E is Euler's number (approximately 2.7183).
+ ***Cubic root***: cubic root (x<sup>3</sup>) of the number.
+ ***Natural logarithm (base E)***: natural logarithm (log) of the number.
+ ***Arccosine***: arccosine (acos) value of the number.
+ ***Hyperbolic arccosine***: hyperbolic arccosine (acosh) of the number.
+ ***Arcsine***: arcsine (asin) of the number in radians.
+ ***Hyperbolic arcsine***: hyperbolic arcsine (asinh) of the number.
+ ***Arctangent***: arctangent (atan) of the number, as a numeric value between -PI/2 and PI/2 radians.
+ ***Hyperbolic arctangent***: hyperbolic arctangent (atanh) of the number.
+ ***Cosine***: cosine (cos) of the number in radians.
+ ***Hyperbolic cosine***: hyperbolic cosine of the number.
+ ***Sine***: sine of the number in radians.
+ ***Hyperbolic sine***: hyperbolic sine (sinh) of the number.
+ ***Square root***: square root of the number.
+ ***Tangent***: tangent (tan) of an angle.
+ ***Hyperbolic tangent***: hyperbolic tangent (tanh) of the number.
