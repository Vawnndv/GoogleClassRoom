import { useEffect, useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../../redux/actions/authActions'

function LoginSuccess() {
  const { userId, tokenLogin, provider } = useParams()
  const initialized = useRef(false)

  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    state => state.userLogin
  )
  useEffect(() => {
    if (!initialized.current) {
        initialized.current = true
        const fetchToken = async () => {
        const data = { userId, tokenLogin }
        dispatch(loginAction(provider, data))
        }

        fetchToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [])

  return (
    <div>
      {isSuccess ? <Navigate to={'/home'} replace={true} /> : <h3>Yêu cầu bạn hãy đăng nhập</h3>}
    </div>
  )
}

export default LoginSuccess