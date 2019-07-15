$(function(){
  function buildHTML(message){
    image =  message.image ? `<img class= "lower-message__image" src=${message.image} >` : "";
      var html = 
  `<div class= "message" data-message-id=${message.id}>
    <div class="upper-message">
      <div class="upper-message__user-name">
            ${message.name}
      </div>
    <div class="upper-message__date">
      ${message.created_at}
    </div>
    </div>
    <div class="lower-message">
      <p class="lower-message__content">
        ${message.content}
      </p>
      ${image}
    </div>
  </div> `
    return html;
  }
  


  function ScrollToNewMessage(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fasts');
  }
  

  $('#new_message').on('submit', function(e) {  //#new_messageは、formタグにつけたid。formがsubmitされた際、以下が行われる。
    e.preventDefault();     // 非同期通信でメッセージの投稿を行いたいため、通常の動作を停止。/ 通常の動作： submit押される→create controllerでformの内容をDB保存→viewにredirect
    var formData = new FormData(this);
  // ① new FormData()でFormDataオブジェクトを新規に作成。引数にフォームの情報を入れられる。
  // ② (this)イベントを発火させた要素、つまり#new_message、すなわちフォームのこと。
  // ③ Mapオブジェクト:Viewから取得したformのデータは、Mapオブジェクトになっている。
  // 「キーと値のペアのコレクション」とのことらしい。配列の中にkeyと値のペアがいくつか入ったオブジェクト、と言うふうにとりあえずようわからん。
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      // URLを定義ルーティングみたいなもん
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(messages) {
      var html = buildHTML(messages);
      $('.messages').append(html);
      ScrollToNewMessage();
      $('#new_message')[0].reset();
      $('.form__submit').attr('disabled', false);


    })
    .fail(function() {
      alert('error');
      // ajaxミスったらアラート。
    });
  });

  var reloadMessages = function() {
    var last_message_id = $(".message:last").data("message-id")
    
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    
    .done(function(messages) {
      messages.forEach(function( message ){
        var html = message ? buildHTML(message) : ``;
        $('.messages').append(html)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 500)
      });
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 5000);  
});



