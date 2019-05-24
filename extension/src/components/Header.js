import React from 'react'
import { Grid, Container, Checkbox } from 'semantic-ui-react'

export default ({ enabled, onChange }) => {
  return (
    <Container className="header">
      <Grid>
        <Grid.Column width={12}>
          <h2 class="product">Filo <p class="indicator">Alpha</p></h2>  
        </Grid.Column>
        <Grid.Column width={4} verticalAlign="middle" textAlign="right">
          {onChange && <Checkbox toggle checked={enabled} onChange={onChange} />}
        </Grid.Column>
      </Grid>
    </Container>
  )
}
