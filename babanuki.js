$(document).ready(function(){

  var handcard = new Array();
  for(var i=0; i<4; i++) {
    handcard[i] = new Array();
  }


  <!-- 開始ボタン押し -->
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

    <!-- 手札にカードを分ける -->
    var idx = Math.floor( Math.random() * 4);
    for(var i=0; i<53; i++){
      handcard[idx].push(deck[i]);
      idx++;
      if(idx==4)idx=0;
    }

    <!-- 同じ数値のカードを捨てる -->
    for(var i=0; i<4; i++){
      cardChk(i);
    }
    
    alert(handcard[0]);
    //$("#card01").css("position", "absolute");
    //$("#card01").css("left", "inhert");
    //$("#card01").css("top", "inhert");
    $("#card01").css("clip","rect(75px 51px 151px 0px)");

  });

  <!-- 同じ数値のカードを確認する。 -->
  <!-- 同じ数値のカードは、-1にする。 -->
  function cardChk(idx){
    var arr = handcard[idx];
    var num = arr.length;
    for( var i=0; i<num-1; i++ ){
      if( arr[i]!=-1 && arr[i] != 52){
        for( var j=i+1; j<num; j++){
          if( arr[j]!=-1 && arr[i] != 52){
            if( arr[i]%13 == arr[j]%13 ){
              arr[i] = -1;
              arr[j] = -1;
              break;
            }
          }
        }
      }
    }
    cardSride(idx);
  }

  <!-- 手札を配列の左に詰める -->
  function cardSride(idx){
    var tmpArr = new Array();
    var arr = handcard[idx];
    var num = arr.length;
    var tmpIdx = 0;
    for( var i=0; i<num; i++){
      if( arr[i] != -1){
        tmpArr[tmpIdx] = arr[i];
        tmpIdx++;
      }
    }
    handcard[idx] = tmpArr;
  }
});
