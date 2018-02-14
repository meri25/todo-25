console.log('out js ok');
$(document).ready(function(){
 console.log('js ok');
  $('#button-add').click(function(){
    addData();
    return false;  
  });

  $(document).on('click','[id^=btn-]', function() {
    console.log('click!');
    var id = $(this).attr('id');
    var id = id.match(/\d*\d/);
    changeStatus(id);
  });
});

function addData(){
  var text = $('input').val();
  var data = {'status': 'add', 'text': text};
  $.ajax({
    type: "get",
    url: "/index",
    dataType: "json",
    data: data,
    scriptCharset: "utf-8"
  }).done(function(res, textStatus, xhr){
    console.log(res);
    console.log(textStatus);
    createDom(res);
  }).fail(function(xhr, textStatus, errorThrown){
    console.log(errorThrown);
  });
}

function createDom(datas){
  for(var i=1; i<datas.length; i++){
    var ui = document.getElementById('list-ui');
    var li = document.createElement('li');
    var btn= document.createElement('button');
    var p = document.createElement('p');
    var data = datas[i];
    li.id = "list-"+data.id;
    btn.id = "btn-"+data.id;
    btn.classList.add('list-btn');
    p.innerHTML = data.text;

 
   switch(data.status){
     case 'do':
       btn.innerHTML = data.status;
       btn.style.backgroundColor = "#1dcd00";
       break;
     case 'done':
       btn.innerHTML = data.status;
       btn.style.backgroundColor = "#dd4b39";
       break;
     case 'deleted':
       break;
   }
   
    li.appendChild(btn);
    li.appendChild(p);
    ui.appendChild(li);
  }
 }

 function changeStatus(id){
  var data = {'status': 'change', 'text': id};
  $.ajax({
    type: "get",
    url: "/index",
    dataType: "json",
    data: data,
    scriptCharset: "utf-8"
  }).done(function(res, textStatus, xhr){
    console.log(res);
    console.log(textStatus);
    createDom(res);
  }).fail(function(xhr, textStatus, errorThrown){
    console.log(errorThrown);
  });
 }