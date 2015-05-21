import $ from 'jquery'
import View from './view'
export default class Player extends View{

	constructor(options){
		this.el = $('#player-pane');
		this.playingImage = $('#playing-image');
		this.template = $("#player-tmpl").html();
		this.model = {playing:false,file:{}};
		super(options);
	}

	load(file){
		this.model.playing = true;
		this.model.file = file;
		this.render();
	}
	render(){
		super.render();
	}

}