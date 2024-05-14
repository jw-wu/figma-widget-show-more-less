const { widget } = figma
const { AutoLayout, Text, useSyncedState, useWidgetNodeId, usePropertyMenu } = widget


import * as config from './config'
import * as visibility from './scripts/visibility'
import { settingsIcon } from './assets/icon-settings'
import { inputField } from './ui/text-input'
import { divider } from './ui/divider'
import { button } from './ui/button'


function ShowHide() {

  const [ visible, setVisibility ] = useSyncedState('visibility', true),
        [ label, setLabel ] = useSyncedState('label', config.defaultValue.labelTextWhenVisible),
        [ labelTextWhenHidden, setLabelTextWhenHidden ] = useSyncedState('labelTextWhenHidden', config.defaultValue.labelTextWhenHidden),
        [ labelTextWhenVisible, setLabelTextWhenVisible ] = useSyncedState('labelTextWhenVisible', config.defaultValue.labelTextWhenVisible),
        [ labelColor, setLabelColor ] = useSyncedState('labelColor', config.color.brand1.primary),
        [ fontSize, setFontSize ] = useSyncedState('fontSize', config.typography.size.medium),
        [ padding, setPadding ] = useSyncedState('padding', config.defaultValue.padding)

  const [ settingsVisible, setSettingsVisibility ] = useSyncedState('settingsVisible', false),
        [ settingsButtonActive, setSettingsButtonActive ] = useSyncedState('settingsButtonActive', false)


  const widgetId = useWidgetNodeId()

  const settingsButton: WidgetPropertyMenuItem = {
    itemType: 'toggle',
    tooltip: 'Settings',
    propertyName: 'settings',
    isToggled: settingsButtonActive,
    icon: settingsIcon
  }

  usePropertyMenu(
    [
      settingsButton
    ],
    ({ propertyName, propertyValue }) => {
      
      if (settingsVisible) {
        setSettingsVisibility(false)
        setSettingsButtonActive(false)
      } else {
        setSettingsVisibility(true)
        setSettingsButtonActive(true)
      }

    },
  )

  return (
    <AutoLayout
      direction='vertical'
      padding={0}
    >

      {/* Link */}

      <AutoLayout
        verticalAlignItems='center'
        padding={{ left: 0, right: 0, top: padding, bottom: padding }}
        hidden={settingsVisible}
        onClick={async () => {

          setVisibility(!visible)

          if (visible) {
            setLabel(labelTextWhenVisible)
          } else {
            setLabel(labelTextWhenHidden)
          }

          await visibility.toggle(widgetId, visible)

        }}
        hoverStyle={{
          fill: config.color.default.tertiary,
        }}
      >

        <Text
          fontFamily={config.typography.family}
          fontSize={fontSize}
          fill={labelColor}
          hoverStyle={{
            fill: config.color.default.contrast,
          }}
        >
          {label}
        </Text>

      </AutoLayout>


      {/* Settings UI */}

      <AutoLayout
        direction={'vertical'}
        spacing={16}
        padding={{ left: 0, right: 0, top: 16, bottom: 16 }}
        fill={config.color.surface.primary}
        stroke={config.color.divider.secondary}
        cornerRadius={4}
        height={'hug-contents'}
        hidden={!settingsVisible}
      >

        {/* Label when layers are visible */}
        {inputField({
          label: 'Label when layers are visible',
          value: labelTextWhenVisible,
          placeholder: 'Enter label here',
          onClick: setLabelTextWhenVisible
        })}

        {divider({variant: 'secondary'})}

        {/* Label when layers are hidden */}
        {inputField({
          label: 'Label when layers are hidden',
          value: labelTextWhenHidden,
          placeholder: 'Enter label here',
          onClick: setLabelTextWhenHidden
        })}

        {divider({variant: 'secondary'})}

        {/* Font size */}
        {inputField({
          label: 'Font size (px)',
          value: String(fontSize),
          placeholder: String(fontSize),
          onClick: setFontSize,
          inputType: 'number'
        })}

        {divider({variant: 'secondary'})}

        {/* Label color */}
        {inputField({
          label: 'Label color',
          value: labelColor,
          placeholder: config.color.brand1.primary,
          onClick: setLabelColor,
          inputType: 'hex'
        })}

        {divider({variant: 'secondary'})}

        {/* Padding */}
        {inputField({
          label: 'Top and bottom padding',
          value: String(padding),
          placeholder: String(padding),
          onClick: setPadding,
          inputType: 'number'
        })}

        {divider({variant: 'secondary'})}

        {/* Done button */}
        {button({
          label: 'Done',
          onClick: () => {
            setSettingsVisibility(false)
            setSettingsButtonActive(false)
          }
        })}

      </AutoLayout>
   
    </AutoLayout>

  )

}

widget.register(ShowHide)
