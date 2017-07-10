//import draggable from 'vuedraggable';
Vue.http.interceptors.push(function (request, next) {
	request.headers.set('X-CSRF-TOKEN',  window.Adonis);
    next();
});

new Vue({
  el: '#admincatalogo',
	delimiters: ['?%', '%?'],
  data: {
		images: [],
		adonisobject: {},
		token: window.Adonis
  },
  mounted: function () {
     // make sure you have vue-resource inlcued in your html head
		that = this
		this.$http.get("/api/experto/catalogo/"+type_+"/"+id_).then(response => {
			that.adonisobject = response.data
			console.log(response.data)
			that.adonisobject.contenido.forEach((a, index) => {
				a.imgurl = "/content/"+a.cuerpo
				a.select = false
				a.key = index
				that.images.push(a)
			})
		}, response => {
			console.log("error")
			// error callback
		});
  },
  methods:{
		toggleClick: function (event) {
			console.log(event);
		},
		changeView: function (type) {
			that = this
			console.log("/api/experto/catalogo/"+type+"/"+id_)
			this.$http.get("/api/experto/catalogo/"+type+"/"+id_).then(response => {
				that.adonisobject = response.data
				console.log(response.data)
				that.images = []
				that.adonisobject.contenido.forEach((a, index) => {
					a.imgurl = "/content/"+a.cuerpo
					a.select = false
					a.key = index
					that.images.push(a)
				})
			}, response => {
				console.log("error")
				// error callback
			});
		},
		changeSelect: function(item){
			item.select = !item.select
			console.log(item.select)
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
		}
  }
})

