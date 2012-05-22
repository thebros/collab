
(function() {
	
	var jns;
	
	exports.setjns = function(thejns) {
		jns = thejns;
	}
	
	exports.messages = ['basic.identify','basic.dump','basic.status','basic.shutdown'];

	exports.send = function(sender,target,message) {
		
	}
	
	exports.noforeignidpath = function(idpath,ownidpath) {
		if (idpath != ownidpath) {
			throw new Error('Handler for "'+ownidpath+'" does not support messages for subids');
		}
	}
	
})();

