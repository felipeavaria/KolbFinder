var router = new VueRouter({
		mode: 'history',
		routes: []

});
//import draggable from 'vuedraggable';
Vue.http.interceptors.push(function (request, next) {
  //	request.method = 'POST';
	request.headers.set('X-CSRF-TOKEN',  window.Adonis);
    next();
});

var app2 = new Vue({
	router,
  el: '#contentview',
  data: {
		images: [],
		nombrecatalogo: '',
		categoriacatalogo: '',
		token: window.Adonis
  },
  mounted: function () {
     // make sure you have vue-resource inlcued in your html head
	that = this

	var id = this.$route.query.id

	this.$http.get("/calificador/catalogo/api/"+id).then(response => {
	  // get body data
	  response.data.forEach(function(value, index){
		that.images.push({
		  	key: index,
			select: false,
		  	src: "/content/"+value.cuerpo,
				id: value.id
		})
	  });
	}, response => {
	  console.log("error")
	  // error callback
	});

  },
  methods:{
	toggleClick: function (event) {
	},
	sendcontent: function(event){
	  //https://laracasts.com/discuss/channels/vue/sending-values-with-vue-resource?page=1
	  //this.$http.post('/someUrl', [data], [options]).then(successCallback, errorCallback);
		
	  this.$http.post("/enviarcalificacion", this.images)
		.then(response => {
			window.location.href = '/calificador';
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
