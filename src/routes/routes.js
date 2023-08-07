export const pages = {
    signIn: '/login',
    signUp: '/cadastro',
    home: '/home',
    urlItem: '/urlId/',
    ranking: '/',
    redirect: '/redirect/'
}

const API_URL = 'http://localhost:5000';
// const API_URL = `${process.env.REACT_APP_API_URL}`

export const requisitions = {
    postSignUp: API_URL + '/signup',
    postSignIn: API_URL + '/signin',
    getUserMe: API_URL + '/users/me',
    getUrlById: API_URL + '/urls/',
    deleteUrlById: API_URL + '/urls/',
    postUrl: API_URL + '/urls/shorten',
    redirectUrl: API_URL + '/urls/open/',
    logout: API_URL + '/logout',
    getRanking: API_URL + '/ranking'

}

export function headersAuth(token) {
    if (!token && localStorage.user) {
        const user = JSON.parse(localStorage.user);
        token = user.token;
    }

    return {headers: {
        'Authorization': `Bearer ${token}`
    }}
}