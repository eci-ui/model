export const parent = function (dom: HTMLElement, selector: string): HTMLElement | undefined {
  const node = dom?.parentNode as HTMLElement;
  if (node) {
    const className: string = node.getAttribute("class") || "";
    if (className && className.includes(selector)) {
      return node;
    } else {
      return parent(node, selector);
    }
  }
}

export const addClass = function (dom: HTMLElement, className: string | string[]): void {
  if (className && typeof className === "string") {
    return addClass(dom, [className]);
  }
  if (className.length < 1) {
    return void 0;
  }
  const list: string[] = String(dom.getAttribute("class") || "").split(" ");
  for (const text of className) {
    if (list.length > 0 && list.includes(text)) {
      continue;
    }
    list.push(text);
  }

  dom.setAttribute("class", list.join(" "));
}

export const removeClass = function (dom: HTMLElement, className: string | string[]): void {
  if (className && typeof className === "string") {
    return removeClass(dom, [className]);
  }
  if (className.length < 1) {
    return void 0;
  }
  const list: string[] = String(dom.getAttribute("class") || "").split(" ");
  if (list.length < 1) {
    return void 0;
  }
  const array: string[] = [];
  for (const text of list) {
    if (className.includes(text)) {
      continue;
    }
    array.push(text);
  }
  dom.setAttribute("class", array.join(" "));
}