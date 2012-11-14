## About lazyBlock

lazyBlock is a proof-of-concept to show how content can be conditionally loaded in responsive designs without relying on AJAX to fetch that content. Content is included in the original mark-up but is commented out. Based on user action or media queries, the content can then be uncommented and injected into the DOM by lazyBlock.

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

lazyBlock appears to work well across all browsers except for IE 8 and older. This is due to how I'm setting up the event listeners. I'll get it updated soon or feel free to drop me a patch.

## Usage

Setting up lazyBlock is pretty simple.

### The Mark-up

The key to setting up your mark-up to work with lazyBlock is to make sure that the IDs for your clickable element and your content element share the same base and follow the convention `[shared-base]-link` and `[shared-base]-panel` respectively. lazyBlock will then work auto-magically. Obviously, the content in your content element must also be commented out. In the demo you can see that the shared base is "related-shirts."

The clickable element from the demo:

    <a id="related-shirts-link">
    	<h2>Related Shirts (<span id="related-shirts-status">show shirts</span>)</h2>
    </a>
		
The content element from the demo:

    <div role="tabpanel" id="related-shirts-panel" style="display: none;">
    	<!--
    		<ul>
    			<li><a href="#"><img src="images/related_1.jpg" alt="Product Name" /></a></li>
    			<li><a href="#"><img src="images/related_2.jpg" alt="Product Name" /></a></li>
    			<li><a href="#"><img src="images/related_3.jpg" alt="Product Name" /></a></li>
    			<li><a href="#"><img src="images/related_4.jpg" alt="Product Name" /></a></li>
   				<li><a href="#"><img src="images/related_5.jpg" alt="Product Name" /></a></li>
    			<li><a href="#"><img src="images/related_6.jpg" alt="Product Name" /></a></li>
    		</ul>
    	-->
    </div>

### The JavaScript

lazyBlock works by being attached to events like `onclick`. This is the `onclick` code from the demo that toggles the "related-shirts-panel" `div` open and closed:

    // add an onclick handler to toggle the example
    lB.getById("related-shirts-link").onclick = function() { lB.toggle(this) };

lazyBlock also supports its own custom events. They are: `onLBStart`, `onLBShow`, `onLBHide`, and `onLBComplete`. lazyBlock comes with a simple function to allow you to quickly bind your code to elements. This demo code updates the "related-shirts-status" `span` with wording to signify the change in action for the link when the "related-shirts-panel" `div` is shown and hidden.

    // run code at certain points in the running of the toggle
    // usage: lb.bind(element ID, event name, code to run)
    lB.bind("related-shirts-link","onLBShow",function() {         lB.getById("related-shirts-status").innerHTML = "hide shirts"; } );
    lB.bind("related-shirts-link","onLBHide",function() { lB.getById("related-shirts-status").innerHTML = "show shirts"; } );

You can also combine lazyBlock with Paul Irish's [matchMedia.js polyfill](https://github.com/paulirish/matchMedia.js/). This code makes sure that the panel is open by default if the screen is larger than 500px.

    // use match media to toggle content based on media queries
    if (matchMedia('only screen and (min-width: 500px)').matches) {
    	lB.toggle(lB.getById("related-shirts-link"));
    }

    // you can also use a listener to track on window resizing. you *must* use
    // the previous matchmedia check *first*. 
    matchMedia("screen and (min-width: 500px)").addListener(function(mql) {
    	lB.toggle(lB.getById("related-shirts-link"));
    });

## Other Ways to "Hide" Content from Browser Parser

Commenting out code is not the only way to hide content from the browser parser. You could also put content within:

* _JavaScript strings_ - I don't think this is really maintainable
* `<script type="text/html">` _tags_ - Used by other JavaScript libraries. Perfectly reasonable.
* `<noscript>` _tags_ - Would be my top choice if Android 2.x allowed access to its contents.
	
I'm sure there are other methods out there.