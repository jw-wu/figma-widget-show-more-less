const { widget } = figma
const { AutoLayout, Text, Input, useSyncedState } = widget


import * as config from '../config'
import * as validate from '../scripts/validation'


export function inputField (arg: {
  label: string,
  value: string,
  placeholder?: string,
  onClick: Function,
  inputType?: 'hex' | 'percentage' | 'number' | 'string'
}) {

  const [ noError, noErrorDetected ] = useSyncedState(`error-${arg.label}`, true)

  return (
  
    <AutoLayout
      direction='vertical'
      spacing={16}
      padding={{ left: 16, right: 16, top: 0, bottom: 0 }}
      >

      {/* Label */}
      <Text
        fontFamily={config.typography.family}
        fontSize={config.typography.size.medium}
        fontWeight={400}
        fill={config.color.default.secondary}
      >

        {arg.label}

      </Text>


      {/* Input field */}
      <Input
        value={arg.value}
        placeholder={arg.placeholder}
        inputBehavior='wrap'
        fontFamily={config.typography.family}
        fontSize={config.typography.size.large}
        fontWeight={400}
        width={300}
        onTextEditEnd={(e) => {

          let validInput = false,
              parsedInput: string | number = ''

          switch (arg.inputType) {

            case 'hex':
              validInput = validate.hexColor(e.characters)
              parsedInput = e.characters
              break

            case 'percentage':
              validInput = validate.percentage(e.characters)
              if (e.characters.includes('%')) {
                parsedInput = Number(e.characters.replace('%', ''))/100
              } else {
                parsedInput = Number(e.characters)
              }
              break

            case 'number':
              validInput = validate.number(e.characters)
              parsedInput = Number(e.characters)
              break

            default:
              validInput = true
              parsedInput = e.characters

          }

          if (validInput) {
            noErrorDetected(true)
            arg.onClick(parsedInput)
          } else {
            noErrorDetected(false)
          }

        }}
      />

      {/* Error message */}
      <Text
        fontFamily={config.typography.family}
        fontSize={config.typography.size.medium}
        fontWeight={400}
        fill={config.color.error.primary}
        hidden={noError}
      >

        Invalid input detected.

      </Text>

    </AutoLayout>

  )

}