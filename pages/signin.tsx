import Link from 'next/link'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Form from '../components/Form'

const SignIn: React.FC = () => {
  return (
    <Layout>
      <Header title="ChatFriends - SignIn" landing />
      <Form type="SignIn" />
    </Layout>
  )
}

export default SignIn
