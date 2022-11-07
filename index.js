let canvas= document.querySelector("canvas");
let dasht=[];
let box=30;
let detalmaxlength=4;
let detal=new Detal();
let temp=[];
for(let i=0;i<detal.length;i++){
  temp[i]={...detal[i]};
}

canvas.width=10*box;
canvas.height=20*box;

let context=canvas.getContext("2d");




// function constructor start

function Detal(){
  let detallength=randoom(detalmaxlength);
  let detalarr=new Array();
  let uxxutyun=["down","left","right"];
  let tempuxxi="";

  detalarr[0]={
    x: 5*box,
    y: 0,
  }

  let kubtemp={
    x:  5*box,
    y:  0,
  }
  function randoom(number){
    return 1+Math.floor(Math.random()*number);
  }
  
  function uxxutyunf(){
    return uxxutyun;
  }
  function uxxutyunzero(){
    uxxutyun[0]="down";
    uxxutyun[1]="left";
    uxxutyun[2]="right";
  }
  
  function randoomuxxi(){
   
    let temparr=uxxutyun.filter(item => item != tempuxxi)
    uxxutyun.splice(0,uxxutyun.length);
    temparr.forEach((Element) => {uxxutyun.push(Element)});
    temparr.splice(0,temparr.length);
    let k=randoom(uxxutyunf().length)-1;
    let randoomuxxutyun=uxxutyun[k];
    uxxutyunzero();
    switch(randoomuxxutyun){
      case "left":
        kubtemp.x=kubtemp.x-box;
        tempuxxi="right";
        break;
        case "right":
          kubtemp.x=kubtemp.x+box;
          tempuxxi="left";
          break;
          case "down":
            kubtemp.y=kubtemp.y+box;
            tempuxxi="";
            break;
      
    }
      detalarr.push({...kubtemp});
    
    
    }
  
 
  for(let i=0;i<detallength-1;i++){
    randoomuxxi();
  }
  return detalarr;
}
// function constructor end


function goleft(){
  if(leftrightcheck("left")){
    return;
  }
  for(let i=0;i<detal.length;i++){
    if(detal[i].x==0){
      return;
    }
  }

  for(let i=0;i<detal.length;i++){
    context.clearRect(temp[i].x,temp[i].y,box,box);
    temp[i].x=detal[i].x;
    temp[i].y=detal[i].y;
    context.clearRect(temp[i].x,temp[i].y,box,box);
    detal[i].x=detal[i].x-box;
  }
}

function goright(){
  if(leftrightcheck("right")){
    return;
  }
  for(let i=0;i<detal.length;i++){
    if(detal[i].x==canvas.width-box){
      return;
    }
  }
  for(let i=0;i<detal.length;i++){
    context.clearRect(temp[i].x,temp[i].y,box,box);
    temp[i].x=detal[i].x;
    temp[i].y=detal[i].y;
    context.clearRect(temp[i].x,temp[i].y,box,box);
    detal[i].x=detal[i].x+box;
  }
}
function leftrightcheck(knopka){
  let delta;
  switch(knopka){
    case "left":
      delta=-box;
      break;
      case "right":
        delta=box;
        break;
  }
  let tempuxxutyun=[];
  for(let i=0;i<detal.length;i++){
    tempuxxutyun[i]=new Object;
    tempuxxutyun[i].y=detal[i].y;
    tempuxxutyun[i].x=detal[i].x+delta;
    for(let j=0;j<dasht.length;j++){
      if(JSON.stringify(dasht[j])==JSON.stringify(tempuxxutyun[i])){
        
        return true;
    }
  }
  

  }
return false;
}
function godown(){
  
  
  for (let i=0;i<detal.length;i++){
    
    temp[i].x=detal[i].x;
    temp[i].y=detal[i].y;
    detal[i].y=detal[i].y+box;
  }
  if(downline()>=upline()){
  if(check()||downline()==canvas.height){
    for(let i=0;i<temp.length;i++){
      context.clearRect(temp[i].x,temp[i].y,box,box);
    }

    reload();
  }
}
}

function check(){
  for(let i=0;i<detal.length;i++){
  for(let j=0;j<dasht.length;j++){
    if(JSON.stringify(dasht[j])==JSON.stringify(next()[i])){
      return true;
    }
  }
  }
  return false;
}

function reload(){
  for(let i=0;i<detal.length;i++){
    dasht.push({...detal[i]})};
  
    detal=new Detal();
    temp.splice(0,temp.length);
    for(let i=0;i<detal.length;i++){
      temp[i]={...detal[i]};
    }
    // detalstarting();
    for(let i=0;i<dasht.length;i++){
      context.fillRect(dasht[i].x,dasht[i].y,box,box);
    }
    
    
}
// function turn(){

// }
 function next(){
 let temparr=[];
 for (let i=0;i<detal.length;i++){
  temparr.push({
   x: detal[i].x,
   y: detal[i].y+box,
  })
 }
  return temparr;
 }
function downline(){
  
let temparr=detal.map(item=>item.y+box);
return Math.max(...temparr);
}

function upline(){
  let temparr=dasht.map(item=>item.y);
  return(Math.min(canvas.height,...temparr));
}





function detaldown(){
  // if(check()){
  //   return;
  // }
  if(downline()<=canvas.height){
  
  setTimeout(function(){
    // context.clearRect(0,0,canvas.width,canvas.height);
    // console.log(...temp,...detal);
    for(let i=0;i<detal.length;i++){
   context.clearRect(temp[i].x,temp[i].y,box,box);
    }
    for(let i=0;i<detal.length;i++){
      
      context.fillRect(detal[i].x,detal[i].y,box,box);
    } 
    
    
  
    godown();
    detaldown();
    }
  
  , 500);
  }
//   else{
//     reload();
// }
}


function detalstarting(){
  

  for(let i=0;i<detal.length;i++){
      
    context.fillRect(detal[i].x,detal[i].y,box,box);
  } 

 

detaldown();
}
 document.addEventListener("keydown",function(evt){
    if(evt.code==="ArrowRight"){
      goright();
    }
    if(evt.code==="ArrowLeft"){
      goleft();
    }
    if(evt.code==="ArrowDown"){
      
      for(let i=0;i<detal.length;i++){
        context.clearRect(detal[i].x,detal[i].y,box,box);
      }
      
    }
  });

console.log(detal);
detalstarting(detal);

