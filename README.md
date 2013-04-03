## About lazyBlock

lazyBlock is a proof-of-concept to show how content can be conditionally loaded in responsive designs without relying on AJAX to fetch that content. Content is included in the original mark-up but is placed within `<script>` tags with the type `text/html`. Based on user action or screen width, the content can then be moved from the `<script>` tag and then injected into the DOM by lazyBlock.

## v2 Changes

Only a few changes for v2:

* now uses `<script>` tag rather than comments to "hide" content. it provides for a [hair better performance](http://jsperf.com/lazy-loading-content/3).
* better support for older versions of IE
* slightly different syntax as I get better with JS
* can toggle multiple elements from one call

## How is this Different from display: none?

Any mark-up contained within an element that has been set to `display: none` will still be parsed by the browser. For example, if your mark-up contains images the browser will download them. For performance reasons you may not want this to happen. lazyBlock helps developers avoid those extra downloads.

## Demo

There is a [small demo](http://lazyblock.dmolsen.com) that uses code from Brad Frost's "[Anatomy of a Mobile First RWD](http://bradfrostweb.com/blog/mobile/anatomy-of-a-mobile-first-responsive-web-design/)" example. You should be able to preview the following functionality:

* toggle the shirt panel using a link
* content updated in another part of the DOM based on event listeners (e.g. "hide/show shirts" copy)
* screens larger than 500px automatically load the shirt panel
* if the browser window is resized the panel should open & close at 500px

Simply inspect the page to see what's going on.

## Browser Support

lazyBlock appears to work well across all browsers and, as of v2.0, it supports older versions of IE.

## Usage

Setting up lazyBlock is pretty simple.

### The Mark-up

The key to setting up your mark-up to work with lazyBlock is to make sure that the IDs for your clickable element, your content source element, and content target element share the same base and follow the convention `[shared-base]-link`, `[shared-base]-source`, and `[shared-base]-target` respectively. lazyBlock will then work auto-magically. In the demo you can see that the shared base is "related-shirts."

The clickable element from the demo:

    <a id="related-shirts-link">
    	<h2>Related Shirts (<span id="related-shirts-status">show shirts</span>)</h2>
    </a>

The content target element from the demo:

    <div role="tabpanel" id="related-shirts-panel" style="display: none;"></div>

The content source element from the demo:

    <script id="related-shirts-source" type="text/html">
    	<ul>
    		<li><a href="#"><img src="images/related_1.jpg" alt="Product Name" /></a></li>
    		<li><a href="#"><img src="images/related_2.jpg" alt="Product Name" /></a></li>
    		<li><a href="#"><img src="images/related_3.jpg" alt="Product Name" /></a></li>
    		<li><a href="#"><img src="images/related_4.jpg" alt="Product Name" /></a></li>
    		<li><a href="#"><img src="images/related_5.jpg" alt="Product Name" /></a></li>
    		<li><a href="#"><img src="images/related_6.jpg" alt="Product Name" /></a></li>
    	</ul>
    </script>

### The JavaScript

lazyBlock works by being attached to events like `onclick`. This is the `onclick` code from the demo that toggles the "related-shirts-panel" `div` open and closed:

    // add an onclick handler to toggle the example
    document.getElementById("related-shirts-link").onclick = function() { lB.getById("related-shirts-link").toggle(); };

It is, admittedly, a little verbose.

lazyBlock also supports its own custom events. They are: `onLBStart`, `onLBShow`, `onLBHide`, and `onLBComplete`. lazyBlock comes with a simple function to allow you to quickly bind your code to elements. This demo code updates the "related-shirts-status" `span` with wording to signify the change in action for the link when the "related-shirts-target" `div` is shown and hidden.

    // run code at certain points in the running of the toggle
    // usage: lb.bind(element ID, event name, code to run)
    lB.getById("related-shirts-link").bind("onLBShow",function() { document.getElementById("related-shirts-status").innerHTML = "hide shirts"; } );
    lB.getById("related-shirts-link").bind("onLBHide",function() { document.getElementById("related-shirts-status").innerHTML = "show shirts"; } );

You can also have the panel open based on screen width so you can integrate this functionality with a responsive design.

### Toggling Multiple Elements from One Click

To toggle multiple elements simply include their shared base in an array when making the `.toggle()` call. For example:

	lB.getById("related-shirts-link").toggle(["foo","spoon"]);

## Other Ways to "Hide" Content from Browser Parser

`<script>` tags aren't the only way to hide content from the browser parser. You could also put content within:

* _JavaScript strings_ - I don't think this is really maintainable
* `<noscript>` _tags_ - Would be my top choice if Android 2.x allowed access to its contents.
* _old school comment tags_ - the method of choice for lazyBlock v1.0.
	
I'm sure there are other methods out there.
