window.onload = function(){
  let list = document.getElementById('txt-content'),
      input = document.getElementById('txt-input'),
      btn = document.getElementById('txt-btn');
  function send(){
    let val = input.value;
    if(val){
      socket.emit('message',val);
    }else{
      alert('输入内容不能为空')
    }
  }
  btn.onclick = send;

  let socket = io();
    socket.on('connect',() => {
    console.log('我是客户端，我链接成功了！！！！！')
  })

  socket.on('message',data => {
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
        <p style="color: #ccc;">
            <span class="user">${data.user}</span>
            ${data.createAt}
        </p>
        <p class="content">${data.content}</p>`;
      // 将li添加到list列表中
    list.appendChild(li);
      // 将聊天区域的滚动条设置到最新内容的位置
    list.scrollTop = list.scrollHeight;
  })


}



