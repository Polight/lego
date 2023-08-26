const EMPTY_OBJECT = {};

const VTYPE_ELEMENT = 1;
const VTYPE_FUNCTION = 2;
const VTYPE_COMPONENT = 4;

const isEmpty = (c) =>
  c === null || (Array.isArray(c) && c.length === 0);
const isNonEmptyArray = (c) => Array.isArray(c) && c.length > 0;
const isLeaf = (c) => typeof c === "string" || typeof c === "number";
const isElement = (c) => c?.vtype === VTYPE_ELEMENT;
const isRenderFunction = (c) => c?.vtype === VTYPE_FUNCTION;
const isComponent = (c) => c?.vtype === VTYPE_COMPONENT;

const isValidComponentType = (c) => typeof c?.mount === "function";

function h(type, props, ...children) {
  props = props ?? EMPTY_OBJECT;

  props =
    children.length > 1
      ? Object.assign({}, props, { children })
      : children.length === 1
      ? Object.assign({}, props, { children: children[0] })
      : props;

  return jsx(type, props, props.key);
}

function jsx(type, props, key) {
  if (key !== key) throw new Error("Invalid NaN key");
  const vtype =
    typeof type === "string"
      ? VTYPE_ELEMENT
      : isValidComponentType(type)
      ? VTYPE_COMPONENT
      : typeof type === "function"
      ? VTYPE_FUNCTION
      : undefined;
  if (vtype === undefined) throw new Error("Invalid VNode type");
  return {
    vtype,
    type,
    key,
    props,
  };
}

const REF_SINGLE = 1; // ref with a single dom node
const REF_ARRAY = 4; // ref with an array od nodes
const REF_PARENT = 8; // ref with a child ref

const SVG_NS = "http://www.w3.org/2000/svg";

function propDirective(prop) {
  return {
    mount(element, value) {
      element[prop] = value;
    },
    patch(element, newValue, oldValue) {
      if (newValue !== oldValue) {
        element[prop] = newValue;
      }
    },
    unmount(element, _) {
      element[prop] = null;
    },
  };
}

const DOM_PROPS_DIRECTIVES = {
  selected: propDirective("selected"),
  checked: propDirective("checked"),
  value: propDirective("value"),
  innerHTML: propDirective("innerHTML"),
};
/**
  TODO: activate full namespaced attributes (not supported in JSX)
  const XML_NS = "http://www.w3.org/XML/1998/namespace"
**/
const XLINK_NS = "http://www.w3.org/1999/xlink";
const NS_ATTRS = {
  show: XLINK_NS,
  actuate: XLINK_NS,
  href: XLINK_NS,
};

function getDomNode(ref) {
  if (ref.type === REF_SINGLE) {
    return ref.node;
  } else if (ref.type === REF_ARRAY) {
    return getDomNode(ref.children[0]);
  } else if (ref.type === REF_PARENT) {
    return getDomNode(ref.childRef);
  }
  throw new Error("Unkown ref type " + JSON.stringify(ref));
}

function getParentNode(ref) {
  if (ref.type === REF_SINGLE) {
    return ref.node.parentNode;
  } else if (ref.type === REF_ARRAY) {
    return getParentNode(ref.children[0]);
  } else if (ref.type === REF_PARENT) {
    return getParentNode(ref.childRef);
  }
  throw new Error("Unkown ref type " + ref);
}

function getNextSibling(ref) {
  if (ref.type === REF_SINGLE) {
    return ref.node.nextSibling;
  } else if (ref.type === REF_ARRAY) {
    return getNextSibling(ref.children[ref.children.length - 1]);
  } else if (ref.type === REF_PARENT) {
    return getNextSibling(ref.childRef);
  }
  throw new Error("Unkown ref type " + JSON.stringify(ref));
}

function insertDom(parent, ref, nextSibling) {
  if (ref.type === REF_SINGLE) {
    parent.insertBefore(ref.node, nextSibling);
  } else if (ref.type === REF_ARRAY) {
    ref.children.forEach((ch) => {
      insertDom(parent, ch, nextSibling);
    });
  } else if (ref.type === REF_PARENT) {
    insertDom(parent, ref.childRef, nextSibling);
  } else {
    throw new Error("Unkown ref type " + JSON.stringify(ref));
  }
}

