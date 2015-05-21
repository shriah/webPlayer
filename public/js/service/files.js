import $ from 'jquery'

export default class Files {
	constructor(){
		console.log('Create Files');
	}
	getFiles(directory){
		return $.get('http://localhost:3000/files?dir='+directory);
	}
}