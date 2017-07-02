$(document).ready(function(){

  var handcard = new Array();
  for(var i=0; i<4; i++) {
    handcard[i] = new Array();
  }

  var turnPlayer;


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

    <!-- 最初のプレイヤーをランダムで決める -->
    turnPlayer = Math.floor( Math.random() * 4);

    <!-- 手札にカードを分ける -->
    idx = turnPlayer;
    for(var i=0; i<53; i++){
      handcard[idx].push(deck[i]);
      idx++;
      if(idx==4)idx=0;
    }

    <!-- 同じ数値のカードを捨てる -->
    for(var i=0; i<4; i++){
      cardChk(i);
    }

    <!-- プレイヤーのカードを表示する -->
    for(var i=0; i<handcard[0].length; i++){
      if (handcard[0][i]!=52){
        display(i,0,handcard[0][i]);
      } else{
        displayJoker(i,0,handcard[0][i]);
      }
    }

    <!-- コンピューターのカードを表示する -->
    for(var j=1; j<4; j++){
      for(var i=0; i<handcard[j].length; i++){
        displayBack(i,j,handcard[j][i]);
      }
    }

    exeNextPlayer();
  });

  <!-- 次のプレイヤーの処理をする -->
  function exeNextPlayer(){
    if (turnPlayer == 0){
      displayMessage("コンピューター1からカードを取ってください。");
    }else{
      displayMessage("コンピューター"+ (turnPlayer) +"がカードを取ります。");
      setTimeout(function(){getCardComputer();}, 1000);
    }
  }

  <!-- コンピューターがカードを取る -->
　function getCardComputer(){

    displayMessage("コンピューター"+ (turnPlayer) +"がカードを捨てます。");
    setTimeout(function(){throwCardComputer();}, 1000);
  }

  <!-- コンピューターがカードを捨てる -->
　function throwCardComputer(){

    turnPlayer++;
    if(turnPlayer==4){turnPlayer=0;}
    exeNextPlayer();
  }


  <!-- 同じ数値のカードを確認する。 -->
  <!-- 同じ数値のカードは、-1にする。 -->
  function cardChk(idx){
    var arr = handcard[idx];
    var num = arr.length;
    for( var i=0; i<num-1; i++ ){
      if( arr[i]!=-1 && arr[i] != 52){
        for( var j=i+1; j<num; j++){
          if( arr[j]!=-1 && arr[j] != 52){
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

  <!-- 指定位置のカードを非表示にする -->
  function nodisplay(x, y){
    var posStr = '#card' + y + x;
    $(posStr).css("visibility","hidden");
  }

  <!-- 指定位置のカードを指定番号で表示する -->
  function display(x, y, num){
    var posStr = '#card' + y + x;
    var left;
    var top;
    var rect;

    if (num%13 <= 6){
      left = 200 + x*50 - Math.floor(num/13)*50;
      top = 150 + y*100 - num%13*75;
      rect = 'rect(' + ((num%13)*75) + 'px ' + (((Math.floor(num/13)+1)*50)+1) + 'px ' + ((num%13+1)*75+1) + 'px ' + (Math.floor(num/13)*50) + 'px)';
    }else{
      left = 200 + x*50 - Math.floor(num/13)*50 - 200;
      top = 150 + y*100 - (num%13-7)*75;
      rect = 'rect(' + ((num%13-7)*75) + 'px ' + ((Math.floor(num/13)+1)*50+200) + 'px ' + ((num%13-6)*75+1) + 'px ' + (Math.floor(num/13)*50+200) + 'px)';
    }
    $(posStr).css("left", left);
    $(posStr).css("top", top);
    $(posStr).css("clip", rect);
    $(posStr).css("visibility","visible");
  }

  <!-- 指定位置にジョーカーを表示する -->
  function displayJoker( x, y ){
    var posStr = '#card' + y + x;
    var left = x*50;
    var top = y*100 - 300;
    var rect = 'rect( 450px 251px 526px 200px)';
    $(posStr).css("left", left);
    $(posStr).css("top", top);
    $(posStr).css("clip", rect);
    $(posStr).css("visibility","visible");
  }

  <!-- 指定位置に裏を表示する -->
  function displayBack( x, y ){
    var posStr = '#card' + y + x;
    var left = x*50 - 100;
    var top = y*100 - 300;
    var rect = 'rect( 450px 351px 526px 300px)';
    $(posStr).css("left", left);
    $(posStr).css("top", top);
    $(posStr).css("clip", rect);
    $(posStr).css("visibility","visible");
  }

  <!-- メッセージを表示する -->
  function displayMessage(str){
    $("#message").text(str);
  }
});
