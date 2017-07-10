//import draggable from 'vuedraggable';
Vue.http.interceptors.push(function (request, next) {
	request.headers.set('X-CSRF-TOKEN',  window.Adonis);
    next();
});


Vue.component('that-image', {
  props: ['image', 'index'],
	delimiters: ['?%', '%?'],
  computed: {
  },
  methods: {
    updatePrice: function(value) {
      var price = $.fn.autoUnformat(value, app.usdMask);
      app.$emit('price-'+this.entry.reference, price);
    },
		selectItem: function() {
			this.image.select = !this.image.select
			console.log(this.image)
			console.log("hahaha")
		}
  },
  mounted: function(){
		console.log("Component mounted!")
  },
  template: '\
    <tr>\
      <td>\
				<img v-on:click="selectItem" v-if="image.select" style="float: left; border-style: solid; border-width: 3px; border-color: green; margin: 3px 3px 3px 3px" :src="image.src"></img>\
				<img @click="selectItem" v-else style="float: left; border-style: solid; border-width: 3px; border-color: red; margin: 3px 3px 3px 3px" :src="image.src"></img>\
		</td>\
			<td>\
				<ul>\
					<li>Likes: ?% image.likes %?</li>\
					<li>Dislikes: ?% image.total - image.likes %?</li>\
					<li>Total: ?% image.total %?</li>\
				</ul>\
			</td>\
    </tr>',
});


new Vue({
  el: '#admincatalogo',
	delimiters: ['?%', '%?'],
  data: {
		images: [],
		currimages: [],
		adonisobject: {},
		token: window.Adonis
  },
  mounted: function () {
     // make sure you have vue-resource inlcued in your html head
		that = this
		this.$http.get("/api/experto/catalogo/"+type_+"/"+id_).then(response => {
			that.adonisobject = response.data
			that.adonisobject.contenido.forEach((a, index) => {
				a.forEach((b, index2) => {
					b.src = "/content/"+b.cuerpo
					b.select = false
					b.key = index2
				})
				that.images.push(a)
			})
			that.currimages = that.images[0]
			console.log(that.images)
			console.log(that.adonisobject)
		}, response => {
			console.log("error")
			// error callback
		});
  },

  methods: {
		toggleClick: function (event) {
			console.log(event);
		},
		changeView: function (type) {
			var that = this
			that.currimages = that.images[type]
			switch(type){
				case 0:
					that.adonisobject.typestring = "Total"
					break
				case 1:
					that.adonisobject.typestring = "Convergente"
					break
				case 2:
					that.adonisobject.typestring = "Divergente"
					break
				case 3:
					that.adonisobject.typestring = "Asimilador"
					break
				case 4:
					that.adonisobject.typestring = "Acomodador"
					break
			}
			console.log(that.currimages)
		},
		/*
		changeView: function (type) {
			that = this
			console.log("/api/experto/catalogo/"+type+"/"+id_)
			this.$http.get("/api/experto/catalogo/"+type+"/"+id_).then(response => {
				that.adonisobject = response.data
				console.log(response.data)
				that.images = []
				that.adonisobject.contenido.forEach((a, index) => {
					a.forEach((b, index2) => {
						b.imgurl = "/content/"+b.cuerpo
						b.select = false
						b.key = index2
					})
					that.images.push(a)
				})
			}, response => {
				console.log("error")
				// error callback
			});
		},
		*/
		changeSelect: function(item){
			item.select = !item.select
			console.log(item.select)
		},
		sendcontent: function(event){
			//https://laracasts.com/discuss/channels/vue/sending-values-with-vue-resource?page=1
			//this.$http.post('/someUrl', [data], [options]).then(successCallback, errorCallback);
			this.$http.post("/api/experto/catalogo", {contenido: this.images})
			.then(response => {
				window.location.href = '/experto';
			}, response => {
				console.log("error")
			})
		},
		deletecatalogo: function(event){
			//https://laracasts.com/discuss/channels/vue/sending-values-with-vue-resource?page=1
			//this.$http.post('/someUrl', [data], [options]).then(successCallback, errorCallback);
			this.$http.post("/api/experto/catalogo", {contenido: this.images})
			.then(response => {
				window.location.href = 'experto';
			}, response => {
				console.log("error")
			})
		}
  }
})

