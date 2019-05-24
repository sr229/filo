import React from 'react'
import { Button, Container } from 'semantic-ui-react'

export default () => {
  return (
    <Container className="footer" textAlign="right">
      <Button
        basic
        color="blue"
        content="Switch Host"
        href="setup.html"
        target="_blank"
        icon="power cord"
      />
      <Button
        basic
        color="pink"
        href="https://paypal.me/chinodesuuu"
        target="_blank"
        content="Donate!"
        icon="heart outline"
      />
    </Container>
  )
}
