(() => {
  // widget-src/code.tsx
  var { widget } = figma;
  var { AutoLayout, Text, useSyncedState, useWidgetId } = widget;
  var isFigmaLayer = (node) => node.type === "FRAME" || node.type === "COMPONENT_SET" || node.type === "COMPONENT" || node.type === "INSTANCE" || node.type === "GROUP" || node.type === "SECTION" || node.type === "RECTANGLE" || node.type === "ELLIPSE" || node.type === "POLYGON" || node.type === "STAR" || node.type === "VECTOR" || node.type === "TEXT" || node.type === "BOOLEAN_OPERATION";
  function toggleChildrenVisibility(widgetId, visible) {
    const widget2 = figma.getNodeById(widgetId), parent = widget2 == null ? void 0 : widget2.parent, children = parent == null ? void 0 : parent.children;
    if (children) {
      for (let child of children) {
        showHideLayer(child, visible);
      }
    }
  }
  function showHideLayer(node, visible) {
    if (isFigmaLayer(node)) {
      if (node.type === "SECTION") {
        let children = node.children;
        for (let child of children) {
          showHideLayer(child, visible);
        }
      } else
        node.visible = visible;
    }
  }
  function ShowHide() {
    const [visible, setVisibility] = useSyncedState("visibility", true), [label, setLabel] = useSyncedState("label", "Show less");
    const widgetId = useWidgetId();
    return /* @__PURE__ */ figma.widget.h(AutoLayout, {
      verticalAlignItems: "center",
      padding: { left: 0, right: 0, top: 4, bottom: 4 },
      onClick: () => {
        if (visible)
          setLabel("Show less");
        else
          setLabel("Show more");
        toggleChildrenVisibility(widgetId, visible);
        setVisibility(!visible);
      },
      hoverStyle: {
        fill: "#9747ff"
      }
    }, /* @__PURE__ */ figma.widget.h(Text, {
      fontFamily: "Inter",
      fontSize: 14,
      fill: "#2196F3",
      hoverStyle: {
        fill: "#ffffff"
      }
    }, label));
  }
  widget.register(ShowHide);
})();
