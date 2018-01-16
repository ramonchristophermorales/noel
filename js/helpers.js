
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
	},

	/**
	 * return epoch date time
	 * e.g. 2018-01-22 15:33:02
	 * 
	 * @return {string}
	 */
	epochDateTime: function() {

		var date = new Date();

		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();

		if ( parseInt(seconds) < 10 && seconds.length == 1 )
			seconds = "0" + seconds;

		return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
	}

}
