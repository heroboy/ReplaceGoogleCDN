var Cc = Components.classes;
var Ci = Components.interfaces;

var host_changes = {
	//"ajax.googleapis.com":"ajax.lug.ustc.edu.cn",
	//"fonts.googleapis.com":"fonts.lug.ustc.edu.cn",
	"ajax.googleapis.com":"ajax.weirui.org",
	"fonts.googleapis.com":"fonts.weirui.org",
	"themes.googleusercontent.com":"google-themes.lug.ustc.edu.cn"
};

var http_obs = {
	observe: function(subject,topic,data){
		var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
		var uri = httpChannel.URI;
		var oldhost = uri.host.toLowerCase();
		if (oldhost in host_changes)
		{
			var new_uri = uri.clone();
			new_uri.host = host_changes[oldhost];
			//ref: http://stackoverflow.com/questions/24947233/use-http-on-modify-request-to-redirect-url-firefox-add-on
			httpChannel.redirectTo(new_uri);
			console.log("uri change from " + uri.spec + " to " + new_uri.spec);
		}
	}
};

function startup(data, reason) {
    var observerService = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
	observerService.addObserver(http_obs, "http-on-modify-request", false);
}
function shutdown(data, reason) {
    var observerService = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
	observerService.removeObserver(http_obs, "http-on-modify-request");
}
function install(data, reason) {
    
}
function uninstall(data, reason) {
   
}