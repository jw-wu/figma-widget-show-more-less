const { widget } = figma
const { Line } = widget


import * as config from '../config'


export function divider (arg: {
  variant: 'primary' | 'secondary'
}) {

  return (

    <Line
      length={'fill-parent'}
      strokeWidth={1}
      stroke={config.color.divider[arg.variant]}
    />

  )

}