function removeDom(parent, ref) {
  if (ref.type === REF_SINGLE) {
    parent.removeChild(ref.node);
  } else if (ref.type === REF_ARRAY) {
    ref.children.forEach((ch) => {
      removeDom(parent, ch);
    });
  } else if (ref.type === REF_PARENT) {
    removeDom(parent, ref.childRef);
  } else {
    throw new Error("Unkown ref type " + ref);
  }
}

function replaceDom(parent, newRef, oldRef) {
  insertDom(parent, newRef, getDomNode(oldRef));
  removeDom(parent, oldRef);
}

function mountDirectives(domElement, props, env) {
  for (let key in props) {
    if (key in env.directives) {
      env.directives[key].mount(domElement, props[key]);
    }
  }
}

function patchDirectives(domElement, newProps, oldProps, env) {
  for (let key in newProps) {
    if (key in env.directives) {
      env.directives[key].patch(domElement, newProps[key], oldProps[key]);
    }
  }
  for (let key in oldProps) {
    if (key in env.directives && !(key in newProps)) {
      env.directives[key].unmount(domElement, oldProps[key]);
    }
  }
}

function unmountDirectives(domElement, props, env) {
  for (let key in props) {
    if (key in env.directives) {
      env.directives[key].unmount(domElement, props[key]);
    }
  }
}

function mountAttributes(domElement, props, env) {
  for (var key in props) {
    if (key === "key" || key === "children" || key in env.directives) continue;
    if (key.startsWith("on")) {
      domElement[key.toLowerCase()] = props[key];
    } else {
      setDOMAttribute(domElement, key, props[key], env.isSVG);
    }
  }
}

function patchAttributes(domElement, newProps, oldProps, env) {
  for (var key in newProps) {
    if (key === "key" || key === "children" || key in env.directives) continue;
    var oldValue = oldProps[key];
    var newValue = newProps[key];
    if (oldValue !== newValue) {
      if (key.startsWith("on")) {
        domElement[key.toLowerCase()] = newValue;
      } else {
        setDOMAttribute(domElement, key, newValue, env.isSVG);
      }
    }
  }
  for (key in oldProps) {
    if (
      key === "key" ||
      key === "children" ||
      key in env.directives ||
      key in newProps
    )
      continue;
    if (key.startsWith("on")) {
      domElement[key.toLowerCase()] = null;
    } else {
      domElement.removeAttribute(key);
    }
  }
}

function setDOMAttribute(el, attr, value, isSVG) {
  if (value === true) {
    el.setAttribute(attr, "");
  } else if (value === false) {
    el.removeAttribute(attr);
  } else {
    var namespace = isSVG ? NS_ATTRS[attr] : undefined;
    if (namespace !== undefined) {
      el.setAttributeNS(namespace, attr, value);
    } else {
      el.setAttribute(attr, value);
    }
  }
}

const DEFAULT_ENV = {
  isSvg: false,
  directives: DOM_PROPS_DIRECTIVES,
};

class Renderer {
  constructor(props, env) {
    this.props = props;
    this._STATE_ = {
      env,
      vnode: null,
      parentDomNode: null,
      ref: mount(null),
    };
    this.render = this.render.bind(this);
  }

  setProps(props) {
    this.oldProps = this.props;
    this.props = props;
  }

  render(vnode) {
    const state = this._STATE_;
    const oldVNode = state.vnode;
    state.vnode = vnode;
    if (state.parentDomNode == null) {
      let parentNode = getParentNode(state.ref);
      if (parentNode == null) {
        state.ref = mount(vnode, state.env);
        return;
      } else {
        state.parentDomNode = parentNode;
      }
    }
    // here we're sure state.parentDOMNode is defined
    state.ref = patchInPlace(
      state.parentDomNode,
      vnode,
      oldVNode,
      state.ref,
      state.env
    );
  }
}

