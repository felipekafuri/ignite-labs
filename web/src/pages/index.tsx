import { getAccessToken, getSession, useUser } from '@auth0/nextjs-auth0'
import type { GetServerSideProps, NextPage } from 'next'

const Home: NextPage = () => {
  return null
}

export default Home

export const getServerSideProps: GetServerSideProps = async({req, res}) => {
  const session = getSession(req, res)
  const a = getAccessToken(req,res)
  console.log(a.then(a => console.log(a.accessToken)))
  if(!session){
    return{
      redirect: {
        destination: '/api/auth/login',
        permanent: false
      }
    }
  }else{
    return {
      redirect: {
        destination: '/app',
        permanent: false
      }
    }
  }
}