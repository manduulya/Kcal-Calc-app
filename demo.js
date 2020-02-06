$(document).ready(function(){
    $("button").click(function(){
      var div = $(".notepad");  
      div.animate({top: '100px', opacity: '0.1'}, "slow");
    });
  });