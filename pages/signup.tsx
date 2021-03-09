import Link from 'next/link'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Form from '../components/Form'

const SignUp: React.FC = () => {
  return (
    <Layout>
      <Header title="ChatFriends - SignUp" landing />
      <Form type="SignUp" />
    </Layout>
  )
}

export default SignUp
