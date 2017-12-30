
/**
 * helpers.js
 */

 module.exports = {

	/**
	 * function for getting url parameters by name
	 *
	 * @return null|string
	 */
	urlParam: function(name){
	    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return results[1] || 0;
	    }
	}

}
