import axios from '@/plugins/axios'

export function login(loginForm) {
	return axios({
		url: 'login',
		method: 'POST',
		data: {
			...loginForm
		}
	})
}
export function register(addForm){
	return axios({
		url:'register',
		method:'post',
		data:{
			...addForm
		}
	})
}
