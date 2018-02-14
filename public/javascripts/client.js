console.log('out js ok');
$(document).ready(function(){
 console.log('js ok');
  $('#update').on('click', function(){
    console.log('update!');
    updateData();
  });

  $('#button-add').click(function(){
    addData();
    return false;  
  });

  $(document).on('click','[id^=btn-]', function() {
    console.log('click!');
    var id = $(this).attr('id');
    console.log("ID:"+id);
    var id = id.match(/\d*\d/);
    console.log(id[0]);
    changeStatus(id[0]);
  });


});

function updateData(){
  var data = {'status': 'update'};
  $.ajax({
    type: "get",
    url: "/index",
    dataType: "json",
    data: data,
    scriptCharset: "utf-8"
  }).done(function(res, textStatus, xhr){
    console.log(res);
    console.log(textStatus);
    clearDoms();
    createDom(res);
  }).fail(function(xhr, textStatus, errorThrown){
    console.log(errorThrown);
  });
}

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
    clearDoms();
    createDom(res);
  }).fail(function(xhr, textStatus, errorThrown){
    console.log(errorThrown);
  });
}

function createDom(datas){
  for(var i=1; i<datas.length; i++){
    var ul = document.getElementById('list-ul');
    var li = document.createElement('li');
    var btn= document.createElement('button');
    var p = document.createElement('p');
    var data = datas[i];
    li.id = "list-"+data.id;
    btn.id = "btn-"+data.id;
    p.innerHTML = data.text;

    console.log(data.status);
   switch(data.status){
     case "do":
       btn.innerHTML = data.status;
       btn.style.backgroundColor = "#1dcd00";
       break;
     case "done":
       btn.innerHTML = data.status;
       btn.style.backgroundColor = "#dd4b39";
       break;
     case "deleted":
       break;
   }
   
    li.appendChild(btn);
    li.appendChild(p);
    ul.appendChild(li);
  }
 }

 function changeStatus(id){
  var data = {'status': 'change', 'id': id};
  $.ajax({
    type: "get",
    url: "/index",
    dataType: "json",
    data: data,
    scriptCharset: "utf-8"
  }).done(function(res, textStatus, xhr){
    console.log(res);
    console.log(textStatus);
    clearDoms();
    createDom(res);
  }).fail(function(xhr, textStatus, errorThrown){
    console.log(errorThrown);
  });
 }

 function clearDoms(){
  var ul = document.getElementById('list-ul');
  while (ul.firstChild) ul.removeChild(ul.firstChild);
 }