const { widget } = figma
const { AutoLayout, Text } = widget


import * as config from '../config'


export function button (arg: {
  label: string,
  onClick: Function
}) {

  return (
  
    <AutoLayout
      direction='vertical'
      spacing={8}
      padding={{ left: 16, right: 16, top: 0, bottom: 0 }}
      width={'fill-parent'}
    >

      {/* Button */}

      <AutoLayout
        direction={'vertical'}
        horizontalAlignItems={'center'}
        spacing={8}
        padding={{ left: 16, right: 16, top: 16, bottom: 16 }}
        fill={config.color.default.primary}
        cornerRadius={4}
        height={'hug-contents'}
        width={'fill-parent'}
        onClick={() => {
          arg.onClick(false)
        }}
      >

        <Text
          fontFamily={config.typography.family}
          fontSize={config.typography.size.medium}
          fill={config.color.default.contrast}
        >
          {arg.label}
        </Text>

      </AutoLayout>
    
    </AutoLayout>

  )

}