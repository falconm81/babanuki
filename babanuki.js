$(document).ready(function(){
  var $handcard = [];
  
  <!-- 山札 -->
  $("#start").on("click", function(){
    <!-- 山札 -->
    var deck = [];

    <!-- 山札にカードをセット -->
    for(var i=0; i<53; i++) {
      deck[i] = i;
    }

    <!-- 山札シャッフル -->
    for(var i=0; i<150; i++) {
      var tmp;
      var rand1 = Math.floor( Math.random() * 53);
      var rand2 = Math.floor( Math.random() * 53);

      tmp = deck[rand1];
      deck[rand1] = deck[rand2];
      deck[rand2] = tmp
    }

  });
});
