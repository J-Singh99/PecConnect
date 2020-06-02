import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Header from './Header';
import jwt_decode from 'jwt-decode';
const HomeContent = (props) => {
    
  let token = localStorage.getItem('react_usertoken');
  console.log(token)
  let details = ''
  if (token!=null){
    details = jwt_decode(token)['identity'];
    console.log(details);
  }
  let result = `You are ${details.username} with email: ${details.email}`;
  return (
    <React.Fragment>
      <Header/>
      <Container>
        <Box>
          <h1>Welcome to College++</h1>
          <p>
            {result}
          </p>
        </Box>
      </Container>
    </React.Fragment>
    
  );
}

export default HomeContent;