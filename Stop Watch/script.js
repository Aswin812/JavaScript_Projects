
var count1=0;
var count2=0;
var count3=0;

var first;
var second;
var misec;


function start(){

    function min(){
        let a=document.querySelector('#min');
    
        a.innerHTML=count1+1;
        count1++;

        if(count1>59){
            count1=0;
        }
        
    }

        minute=setInterval(min,60000);

    function sec(){
        let b=document.querySelector('#sec');
    
        b.innerHTML=count2+1;
        count2++;

        if(count2>59){
            count2=0;
        }
    }

        second=setInterval(sec,1000);

    function ms(){
        let b=document.querySelector('#ms');

        b.innerHTML=count3+1;
        count3++;
        
        if(count3>=100){
            count3=0;
        }
    }

        misec=setInterval(ms,10);

}



function stop(){
    clearInterval(minute);
    clearInterval(second);
    clearInterval(misec);
}

function reset(){
    count1=0;
    count2=0;
    count3=0;
    
    clearInterval(minute);
    clearInterval(second);
    clearInterval(misec);

    document.getElementById("min").innerHTML="00";
    document.getElementById("sec").innerHTML="00";
    document.getElementById("ms").innerHTML="00";
}





