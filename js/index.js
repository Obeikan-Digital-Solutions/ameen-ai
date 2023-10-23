
let botIsTyping = $('#isBotTyping');

function addMessage(message, sender) {
    let now =  new Date()
    if(sender === 'user') {
        return `
        <div class="float-right">
            <div class="chat-box-wrapper chat-box-wrapper-right">
                <div>
                    <div class="chat-box">
                        ${message}
                    </div>
                    <small class="opacity-6">
                        <i class="fa fa-calendar-alt mr-1"></i>
                        ${now.getHours()}:${now.getMinutes()} | today
                    </small>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
        `
    }else{
        return `
        <div class="chat-box-wrapper">
            <div>
                <div class="avatar-icon-wrapper mr-1">
                    <div class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg"></div>
                    <div class="avatar-icon avatar-icon-lg rounded">
                        <img src="images/avatars/bot.png" alt="">
                    </div>
                </div>
            </div>
            <div>
                <div class="chat-box">
                    ${message}
                </div>
                <small class="opacity-6">
                    <i class="fa fa-calendar-alt mr-1"></i>
                    ${now.getHours()}:${now.getMinutes()}  | today
                </small>
            </div>
        </div>
        `
    }
}

function callAPI(message) {
    typing(true)
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + btoa('JlPjWVHUwVLFUPgWnjrCGMBiF:dd72757e99cde30cf5e1262e4ac6e1255c8122212d7fdee059707298bfe67201')
    }
    fetch('https://dev2.osaned.com:3005/api/ameen-ai/chat', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({question: message})
    })
        .then(res => res.json())
        .then(res => {
            newMessage(addMessage(res.answer.replaceAll('\n','<br>'), 'bot'));
        }).catch(err => {
            console.log(err)
            
        }).finally(() => {
            typing(false)
        })
}
function typing(is) {
    is?botIsTyping.show():botIsTyping.hide()
    $(document).scrollTop($(document).height());
}
function newMessage(message) {  
    botIsTyping.before(message);
    $(document).scrollTop($(document).height());
}

$(document).ready(()=>{
    $('#TooltipDemo').hide();
    botIsTyping.hide()
    newMessage(addMessage(`Hi there!👋, I'm Audit AI🤖 You personal assassinate. <br> how can I help you?`, 'bot'))
    let chatWarpper = $('.chat-wrapper');
    $('input').keypress(function(event) {
        if (event.keyCode === 13) {
          let message = $(this).val();
          $(this).val('');
          newMessage(addMessage(message, 'user'))
          callAPI(message)
        }
      });
})