function mount(vnode, env = DEFAULT_ENV) {
  if (isEmpty(vnode)) {
    return {
      type: REF_SINGLE,
      node: document.createComment("NULL"),
    };
  } else if (isLeaf(vnode)) {
    return {
      type: REF_SINGLE,
      node: document.createTextNode(vnode),
    };
  } else if (isElement(vnode)) {
    let node;
    let { type, props } = vnode;
    if (type === "svg" && !env.isSvg) {
      env = Object.assign({}, env, { isSVG: true });
    }
    // TODO : {is} for custom elements
    if (!env.isSVG) {
      node = document.createElement(type);
    } else {
      node = document.createElementNS(SVG_NS, type);
    }
    mountAttributes(node, props, env);
    let childrenRef =
      props.children == null ? props.children : mount(props.children, env);
    /**
     * We need to insert content before setting interactive props
     * that rely on children been present (e.g select)
     */
    if (childrenRef != null) insertDom(node, childrenRef);
    mountDirectives(node, props, env);
    return {
      type: REF_SINGLE,
      node,
      children: childrenRef,
    };
  } else if (isNonEmptyArray(vnode)) {
    return {
      type: REF_ARRAY,
      children: vnode.map((child) => mount(child, env)),
    };
  } else if (isRenderFunction(vnode)) {
    let childVNode = vnode.type(vnode.props);
    let childRef = mount(childVNode, env);
    return {
      type: REF_PARENT,
      childRef,
      childState: childVNode,
    };
  } else if (isComponent(vnode)) {
    let renderer = new Renderer(vnode.props, env);
    vnode.type.mount(renderer);
    return {
      type: REF_PARENT,
      childRef: renderer._STATE_.ref,
      childState: renderer,
    };
  } else if (vnode instanceof Node) {
    return {
      type: REF_SINGLE,
      node: vnode,
    };
  }
  if (vnode === undefined) {
    throw new Error("mount: vnode is undefined!");
  }

  throw new Error("mount: Invalid Vnode!");
}

function patch(
  parentDomNode,
  newVNode,
  oldVNode,
  ref,
  env = DEFAULT_ENV
) {
  if (oldVNode === newVNode) {
    return ref;
  } else if (isEmpty(newVNode) && isEmpty(oldVNode)) {
    return ref;
  } else if (isLeaf(newVNode) && isLeaf(oldVNode)) {
    ref.node.nodeValue = newVNode;
    return ref;
  } else if (
    isElement(newVNode) &&
    isElement(oldVNode) &&
    newVNode.type === oldVNode.type
  ) {
    if (newVNode.type === "svg" && !env.isSvg) {
      env = Object.assign({}, env, { isSVG: true });
    }
    patchAttributes(ref.node, newVNode.props, oldVNode.props, env);
    let oldChildren = oldVNode.props.children;
    let newChildren = newVNode.props.children;
    if (oldChildren == null) {
      if (newChildren != null) {
        ref.children = mount(newChildren, env);
        insertDom(ref.node, ref.children);
      }
    } else {
      if (newChildren == null) {
        ref.node.textContent = "";
        unmount(oldChildren, ref.children, env);
        ref.children = null;
      } else {
        ref.children = patchInPlace(
          ref.node,
          newChildren,
          oldChildren,
          ref.children,
          env
        );
      }
    }
    patchDirectives(ref.node, newVNode.props, oldVNode.props, env);
    return ref;
  } else if (isNonEmptyArray(newVNode) && isNonEmptyArray(oldVNode)) {
    patchChildren(parentDomNode, newVNode, oldVNode, ref, env);
    return ref;
  } else if (
    isRenderFunction(newVNode) &&
    isRenderFunction(oldVNode) &&
    newVNode.type === oldVNode.type
  ) {
    let renderFn = newVNode.type;
    let shouldUpdate =
      renderFn.shouldUpdate != null
        ? renderFn.shouldUpdate(oldVNode.props, newVNode.props)
        : defaultShouldUpdate(oldVNode.props, newVNode.props);
    if (shouldUpdate) {
      let childVNode = renderFn(newVNode.props);
      let childRef = patch(
        parentDomNode,
        childVNode,
        ref.childState,
        ref.childRef,
        env
      );
      // We need to return a new ref in order for parent patches to
      // properly replace changing DOM nodes
      if (childRef !== ref.childRef) {
        return {
          type: REF_PARENT,
          childRef,
          childState: childVNode,
        };
      } else {
        ref.childState = childVNode;
        return ref;
      }
    } else {
      return ref;
    }
  } else if (
    isComponent(newVNode) &&
    isComponent(oldVNode) &&
    newVNode.type === oldVNode.type
  ) {
    const renderer = ref.childState;
    const state = renderer._STATE_;
    state.env = env;
    state.parentNode = parentDomNode;
    renderer.setProps(newVNode.props);
    newVNode.type.patch(renderer);
    if (ref.childRef !== state.ref) {
      return {
        type: REF_PARENT,
        childRef: state.ref,
        childState: renderer,
      };
    } else {
      return ref;
    }
  } else if (newVNode instanceof Node && oldVNode instanceof Node) {
    ref.node = newVNode;
    return ref;
  } else {
    return mount(newVNode, env);
  }
}

