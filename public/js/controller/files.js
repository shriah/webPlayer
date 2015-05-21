import FileService from '../service/files'
import FileView from '../view/files'


export default class File{
	constructor(){
		var fileView = new FileView();
		var fileService = new FileService();
		fileService.getFiles('/Users/harishg/personal/music/').then(function(result){
			fileView.setModel({files:result});
			fileView.render();
		});
	}
}
