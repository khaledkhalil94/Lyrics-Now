import React from 'react'

export default ({ lyrics}) => <p dangerouslySetInnerHTML={{__html: lyrics}}></p>