/**
 * Execute any compoenent specific unmount code
 */
function unmount(vnode, ref, env) {
  // if (vnode instanceof Node ||  isEmpty(vnode) || isLeaf(vnode)) return;
  if (isElement(vnode)) {
    unmountDirectives(ref.node, vnode.props, env);
    if (vnode.props.children != null)
      unmount(vnode.props.children, ref.children, env);
  } else if (isNonEmptyArray(vnode)) {
    vnode.forEach((childVNode, index) =>
      unmount(childVNode, ref.children[index], env)
    );
  } else if (isRenderFunction(vnode)) {
    unmount(ref.childState, ref.childRef, env);
  } else if (isComponent(vnode)) {
    vnode.type.unmount(ref.childState);
  }
}

function patchInPlace(parentDomNode, newVNode, oldVNode, ref, env) {
  const newRef = patch(parentDomNode, newVNode, oldVNode, ref, env);
  if (newRef !== ref) {
    replaceDom(parentDomNode, newRef, ref);
    unmount(oldVNode, ref, env);
  }
  return newRef;
}

function patchChildren(parentDomNode, newChildren, oldchildren, ref, env) {
  // We need to retreive the next sibling before the old children
  // get eventually removed from the current DOM document
  const nextNode = getNextSibling(ref);
  const children = Array(newChildren.length);
  let refChildren = ref.children;
  let newStart = 0,
    oldStart = 0,
    newEnd = newChildren.length - 1,
    oldEnd = oldchildren.length - 1;
  let oldVNode, newVNode, oldRef, newRef, refMap;

  while (newStart <= newEnd && oldStart <= oldEnd) {
    if (refChildren[oldStart] === null) {
      oldStart++;
      continue;
    }
    if (refChildren[oldEnd] === null) {
      oldEnd--;
      continue;
    }

    oldVNode = oldchildren[oldStart];
    newVNode = newChildren[newStart];
    if (newVNode?.key === oldVNode?.key) {
      oldRef = refChildren[oldStart];
      newRef = children[newStart] = patchInPlace(
        parentDomNode,
        newVNode,
        oldVNode,
        oldRef,
        env
      );
      newStart++;
      oldStart++;
      continue;
    }

    oldVNode = oldchildren[oldEnd];
    newVNode = newChildren[newEnd];
    if (newVNode?.key === oldVNode?.key) {
      oldRef = refChildren[oldEnd];
      newRef = children[newEnd] = patchInPlace(
        parentDomNode,
        newVNode,
        oldVNode,
        oldRef,
        env
      );
      newEnd--;
      oldEnd--;
      continue;
    }

    if (refMap == null) {
      refMap = {};
      for (let i = oldStart; i <= oldEnd; i++) {
        oldVNode = oldchildren[i];
        if (oldVNode?.key != null) {
          refMap[oldVNode.key] = i;
        }
      }
    }

    newVNode = newChildren[newStart];
    const idx = newVNode?.key != null ? refMap[newVNode.key] : null;
    if (idx != null) {
      oldVNode = oldchildren[idx];
      oldRef = refChildren[idx];
      newRef = children[newStart] = patch(
        parentDomNode,
        newVNode,
        oldVNode,
        oldRef,
        env
      );
      insertDom(parentDomNode, newRef, getDomNode(refChildren[oldStart]));
      if (newRef !== oldRef) {
        removeDom(parentDomNode, oldRef);
        unmount(oldVNode, oldRef, env);
      }
      refChildren[idx] = null;
    } else {
      newRef = children[newStart] = mount(newVNode, env);
      insertDom(parentDomNode, newRef, getDomNode(refChildren[oldStart]));
    }
    newStart++;
  }

  const beforeNode =
    newEnd < newChildren.length - 1
      ? getDomNode(children[newEnd + 1])
      : nextNode;
  while (newStart <= newEnd) {
    const newRef = mount(newChildren[newStart], env);
    children[newStart] = newRef;
    insertDom(parentDomNode, newRef, beforeNode);
    newStart++;
  }
  while (oldStart <= oldEnd) {
    oldRef = refChildren[oldStart];
    if (oldRef != null) {
      removeDom(parentDomNode, oldRef);
      unmount(oldchildren[oldStart], oldRef, env);
    }
    oldStart++;
  }
  ref.children = children;
}

