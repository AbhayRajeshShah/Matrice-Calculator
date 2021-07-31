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
            if(operand1.length==operand2.length&&row1==row2&&col1==col2){
                task(operand1,operand2,result);
                endResult(result);
            }else{
                $("#answer").text("Matrices need to have the same number of rows and columns as well as equal elements");
            };break;
        case multiply: if(operand1.length!=row1*col1||operand2.length!=row2*col2){
            $("#answer").text("The Rows and columns specified do not equal the element.Recheck your input");
        }else{
           
            result = multiply(operand1,operand2,row1,col1,row2,col2);
            endResult(result);
        };break;
        case multiplyReverse: if(operand1.length!=row1*col1||operand2.length!=row2*col2){
            $("#answer").text("The Rows and columns specified do not equal the element.Recheck your input");
        }else{
            result = multiply(operand2,operand1,row2,col2,row1,col1);
            endResult(result);
        };break;
        case determinant : 
        var deter = determinant(operand1,col1,row1);
        $("#answer").text(deter);break;
        case determinantB : 
        var deter = determinant(operand2,col2,row2);
        $("#answer").text(deter);break;
        case cofactor:
             result = cofactor(operand1,row1,col1);
             endResult(result);break;
        case transpose :
            result = transpose(operand1,row1,col1);
            endResult(result);
           break;
        case adjacent:
        result = adjacent(operand1,row1,col1);
        endResult(result);break;
        case inverse:
        inverse(operand1,row1,col1);break;
        case naturalMultiply:
            if(operand2.length!=1){
                $("#answer").text("Please enter the number to multiply under the 2nd input")
            }else{
                result = naturalMultiply();
                endResult(result);
            }
        break;

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
$("#cofactor").click(()=>task=cofactor);
$("#transpose").click(()=>task=transpose);
$("#adjacent").click(()=>task=adjacent);
$("#inverse").click(()=>task=inverse);
$("#n").click(()=>task=naturalMultiply);
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
function multiply(array1,array2,arow1,acol1,arow2,acol2){
    var element = 0;
    var elements = [];
    console.log(acol1+""+arow2)
if(acol1==arow2){
for(var k=0;k<arow1;k++){
    for(var j=0;j<acol2;j++){
        for(var i=0;i<acol1;i++){
            element= array1[i+(k*acol1)] * array2[i*acol2+j] +element;
            if(i==acol1-1){
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

//determinant
function determinant(array,col,row){
    var sum=0;
if(array.length==row*col){
    if(col==row){
        if(row==1){
            sum=array[0];
            return sum;
        }
        else if(row==2){
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
}else{
    $("#answer").text("The Rows and columns specified do not equal the element.Recheck your input");
}

}

//cofactor
function cofactor(array,row,col){
    var elements = array;
    if(col==row){
        if(col==3){
            
            var finalArray=[];
            for(var j=0;j<row;j++){
                for(var k=0;k<col;k++){
                    elements=[]
                    var indexes=[];
                    for(var i=0;i<col;i++){
                    
                        if(i!=0||j!=0){
                            indexes.push(k+(col*i));
                            
                        }
                        indexes.push(i+(j*col));
                    }
                    indexes.sort(function(a, b){return b-a});
                    for(var l =0;l<indexes.length;l++){
                        if(indexes[l]==indexes[l+1]){
                            indexes.splice(l,1);
                        }
                    }
                    array.forEach(el=>{elements.push(el)})
                    console.log(indexes);
                    indexes.forEach(index=>{ elements.splice(index,1);});
                    
                    var sum = elements[0]*elements[3]-(elements[1]*elements[2]);
                    finalArray.push(sum);
                   
                }
                
            }
            for(var m=0;m<finalArray.length;m++){
                if(m%2==1){
                    finalArray[m] = -1*finalArray[m];
                }
            }
            return finalArray;
        }else if(col==2){
            elements=[];
            for(var o=3;o>-1;o--){
                elements.push(array[o]);
            }
            elements[1]=-1*elements[1]
            elements[2]=-1*elements[2];
            return elements;
        }else if(col==1){
            return elements;
        }else{
            $("#answer").text("We yet dont have a way to calculate that :P");
        }
    }else{
        $("#answer").text("Only Square Matrices have cofactors");
    }
    
    
}

//transpose
function transpose(array,row,col){
    var transposed = [];
    for(var j=0;j<col;j++){
    for(var i=0;i<row;i++){
        
            transposed.push(array[j+(i*col)])
        
    }
}
    console.log(transposed);
    return transposed;
}

//endResult
function endResult(array){
    var stringResult = "[ "
    array.forEach(summ=>{stringResult=stringResult +summ + " "})
    $("#answer").text(stringResult+"]");
}

//adj a
function adjacent(array1,row,col){
    var smh = cofactor(array1,row,col);
    return transpose(smh,row,col);
}


//inverse
function inverse(array,row,col){
    var deter = determinant(array,col,row);
    var matrix = adjacent(array,row,col);
    var string = "1/"+deter +" [ ";
    matrix.forEach(element=>{string+=element+" "});
    $("#answer").text(string+" ]");
}

function naturalMultiply(){
    for(var i=0;i<operand1.length;i++){
        operand1[i] = operand1[i]*operand2[0];
    }
    return operand1;

}