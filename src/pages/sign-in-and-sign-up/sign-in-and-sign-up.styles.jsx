import styled from 'styled-components';

export const SignInAndSignUpContainer = styled.div`
padding-top:100px;
  width: 850px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  @media screen and (max-width: 800px) {
    padding-top:100px;
    flex-direction: column;
    width: unset;
    align-items: center;
    > *:first-child {
      margin-bottom: 50px;
    }
  }
`;