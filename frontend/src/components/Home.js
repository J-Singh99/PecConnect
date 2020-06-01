import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Header from './Header';
const HomeContent = (props) => {
  return (
    <React.Fragment>
      <Header/>
      <Container>
        <Box>
          <h1>Welcome to College++</h1>
        </Box>
      </Container>
    </React.Fragment>
    
  );
}

export default HomeContent;