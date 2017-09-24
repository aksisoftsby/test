var push_android = function (e) {
  console.log('push_android() - connection established...');
  switch (e.event) {
    case 'registered':
      if (e.regid.length > 0) {
        // navigator.notification.alert("Regid " + e.regid);
        console.log(e);
        console.log(e.regid);
      }
      break;
    case 'message':
      console.log(e);
      console.log(e.payload.title);
      console.log(e.payload.id);
      console.log(e.payload.type);
      window.location = "#/home/" + e.payload.type + "/" + e.payload.id;
      break;
    case 'error':
      console.log("notificaton error");
      console.log(e.msg);
      break;
    default:
      navigator.notification.alert('An unknown GCM event has occurred');
      break;
  }
};

console.log("load func");
/**
 promise.get(kpubj_url_database)
 .then(function (error, text, xhr) {
 if (error) {
 console.log("error " + xhr.status);
 } else {
 data = JSON.parse(text);
 console.log(data);
 database_url = data;
 // click home
 page_Home();
 }
 });
 **/
jQuery.get(kpubj_url_database, function (text) {
  data = JSON.parse(text);
  console.log(data);
  database_url = data;
  // click home
  page_Home();
})
  .fail(function () {
    alert("Internet error");
  })
  .always(function () {
    // alert("finished");
  });