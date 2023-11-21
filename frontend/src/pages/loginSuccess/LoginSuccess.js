import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/userActions';

function LoginSuccess() {
    
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { isLoading, isError, userInfo, isSuccess } = useSelector(
        state => state.userLogin
    )
    console.log(userId, 'LoginSuccess.js')
    useEffect(() => {
        const fetchToken = async () => {
            // const response = await loginAction('google', userId);
            const id = { userId };
            dispatch(loginAction('google', id))
        }

        fetchToken();
    }, [])

    return (
        <div>
        {isSuccess ? <Navigate to={'/home'} replace={true} /> : <h3>Yêu cầu bạn hãy đăng nhập</h3>}
    </div>
    )
}

export default LoginSuccess