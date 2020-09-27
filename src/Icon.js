import React from 'react'
const requireContext = require.context('./assets/svg', false, /\.svg/)
const requireAll = context => context.keys().map(context)
requireAll(requireContext)

function Icon({icon}) {
  const iconName = `#${icon}`
  return (
    <svg className="svg-icon" aria-hidden="true">
      <use xlinkHref={iconName}></use>
    </svg>
  )
}

export default Icon
