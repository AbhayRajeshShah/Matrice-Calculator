const array1 = document.getElementById("array1");
const array2 = document.getElementById("array2");

var operand1;
var operand2;
var result=[];
var row1;
var row2;
var col1;
var col2;
//handle submit
function handleSubmit(task)
{
    reset();
    switch (task){
        case addition:
        case subtraction:
            if(operand1.length==operand2.length){
                console.log(operand1);
                task(operand1,operand2,result);
                var stringResult = "[ "
                result.forEach(summ=>{stringResult=stringResult +summ + " "})
                $("#answer").text(stringResult+"]");
            }else{
                console.log(operand1);
                $("#answer").text("Matrices need to have the same number of rows and columns");
            };break;
        case multiply: if(operand1.length!=row1*col1||operand2.length!=row2*col2){
            $("#answer").text("The Rows and columns specified do not equal the element.Recheck your input");
        }else{
           
            result = multiply(operand2,operand1,row2,col2,row1,col1);
            var stringResult = "[ "
                 result.forEach(summ=>{stringResult=stringResult +summ + " "})
                 $("#answer").text(stringResult+"]");
        };break;
        case multiplyReverse: if(operand1.length!=row1*col1||operand2.length!=row2*col2){
            $("#answer").text("The Rows and columns specified do not equal the element.Recheck your input");
        }else{
           
            result = multiply(operand1,operand2,row1,col1,row2,col2);
            var stringResult = "[ "
                 result.forEach(summ=>{stringResult=stringResult +summ + " "})
                 $("#answer").text(stringResult+"]");
        };break;
        case determinant : 
        var deter = determinant(operand1,col1,row1);
        $("#answer").text(deter);
        case determinantB : 
        var deter = determinant(operand2,col2,row2);
        $("#answer").text(deter);
    }
    
}

//reset
function reset(){
    result=[];
    changetoString(operand1);
    changetoString(operand2);
}

// Check for submit.
$("#added").click(()=>task = addition);
$("#subtract").click(()=>task = subtraction);
$("#multiply").click(()=>task=multiply);
$("#multiplyReverse").click(()=>task=multiplyReverse);
$("#determinant").click(()=>task=determinant);
$("#determinantB").click(()=>task=determinantB);
$("#calculate").click(()=>handleSubmit(task));

//update operands
setInterval(function(){
    operand1 = array1.value.split(" ");operand2 = array2.value.split(" ");
    row1 = $("#Row1").val();
    col1=$("#Col1").val();
    row2 = $("#Row2").val();
    col2=$("#Col2").val();
    },1000);

//change to string
function changetoString(array){
for(var i=0;i<array.length;i++){
    array[i]=parseInt(array[i],10);
    if(isNaN(array[i])){
        array.splice(i,1);
        changetoString(array);
    }
    
}
}

//add
function addition(array1,array2,array3){
    for(var i=0;i<array1.length;i++){
        let sum = array1[i] + array2[i];
        array3.push(sum);
    }
}

//subtract
function subtraction(array1,array2,array3){
    for(var i=0;i<array1.length;i++){
        let difference = array1[i] - array2[i];
        array3.push(difference);
    }
}

//multiply
function multiply(array1,array2,row1,col1,row2,col2){
    var element = 0;
    var elements = [];
    console.log(col1+""+row2)
if(col1==row2){
for(var k=0;k<row1;k++){
    for(var j=0;j<col2;j++){
        for(var i=0;i<col1;i++){
            element= array1[i+(k*col1)] * array2[i*col2+j] +element;
            if(i==col1-1){
                elements.push(element);
                element = 0;
                
            }
         }
    }
}
}else{
    $("#answer").text("Inner Elements of the matrix are not equal. They cannot be multiplied");
    return; 
}
return elements;

}


function determinant(array,col,row){
    var sum=0;
if(col==row){

    if(row==2){
     sum = array[0]*array[3]-(array[1]*array[2]);
     return sum;
    }else if(row==3){
        for(var i=0;i<col;i++){
            switch (i){
                case 0 : sum+=array[i]*((array[4]*array[8])-(array[5]*array[7]));break;
                case 1: sum+=array[i]*((array[3]*array[8])-(array[5]*array[6]));break;
                case 2: sum+=array[i]*((array[3]*array[7])-(array[4]*array[6]));break;
            }
        } 
        return sum;
    }else{
        $("#answer").text("We yet dont have a way to calculate that :P");
        return;
    }
    

}else{
    $("#answer").text("Only Square Matrices have determinants");
    return;   
}
}