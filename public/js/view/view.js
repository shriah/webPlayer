import _ from 'underscore'

export default class View {
  constructor(options) {
  	if(options){
	    this.model = options.model;
	    this.template = options.template;
	    this.el = options.el;
    }


  }
  setModel(model){
    this.model = model;
  }
  render(){
    var html = _.template(this.template)(this.model);
    this.el.html(html);
  }
}