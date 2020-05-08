$(function(){
  function buildHTML(message){
    image =  message.image ? `<img class= "lower-message__image" src=${message.image} >` : "";
      var html = 
  `<div class= "message" data-message-id=${message.id}>
    <div class="upper-message">
      <div class="upper-message__user-name">
            ${message.name}
      </div>ø
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
    $.ajax({
      type: 'POST',
      url: url,
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
    })
    .fail(function() {
      alert('error');
    })
    .always(function(){
      $('.form__submit').attr('disabled', false);
    });
  });

  var reloadMessages = function() {

    if (location.href .match(/message/)){
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
  };
  setInterval(reloadMessages, 5000);  
});

