import View from './view'
import $ from 'jquery'
import Player from './player'
import bacon from 'baconjs'

export default class FileView extends View{
	constructor(options){
		this.template = $('#file-tmpl').html();
		this.el = $('#files');
		this.model ;
		this.player = new Player();
    	this.init();
		super(options);
	}
	init(){
		this.el.asEventStream('click','li')
			.map(event => event.currentTarget)
			.onValue(target => this.playSong(target));
		this.player.render();
  	}
  	playSong(target){
  		this.model.files.map(file => {
  			file.playing=false;
  			return file;
  		})
  		.filter(file => target.dataset.path == file.fileInfo.filePath)
  		.map(file => {
  			file.playing=true
  			this.player.load(file);
  		});
  		this.render();

  	}
  	setSongImage(image){

  	}
}