$(function(){
  function buildHTML(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class= "message">
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

$('#new_message').on('submit', function(e) {
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');
  console.log(url)
  console.log(formData)
  $.ajax({
    type: 'POST',
    url: url,
    // ルーティングと同じ
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false,
  })
  .done(function(messages) {
    console.log(messages)
    var html = buildHTML(messages);
    $('.messages').append(html);
    ScrollToNewMessage();
    $('.form__message').val('');
    $('.form__submit').attr('disabled', false);
    $('.hidden').val('');

  })
  .fail(function() {
    alert('error');
  });
});
});

