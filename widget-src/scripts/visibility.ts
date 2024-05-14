export type FigmaLayerNode =
  FrameNode | ComponentSetNode | ComponentNode | InstanceNode | GroupNode | SectionNode |
  RectangleNode | EllipseNode | PolygonNode | StarNode | VectorNode | TextNode | BooleanOperationNode

export const isFigmaLayer = (node: SceneNode): node is FigmaLayerNode => (
  node.type === 'FRAME' ||
  node.type === 'COMPONENT_SET' ||
  node.type === 'COMPONENT' ||
  node.type === 'INSTANCE' ||
  node.type === 'GROUP' ||
  node.type === 'SECTION' ||
  node.type === 'RECTANGLE' ||
  node.type === 'ELLIPSE' ||
  node.type === 'POLYGON' ||
  node.type === 'STAR' ||
  node.type === 'VECTOR' ||
  node.type === 'TEXT' ||
  node.type === 'BOOLEAN_OPERATION'
)


export async function toggle(widgetId: string, visible: boolean) {

  const widget = await figma.getNodeByIdAsync(widgetId),
        parent = widget?.parent,
        children = parent?.children

  if (children) {

    for (let child of children) {
      showHideLayer(child, visible)
    }

  }

}


function showHideLayer(node: SceneNode, visible: boolean) {

  if (isFigmaLayer(node)) {

    if (node.type === 'SECTION') {

      let children = node.children
      
      for (let child of children) {
        showHideLayer(child, visible)
      }

    }

    else
      node.visible = visible

  }

}