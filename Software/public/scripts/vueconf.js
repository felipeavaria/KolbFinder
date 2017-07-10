//import draggable from 'vuedraggable';
Vue.http.interceptors.push(function (request, next) {
  //	request.method = 'POST';
	request.headers.set('X-CSRF-TOKEN',  window.Adonis);
    next();
});
var app = new Vue({
  el: '#imgcliente',
  data: {
	message: 'Hello Vue!',
	images: [],
	nombrecatalogo: '',
	categoriacatalogo: '',
	token: window.Adonis
  },
  mounted: function () {
     // make sure you have vue-resource inlcued in your html head
	that = this
	this.$http.get("image").then(response => {
	  // get body data
	  response.data.data.forEach(function(value, index){
			that.images.push({
				key: index,
				select: false,
				src: value
			})
	  });
	}, response => {
	  console.log("error")
	  // error callback
	});

  },
  methods:{
	toggleClick: function (event) {
	  console.log(event);
	},
	sendcontent: function(event){
	  //https://laracasts.com/discuss/channels/vue/sending-values-with-vue-resource?page=1
	  //this.$http.post('/someUrl', [data], [options]).then(successCallback, errorCallback);
		
	  this.$http.post("sendcontent", {nombre: this.nombrecatalogo, contenido: this.images})
		.then(response => {
			window.location.href = 'experto';
	  }, response => {
	  	console.log("error")
	  })
	},
    greet: function (event) {
      // `this` inside methods point to the Vue instance
      alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
      alert(event.target.tagName)
    }
  }
})
