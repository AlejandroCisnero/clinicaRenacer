'use strict'
/*let tooltip: tooltip = new Tooltip({
  content:'El usuario que usted introduzca delimitará su control sobre los datos'
});
tooltip.appendTo(querySelector('#emailHelp'));*/

$("form[name='pacienteAdd']").submit(function(e){
  e.preventDefault();
  e.stopImmediatePropagation();
  var inputIde=document.querySelector("input[name='userIde']").value;
  inputFinal=inputIde.replace("-","");
  inputFinal=inputFinal.replace("-","");
  document.querySelector("input[name='userIde']").value=inputFinal;
  console.log(inputFinal);
  $.post($(this).attr("action"),function(res){
    document.write(res);
  });
});
function birth(){
  var inputIde=document.querySelector("input[name='userIde']").addEventListener("change",autocomplete,false);
  var inputIde=document.querySelector("input[name='userIde']").addEventListener("keyup",guiones,true);
}
function guiones(e){
  var inputIde=document.querySelector("input[name='userIde']").value;
  console.log(e.key);
  if (inputIde.length==3){
    if (e.key=="Backspace") {

    }else{
      console.log("longitud 3");
      document.querySelector("input[name='userIde']").value=inputIde.concat("-");
    }
  } else if(inputIde.length==10){
    if (e.key=="Backspace") {

    }else{
      console.log("longitud 10");
      document.querySelector("input[name='userIde']").value=inputIde.concat("-");
    }
  }
}
function autocomplete(e){
  var inputIde=document.querySelector("input[name='userIde']");
  let inputBirth=document.querySelector("input[name='userBirth']");
  let birth=inputIde.value;
  let day=birth.substring(4,6);
  let mouth=birth.substring(6,8);
  let year=birth.substring(8,10);
  birth=year.concat("-");
  birth=birth.concat(mouth);
  birth=birth.concat("-");
  birth=birth.concat(day);
  if(year>=00 && year<=20){
    birth=birth.replace(""+year, "20"+year);
  }else{
    birth=birth.replace(""+year, "19"+year);
  }
  inputBirth.value=birth;
}
birth();
