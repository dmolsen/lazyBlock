/*!
 * lazyBlock v1.0
 *
 * Copyright (c) 2012 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 */

// string trim taken from: http://stackoverflow.com/questions/498970/how-do-i-trim-a-string-in-javascript
String.prototype.trim = String.prototype.trim || function trim() { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };

// lazyBlock functions can be accessed via the vars lB or lazyBlock
var lB = lazyBlock = {
	
	getById: function(id) {
		return document.getElementById(id);
	},
	
	bind: function (el, event, fct) {
		this.getById(el).addEventListener(event, fct, false);
	},
	
	unbind: function (el, event, fct) {
		this.getById(el).removeEventListener(event, fct, false);
	},
	
	trigger: function (el, event) {
		var ev = document.createEvent("Event");
		ev.initEvent(event, true, true);
		el.dispatchEvent(ev);
	},
	
	toggle: function (el) {
		this.trigger(el,"onLBStart");
		var t = el.id.substr(0,(el.id.length-5));
		var e = this.getById(t+"-panel");
		if (e.style.display == "none") {
			if (e.getAttribute("data-moved") == undefined) {
				var s = e.innerHTML.trim();
				e.innerHTML = s.substr(4,(s.length-7));
				e.setAttribute("data-moved","true");
			}
			e.style.display = "block";
			this.trigger(el,"onLBShow");
		} else {
			e.style.display = "none";
			this.trigger(el,"onLBHide");
		}
		this.trigger(el,"onLBComplete");
	}
	
};