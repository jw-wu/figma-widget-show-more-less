const { widget } = figma
const { AutoLayout, Text, useSyncedState, useWidgetId } = widget


export type FigmaLayerNode =
  FrameNode | ComponentSetNode | ComponentNode | InstanceNode | GroupNode | SectionNode |
  RectangleNode | EllipseNode | PolygonNode | StarNode | VectorNode | TextNode | BooleanOperationNode;
export const isFigmaLayer = (node: SceneNode): node is FigmaLayerNode => (
  node.type === "FRAME" ||
  node.type === "COMPONENT_SET" ||
  node.type === "COMPONENT" ||
  node.type === "INSTANCE" ||
  node.type === "GROUP" ||
  node.type === "SECTION" ||
  node.type === "RECTANGLE" ||
  node.type === "ELLIPSE" ||
  node.type === "POLYGON" ||
  node.type === "STAR" ||
  node.type === "VECTOR" ||
  node.type === "TEXT" ||
  node.type === "BOOLEAN_OPERATION"
)

function toggleChildrenVisibility(widgetId: string, visible: boolean) {

  const widget = figma.getNodeById(widgetId),
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


function ShowHide() {

  const [ visible, setVisibility ] = useSyncedState('visibility', true),
        [ label, setLabel ] = useSyncedState('label', 'Show less')

  const widgetId = useWidgetId()

  return (
    <AutoLayout
      verticalAlignItems='center'
      padding={{ left: 0, right: 0, top: 4, bottom: 4 }}
      onClick={() => {

        if (visible)
          setLabel('Show less')

        else
          setLabel('Show more')

        toggleChildrenVisibility(widgetId, visible)

        setVisibility(!visible)

      }}
      hoverStyle={{
        fill: '#9747ff',
      }}
    >
      <Text
        fontFamily='Inter'
        fontSize={14}
        fill={'#2196F3'}
        hoverStyle={{
          fill: '#ffffff',
        }}
      >
          {label}
      </Text>
    </AutoLayout>
  )
}

widget.register(ShowHide)