function defaultShouldUpdate(p1, p2) {
  if (p1 === p2) return false;
  for (let key in p2) {
    if (p1[key] !== p2[key]) return true;
  }
  return false;
}

function render(vnode, parentDomNode, options = {}) {
  let rootRef = parentDomNode.$$PETIT_DOM_REF;
  let env = Object.assign({}, DEFAULT_ENV);
  Object.assign(env.directives, options.directives);
  if (rootRef == null) {
    const ref = mount(vnode, env);
    parentDomNode.$$PETIT_DOM_REF = { ref, vnode };
    parentDomNode.textContent = "";
    insertDom(parentDomNode, ref, null);
  } else {
    rootRef.ref = patchInPlace(
      parentDomNode,
      vnode,
      rootRef.vnode,
      rootRef.ref,
      env
    );
    rootRef.vnode = vnode;
  }
}

function toCamelCase(name) {
  if(name.includes('-')) {
    const parts = name.split('-');
    name = parts[0] + parts.splice(1).map(s => s[0].toUpperCase() + s.substr(1)).join('');
  }
  return name
}


class Component extends HTMLElement {
  constructor() {
    super();
    this.useShadowDOM = true;
    this.__isConnected = false;
    this.__state = {};
    if(this.init) this.init();
    this.watchProps = Object.keys(this.__state);
    this.__attributesToState();
    this.document = this.useShadowDOM ? this.attachShadow({mode: 'open'}) : this;
  }

  __attributesToState() {
    Object.assign(this.state, Array.from(this.attributes).reduce((obj, attr) => {
      return Object.assign(obj, { [toCamelCase(attr.name)]: attr.value })
    }, {}));
  }

  get vdom() { return ({ state }) => '' }

  get vstyle() { return ({ state }) => '' }

  setAttribute(name, value) {
    super.setAttribute(name, value);
    const prop = toCamelCase(name);
    if(this.watchProps.includes(prop)) this.render({ [prop]: value });
  }

  removeAttribute(name) {
    super.removeAttribute(name);
    const prop = toCamelCase(name);
    if(this.watchProps.includes(prop) && prop in this.state) {
      this.render({ [prop]: null });
      delete this.state[prop];
    }
  }

  connectedCallback() {
    this.__isConnected = true;
    this.render();
    // First rendering of the component
    if(this.connected) this.connected();
  }

  disconnectedCallback() {
    this.__isConnected = false;
    this.setState({});
    if(this.disconnected) this.disconnected();
  }

    setState(updated = {}) {
      const previous = Object.keys(updated).reduce((obj, key) => Object.assign(obj, { [key]: this.__state[key] }), {});
      Object.assign(this.__state, updated);
      if(this.changed && this.__isConnected) this.changed(updated, previous);
    }

  set state(value) {
    this.setState(value);
  }

  get state() {
    return this.__state
  }

  render(state) {
    this.setState(state);
    if(!this.__isConnected) return
    return render([
      this.vdom({ state: this.__state }),
      this.vstyle({ state: this.__state }),
    ], this.document)
  }
}

export { Component, h, render };
