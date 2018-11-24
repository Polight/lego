// intraHTML: a better innerHTML (partial/non-destructive updates) for faster and simpler view rendering. (c)2015:dandavis,
var intraHTML=(function intraHTMLFactory (pub) {

if(!Number.isNaN) Number.isNaN = function isNan(value) { return typeof value === "number" && isNaN(value);};
if (!Array.isArray) Array.isArray = function isArr(arg) { return Object.prototype.toString.call(arg) === '[object Array]';};

//   2015-10-22 :: https://github.com/Tixit/odiff - changes: compare direct first, perf tweaks
var odiff=function odiff(z,A){function u(b,a,c,d,g,l,m){for(var e=d-l,h=g-m,k=Math.max(e,h),f=1;f<=k;f++){var n=a[d-f],v=c[g-f];if(f<=h&&f<=e&&b(n,v))return{a:d-f,b:g-f};for(var q=0;q<f;q++){var B=a[d-q],p=c[g-q];if(f<=h&&b(B,v))return{a:d-q,b:g-f};if(f<=e&&b(n,p))return{a:d-f,b:g-q}}}return{a:l-1,b:m-1}}function w(b,a){if(b===a)return!0;if(Array.isArray(b)){if(!Array.isArray(a))return!1;for(var c=b.length/15,d=Math.abs(b.length-a.length),g=0,l=b.length;g<l;g++)if(p(b[g],a[g])){if(2<=d&&d>c||d===b.length)return!1;d++}return!0}if("object"==typeof b){if("object"!=typeof a)return!1;var g=x(r(Object.keys(b)),r(Object.keys(a))),l=Object.keys(g).length,c=l/15,d=0,m;for(m in g)if(!p(b[m],a[m])){if(2<=d&&d>c||d+1===l)return!1;d++}return!0}return Number.isNaN(b)&&Number.isNaN(a)}function p(b,a){if(b===a)return!0;if(Array.isArray(b)){if(Array.isArray(a)&&b.length===a.length&&b[0]===a[0]&&String(b)===String(a)){for(var c=0,d=b.length;c<d;c++)if(!p(b[c],a[c]))return!1;return!0}return!1}if("object"==typeof b){if("object"!=typeof a)return!1;var g=Object.keys(b),c=Object.keys(a);if(g.length!==c.length||String(g)!==String(c))return!1;c=0;for(d=g.length;c<d;c++)if(!p(b[g[c]],a[g[c]]))return!1;return!0}return Number.isNaN(b)&&Number.isNaN(a)}function r(b){var a=0,c=b.length,d={};for(a;a<c;a++)d[b[a]]=!0;return d}function x(b,a){for(var c in a)b[c]=a[c];return b}var t=function _sm(b,a,c,d){function g(a,b,c){a.push({type:"set",path:b,val:c})}function l(a,b,c,d,e){a.push({type:"rm",path:b,index:c,num:d,mode:e})}function m(a,b,c,d){a.push({type:"add",path:b,index:c,vals:d})}if(!(b===a||Number.isNaN(b)&&Number.isNaN(a)))if(Array.isArray(b)&&Array.isArray(a)){for(var e=b.length-1,h=a.length-1;0<=e&&0<=h;)if(p(b[e],a[h]))e--,h--;else{for(var k=u(p,b,a,e,h,0,0),f=e;f>k.a&&h>k.b;)if(w(b[f],a[h]))t(b[f],a[h],c,d.concat([f])),f--,h--;else{var e=u(w,b,a,f,h,k.a+1,k.b+1),f=f-e.a,n=h-e.b;1===f&&1===n?g(c,d.concat(e.a+1),a[e.b+1]):1===f&&2===n?(m(c,d,e.a+2,a.slice(e.b+2,h+1)),g(c,d.concat(e.a+1),a[e.b+1])):2===f&&1===n?(l(c,d,e.a+2,1,"I"),g(c,d.concat(e.a+1),a[e.b+1])):2===f&&2===n?(g(c,d.concat(e.a+2),a[e.b+2]),g(c,d.concat(e.a+1),a[e.b+1])):(0<f&&l(c,d,e.a+1,f,"X"),0<n&&m(c,d,e.a+1,a.slice(e.b+1,h+1))),f=e.a,h=e.b}f>k.a?l(c,d,f,f-k.a,"Z"):h>k.b&&m(c,d,f+1,a.slice(k.b+1,h+1)),e=k.a,h=k.b}0<=e?l(c,d,0,e+1):0<=h&&m(c,d,0,a.slice(0,h+1))}else if("object"==typeof b&&"object"==typeof a)for(h in k=x(r(Object.keys(b)),r(Object.keys(a))),k)t(b[h],a[h],c,d.concat([h]));else g(c,d,a)},y=[];return t(z,A,y,[]),y};


//need to pull from master, rewire these two in, plus the for-loop on apply changes
function forEach(r,f,v){
	"use strict";
	if(arguments.length<2) return;
	var m=r.length, i=0;
	for (; i<m; i++) f(r[i],i,r);
}

function filter(r, f) {
	"use strict";
	var m=r.length, o=[], i=0;
	for(; i<m; i++) if(f(r[i],i,r)) o.push(r[i]);
	return o;
}



var elementFromString = function elementFromString(strHTML, containerTagName) {
	var temp = document.createElement(containerTagName || "div");
	temp.innerHTML = strHTML;
	return temp;
};



// given an html element or html string, returns a vdom of that markpup:
function fromHTML(source, containerTagName) {

	function scan(ob) {
		var bag = [],
			i = 0, n=0, cn = ob.childNodes,
			v, tag, tn, mx = cn.length;

		for(i; i < mx; i++) {

			v = cn[i];

			if(tn=v.tagName) { // recurse sub-tags if any

				tag = {
					$: tn.toLowerCase()
				};

				for(var i2 = 0, va = v.attributes, attr, mx2 = va.length; i2 < mx2; i2++) {
					attr = va[i2];
					tag[attr.name] = attr.value;
				}

				tag._=scan(v);
				bag[n++]=tag;

			} else { //if sub tags? no:
				bag[n++]=v.nodeValue;
			}
		}
		return bag;
	} // end scan()



	if(typeof source === "string") {
		return scan(elementFromString(source, containerTagName))[0];
	} else {
		return scan({
			tagName: containerTagName||"div",
			attributes: [],
			childNodes: [source]
		})[0];
	}

} //end fromHTML


function resolvePath(path, base) {
	var last = [], i=0, mx =path.length, out=base, u, k;
        for(i; i<mx; i++){
		k = path[i];
		if(k==="_") k="childNodes";
		last.push(out);
		out = out[k];
		if(out===u) break ;
	};
	return {
		node: out,
		parents: last
	};
}


function resolveAll(path, base) {
	var last = [], i=0, mx =path.length, out=base, u;
        for(i; i<mx; i++){
		last.push(out);
		out = out[path[i]];
		if(out===u) break ;
	};
	return {
		node: out,
		parents: last
	};
}

var singleTags={area:1,base:1,br:1,col:1,command:1,embed:1,hr:1,img:1,input:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1};

function toHT(objVDOM) {
	var attribs = "",
		r = [],
		tn, kids, u, a, i=0, o, mx=0,
		own = r.hasOwnProperty;

	if(objVDOM === u) return "";

	tn=objVDOM.$;

	// build attribs from values and functions:
	for(a in objVDOM)
		if( a !== "$" && a !== "_" && own.call(objVDOM, a) )
			attribs += (" " + a) + ((objVDOM[a] === "") ? "" : ("=" + JSON.stringify(objVDOM[a])));

	if(singleTags[tn]) return "<" + tn + attribs + " />";

	kids = objVDOM._ || [];
	if(kids && !Array.isArray(kids)) kids = [kids];

	for(i = 0, o, mx = kids.length; i < mx; i++) {
		o = kids[i]; // || "";
		r[i] = typeof o === "object" ? toHT(o) : o;
	}

	return "<" + tn + attribs + ">" + r.join("") + "</" + tn + ">";
}



//given a change array, applies the changes to the element that's rendering the vdom:
function applyChanges(change, INDEX, ALLS, that) {

	var time = that.timing,
		startTime = time ? performance.now() : 0,
		bug = that.debug,
		path = filter(change.path.concat(change.index || change.key), function _pathFilterer(a, b, c) {
			return a != b.xsdgdfg;
		}),
		slice = path.slice,
		lastChange = ALLS[INDEX - 1] || "",
		key = filter(path, function _keyFilterer(a, b, c) {
			return a != c.xsdgdfg;
		}).slice(-1)[0],
		elm = resolvePath(path, that.dest),
		parents = resolveAll(path, that.vdom),
		elmPar = filter(elm.parents, Boolean),
		ochange = {
			type: change.type,
			index: INDEX,
			path: path,
			key: key,
			elm: elm.node || elm.parents.slice(-1)[0],
			elmParents: elmPar,
			elmParent: elmPar.slice(-1)[0],
			dest: that.dest,
			parents: parents,
			parent: parents.parents.slice(-1)[0],
			isAttrib: !(key - 0.1) && key != "_" && key != "$",
			change: change
		}, attrs, a, mx, i, it, kids, temp, content, ext, cp=ochange.elm, cc, vals, mom, val, old;

	if(typeof ochange.elm == "function") ochange.elm = ochange.elmParent;
	if(bug) console.info("CHANGE: " + INDEX, ochange);
	function _setStrParFinder(a, b, c) {return a.textContent !== a.fsdhjklghdklg;}


	switch(change.type) {


	case "set":

		if(!ochange.isAttrib && (typeof change.val === "string" || Array.isArray(change.val))) {

			if(!ochange.elmParent.childNodes) ochange.elmParent = ochange.elmParent[ochange.key];
			if(!ochange.elm) ochange.elm = ochange.elmParent;
			cp = ochange.elm;
			vals = change.val;

			if(!Array.isArray(vals)) vals = [vals];

			for(var valIndex = 0, maxIndex = vals.length; valIndex < maxIndex; valIndex++) {
				val = vals[valIndex];

				if(typeof val === "string") { //add text nodes:
					if(ochange.elm instanceof NodeList) ochange.elm = cp = filter(ochange.elmParents, _setStrParFinder ).pop();

					if(cp.childNodes) {
						if(bug) console.log("set: non attrib, string, elm: ", ochange.key, [val], cp.outerHTML);
						content = document.createTextNode(val);

						if(ochange.key === "_") {
							cp.textContent = val;
						} else {
							if(ochange.key === "$") {

								temp = document.createElement(change.val);

								if(bug) console.warn("changing tag name!", change);
								ochange.elm.parentNode.insertBefore(temp, cp);

								attrs = cp.attributes;
								for(i = 0, mx = attrs.length; i < mx; i++) {
									a = attrs[i];
									temp.setAttribute(a.name, a.value);
								}
								kids = cp.childNodes, mom= cp.parentNode;
								for(i = 0, mx = kids.length; i < mx; i++) temp.appendChild(kids[0]);
								mom.removeChild(cp);
							} else {
								mom=cp.parentNode;
								mom.insertBefore(content, cp);
								mom.removeChild(cp);
							}
						}

					} else {
						if(bug) console.log("set: non attrib, string, not elm", val);
						cp.textContent = val; //update element
					}

				} else { //add elms:
					mom=cp.parentNode;
					content = typeof val === "string" ? document.createTextNode(val) : elementFromString(toHT(val), ochange.elmParent[0] && ochange.elmParent[0].parentNode.tagName).firstChild;
					if(!cp.parentNode) ochange.elm = cp = ochange.elmParent;
					old = cp.childNodes[+key + valIndex];
					if(old) {
						if(bug) console.log("set: non attrib, not string, has old", val);
						cp.insertBefore(content, old);
						cp.removeChild(ochange.elm);
					} else {
						if(bug) console.log("set: non attrib, not string, no old, appending", [val, content, content.outerHTML || content.textContent]);
						cp.appendChild(content);
					}
				}


				if(key == "_") {
					key = 0;
					if(!ochange.parent.length) ochange.parent = (ochange.parent._ || (ochange.parent._ = []));
				}

				if(bug) console.info("attempting key change", + key + valIndex, !! (1.1 - key), key, valIndex, val, ochange.parent[+key + valIndex], [ochange.parent]);


			}

			break;
		}


		if(ochange.isAttrib) {
			if(key == "$" && String(path) == key) throw new TypeError("You cannot change the root element of an update-bound element: " + cp.outerHTML);
			if(key == "$") {
				temp = document.createElement(change.val);
				mom = cp.parentNode;
				if(bug) console.warn("changing tag name!", change);

				mom.insertBefore(temp, cp);

				attrs = cp.attributes;
				for(i = 0, mx = attrs.length; i < mx; i++) {
					a = attrs[i];
					temp.setAttribute(a.name, a.value);
				}
				kids = cp.childNodes;
				for(i = 0, mx = kids.length; i < mx; i++) temp.appendChild(kids[0]);
				mom.removeChild(cp);


			} else {

				if(!cp.setAttribute && cp.parentNode && cp.parentNode.setAttribute) {
					ochange.elm = cp = ochange.elm.parentNode;
				}


				if(!cp.setAttribute && (cc = filter(ochange.elmParents, function _setParFinderCC(a, b, c) {
					return a.setAttribute;
				}).slice(-1)[0]).setAttribute) {
					ochange.elm = cp = cc;
				}

				if(change.val === change.dgfjkdfl34534fd) {
					cp.removeAttribute(key); //update element
				} else {
					cp.setAttribute(key, change.val); //update element
				}

			}


			break;
		}


		if(cp.length && change.val === change.sdgfdf) {
			mom=cp[0].parentNode;
			for(var i6 = 0, mx6 = cp.length; i6 < mx6; i6++) mom.removeChild(cp[0]);
		} else {

			if(cp instanceof NodeList) ochange.elm =  cp = filter(ochange.elmParents, function _setParFinder(a, b, c) {
				return a.textContent !== a.fsdhjklghdklg;
			}).pop();

			temp = elementFromString(toHT(change.val), ochange.parent.$).firstChild;

			if(bug) console.log("element replacing", [ochange.elm.outerHTML || ochange.elm.textContent], " with ", [temp.outerHTML]);
			mom=cp.parentNode;

			mom.insertBefore(temp, cp);
			mom.removeChild(cp);
		}
		break;


	case "add":
		if(!ochange.isAttrib) {

			if(ochange.key == "_") {
				ochange.elm = cp = cp[change.index];
				ochange.key = change.index;
				ochange.parent = ochange.parent._;
				ochange.elmParent = ochange.elmParent.childNodes;
			}

			forEach(change.vals, function _valUpdater(val, i, arrWhole) {

			if(!ochange.elmParent.length) ochange.elmParent = ochange.elmParents.slice(-1)[0].childNodes;
				if(!ochange.elmParent) ochange.elmParent = ochange.elmParents.slice(-2)[0].childNodes;

				content = typeof val === "string" ? document.createTextNode(val) : elementFromString(toHT(val), ochange.elmParent[0] && ochange.elmParent[0].parentNode.tagName).firstChild;
				ext = ochange.elmParent[ochange.key + i];

				if(ext) {
					ext.parentNode.insertBefore(content, ext);
					// ochange.parent.splice(ochange.key + i, 0, val);
				} else {
					if(ochange.elmParent[ochange.key + i]) {
						ochange.elmParent[ochange.key + i] = content;
					} else {
						it = ochange.elmParents.slice(-1)[0];
						if(it[0]) it = it[it.length - 1];
						if(ochange.elm && ochange.elm.length >= ochange.key) it = ochange.elm[0].parentNode;

						if(it instanceof NodeList) it = filter(ochange.elmParents, function _addParFinder(a, b, c) {
							return a.textContent !== a.fsdhjklghdklg;
						}).pop();

						if(it !== content) {
							if(it.nodeType != 3) {
								it.appendChild(content);
							} else {
								mom=it.parentNode;
								mom.insertBefore(content, it);
								mom.insertBefore(it, content);
							}
						}
					}
				}
			});

		}

		break;

	case "rm":


		if(ochange.elmParent.childNodes) ochange.elmParent = ochange.elmParent.childNodes;
		if(ochange.elmParent.length === 0) ochange.elmParent = ochange.elmParents.slice(-3)[0];
		if(ochange.elmParent.childNodes) ochange.elmParent = ochange.elmParent.childNodes;
		if(ochange.parent._) ochange.parent = ochange.parent._;

		// list out what to remove:
		var min = change.index - change.num,
			max = change.index,
			toRemove = slice.call(ochange.elmParent, min + 1, max + 1);

		if(change.index === 0) { // it starts at zero, the odiff range goes positive instead of couring backwards from 0:

			if(bug) console.log("removing many from zero", slice.call(ochange.parent), ochange.elmParent, "|||", ochange.parent[0], change.index, change.num);

			for(i = change.index, mx = i + change.num; i < mx; i++) {
				ochange.elmParent[change.index].remove();
			}
		} else {


			if(change.index - change.num > -1) {

				if(change.num === 1) {

					toRemove = [ochange.elmParent[change.index]];

					if(bug) console.log("removing one", ochange.elmParent, toRemove[0].outerHTML, change.index, slice.call(ochange.elmParent).map(function _removeOneConsoleMapper(a) {
						return a.outerHTML || a.nodeValue;
					}), ochange.parent);

				} else {

					if(change.index + change.num < ochange.elmParent.length + 1) {

						var ind = change.index;
						if(ind > 1 && change.mode === "Z") ind = ind - (change.num - 1);

						if(bug) console.log("removing many up", change.mode, ochange.elmParent, ind, ind + change.num);
						toRemove = slice.call(ochange.elmParent, ind, ind + change.num);

					} else { //count backwards:
						if(bug) console.log("removing many down", slice.call(ochange.elmParent), change.index - change.num, change.index);
						toRemove = slice.call(ochange.elmParent, (change.index - change.num) + 1, (change.index) + 1);
					}
				}
			} else {
				if(bug) console.log("removing many negative", ochange.elmParent, change.index, change.index + change.num);
				toRemove = slice.call(ochange.elmParent, change.index, change.index + change.num);
			}

			if(bug) console.log("removing:", toRemove, change, ochange.parent.slice((change.index - change.num) + 1, (change.index) + 1));
			forEach(toRemove, function _toRemover(a, b, c) {
				a.parentNode.removeChild(a);
			});
		}
		break;
	}
	if(time) change.runtime = performance.now() - startTime;

} //end applyChanges()



function getRenderer(elmDest, objVDOM, hint) {
	var dest=elmDest, vdom=objVDOM;
	if(typeof dest === "string") dest = document.querySelector(dest);

	var it= intraHTML.blnTiming ? performance.now() : 0,
	tag=dest.tagName.toLowerCase(),
	head="<"+tag+">",
	ht, st, state;

	if(!dest.childNodes.length) dest.innerHTML = " ";

	if(!vdom) vdom = dest;

	if(vdom instanceof Element){
		ht=vdom.innerHTML.replace(/<\!\-\-[\s\S]+?\-\->/g,"");
		if(hint === ht) return {update: Boolean};
		vdom = fromHTML(head + ht + "</" + tag + ">", tag); // actually faster using outerHTML than feeding it a dom node (dest, which works). confirm that widely...
	}

	if(typeof vdom === "string" ) vdom = fromHTML(vdom, tag);

	st= intraHTML.blnTiming ? performance.now() : 0;

	state = {
		dest: dest,
		vdom: vdom,
		debug: intraHTML.blnDebug,
		timing : intraHTML.blnTiming,
		initTime: st-it,
		update: function intraHTML_update(vdom) {
			var blnTime=intraHTML.blnTiming, st, i=0, mx;
			if(blnTime) st=performance.now();
			if(typeof vdom === "string") 	vdom = fromHTML(head + vdom + "</" + tag + ">", tag);
			if(blnTime) state.parseTime= (performance.now() - st);
			state.vdom2 = vdom;
			if(blnTime) st=performance.now();
			state.changes = odiff(state.vdom, vdom);
			if(blnTime){
				state.diffTime= performance.now() - st;
				st=performance.now();
			}
			for(mx=state.changes.length;i<mx;i++)	applyChanges(state.changes[i], i, state.changes, state);
			if(blnTime) state.applyTime= performance.now() - st;
			state.vdom = vdom;
			return state;
		}
	};

	return state;
}





  //the return/module value/main routine:
  function intraHTML(elm, content){
	 return intraHTML._last=getRenderer(elm, elm, content),  intraHTML._last.update(content);
  }

  // publish useful internal helper methods:
  intraHTML.elementFromString=elementFromString;	// browser-baser parser turns elements into vdom objects
  intraHTML.fromHTML = fromHTML;	// uses a browser-based parser to turn an html string into a vdom object
  intraHTML.toHTML = toHT;				// turns a vdom object into an HTML string
  intraHTML.odiff=odiff;				// the internal differ used by intraHTML, exposed for testing and general use if desired, dirty checking for example
  intraHTML.updater=getRenderer; // returns a function that accepts HTML to update the view with. faster, but expects DOM not to change between updates.
  intraHTML.resolvePath=resolvePath;	//turns an array path from a change into an node collection of the leaf and all parents

  //publish external options:
  intraHTML.blnTiming = false;	// enable to gather performance information about parsing, diffing, and applying dom updates
  intraHTML.blnDebug = false;  	// enable to dump detailed info to the console for debugging

  return intraHTML;

}(this));

export default intraHTML
