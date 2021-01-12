export default function evaluate(str){
    console.log("Str "+str);
    let tokens=convertStringToArr(str);
    let operands=[];
    let operators=[];
    for(let i=0;i<tokens.length;i++){
        let ch=tokens[i];
        if(/\d/g.test(ch)){
            operands.push(ch);
        }
        else{
            if(operators.length==0){
                operators.push(ch);
            }
            else{
                while((getPrecedence(ch)<=getPrecedence(operators[operators.length-1]))&&operators.length>0){
                    let op=operators.pop();
                    let ch2=operands.pop();
                    let ch1=operands.pop();
                    console.log(operators);
                    operands.push(calculate(ch1,ch2,op));                    
                }

                operators.push(ch);
            }
        }
    }

    console.log(operands+'--'+operators)
    while(operators.length){
        console.log(operands)
        let op=operators.pop();
        let ch2 = parseFloat(operands.pop());
        let ch1 = parseFloat(operands.pop());
        operands.push(calculate(ch1, ch2, op));
    }
    console.log(operands);
    return operands.pop();
}

function convertStringToArr(str){
    let arr=[];
    for(let i=0;i<str.length;i++){
        
        if(/^[+\-*\/]$/g.test(str.charAt(i))){
            
            arr.push(str.charAt(i));
        }
        else{
            if(i>0&&(/[\d\.]/g.test(arr[arr.length-1]))&&(/[\d\.]/g.test(str.charAt(i)))){
                arr[arr.length-1]=arr[arr.length-1]+str.charAt(i);
            }
            else if((arr[arr.length-1]=='-')&&(/[+\-*\/]/g.test(arr[arr.length-2]))){
                arr[arr.length - 1] = arr[arr.length - 1] + str.charAt(i);
            }
            else{
                arr.push(str.charAt(i));
            }
        }
    }
    return arr;
}
function calculate(op1,op2,op){
    // console.log(op1+"   "+op2+"  "+op);
    if(op=='+'){
        return (+op1)+ (+op2);
    }
    else if(op=='-'){
        return op1-op2;
    }
    else if(op=='*'){
        return op1*op2;

    }
    else if(op=='/'){
        return op1/op2;
    }
}
function getPrecedence(op){
    if(op=='*'||op=='/'){
        return 2;
    }
    else if(op=='+'||op=='-'){
        return 1;
    }
}
// console.log(convertStringToArr("12+13+14+1111"));
// evaluate('111+2+3*4+5*6')