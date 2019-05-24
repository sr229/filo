import React from 'react'
import { Segment, Accordion, Icon } from 'semantic-ui-react'
import ManageDisabled from './ManageDisabled'

export default ({
  disabledHosts,
  disabledOnChange,
}) => {
  return (
    <Segment attached>
      <Accordion>
        <Accordion.Title>
          <Icon name="dropdown" />
          Manage disabled sites
        </Accordion.Title>
        <Accordion.Content>
          <ManageDisabled disabledHosts={disabledHosts} onChange={disabledOnChange} />
        </Accordion.Content>
      </Accordion>
    </Segment>
  )
}
