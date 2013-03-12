/*!
 * lazyBlock v2.0
 *
 * Copyright (c) 2012-13 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 * 
 * IE custom event handling based on:
 * http://dean.edwards.name/weblog/2009/03/callbacks-vs-events/ &&
 * http://stackoverflow.com/questions/5342917/custom-events-in-ie-without-using-libraries
 *
 */

var lB = {
	
	el: '',
	t:  '',
	
	getById: function(id) {
		this.el = document.getElementById(id);
		return this;
	},
	
	dispatchFakeEvent: function (eventName) {
		this.el[eventName]++;
	},              
	
	bind: function (eventName, fct) {
		if (this.el.addEventListener) {
			this.el.addEventListener(eventName, fct, false);
		} else if (this.el.attachEvent) {
			if (!this.el[eventName]) {
				this.el[eventName] = 0;
			}
			this.el.attachEvent("onpropertychange", function(event){
				if (event.propertyName == eventName) {
					fct(fct);
				}
			});
		}
	},
	
	trigger: function (eventName) {
		if (document.createEvent) {
			var ev = document.createEvent("Event");
			ev.initEvent(eventName, true, true);
			this.el.dispatchEvent(ev);
		} else if (document.createEventObject) {
			this.dispatchFakeEvent(eventName);
		}	
	},
	
	swap: function (fireEvent) {
		var s = document.getElementById(this.t+"-source");
		var t = document.getElementById(this.t+"-target");
		if (t.style.display == "none") {
			if (t.getAttribute("data-moved") == undefined) {
				t.innerHTML = s.innerHTML;
				t.setAttribute("data-moved","true");
			}
			t.style.display = "block";
			if (fireEvent) { this.trigger("onLBShow"); }
		} else {
			t.style.display = "none";
			if (fireEvent) { this.trigger("onLBHide"); }
		}
	},
	
	toggle: function (others) {
		this.trigger("onLBStart");
		this.t = this.el.id.substr(0,(this.el.id.length-5));
		this.swap(true);
		if (typeof(others) === "object") {
			for (var i = 0, k = others.length; i < k; i++) {
				this.t = others[i];
				this.swap(false);
			}
		}
		this.trigger("onLBComplete");
	}
	
};