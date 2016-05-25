import fetch from 'isomorphic-fetch';

const resetUser = () => {
	return {
		type: 'RESET_USER'
	}
}

const resetSelect = () => {
	return {
		type: 'RESET_SELECT'
	}
}

const resetActivity = () => {
	return {
		type: 'RESET_ACTIVITY'
	}
}

const resetApp = () => {
	return {
		type: 'RESET_APP'
	}
}

const setAppScreen = (screen) => {
	return {
		type: 'SET_APP_SCREEN',
		screen
	}
}

const getAppScreen = () => {
	return {
		type: 'GET_APP_SCREEN'
	}
}

const changeApiUrl = (activity) => {
	return {
		type: 'CHANGE_API_URL',
		activity
	}
}

const setOptions = (result) => {
	return {
		type: 'GET_OPTIONS',
		options: result
	}
}


const getOptions = () => {
	return (dispatch, getState) => {
		const {user} = getState();
		if(!user){
			return Promise.resolve();
		}
  	return fetch('/api/selectActivity/'+user.user_info.platform+'/'+user.user_info.username+'/'+user.user_info.character_id)
		  .then(resolve => resolve.json())
			.then( json => {
				json.unshift({advisorTypeCategory: "Selecione Uma Atividade", identifier: "", disabled: "disabled"});
				dispatch(setOptions(json));
			}
		)
 }
}

const startLoading = () => {
	return {
		type: 'START_LOADING'
	}
}

const setActivity = (result)  => {
	let lastGist = result[0];
	let activity = {
		identifier: result.display.identifier,
		title: (result.display.hasOwnProperty('advisorTypeCategory'))? result.display.advisorTypeCategory : '',
		name: (result.hasOwnProperty('details') && result.details.hasOwnProperty('activityName')) ? result.details.activityName : '',
		desc: (result.hasOwnProperty('details') && result.details.hasOwnProperty('activityDescription')) ? result.details.activityDescription : '',
		completed: (result.hasOwnProperty('completion') && result.completion.hasOwnProperty('complete')) ? result.completion.complete : '',
		backgroundImg: (result.display.hasOwnProperty('image')) ? 'http://bungie.net' + result.display.image : '',
		icon: (result.display.hasOwnProperty('icon')) ? 'http://bungie.net' + result.display.icon : '',
		modifiers: (result.hasOwnProperty('extended') && result.extended.hasOwnProperty('skullCategories')) ? result.extended.skullCategories : [],
		bosses: (result.hasOwnProperty('bosses')) ? result.bosses : [],
		rewards: (result.hasOwnProperty('rewards')) ? result.rewards : [],
		items: (result.hasOwnProperty('items') && result.display.identifier == "xur") ? result.items : [],
		bounties: (result.hasOwnProperty('bounties')) ? result.bounties : [],
		objectives: (result.hasOwnProperty('objectives')) ? result.objectives : []
	}
	return {
		type: 'SET_ACTIVITY',
		activity: activity
	}
}

const findActivity = () => {
 return (dispatch, getState) => {
   const {select} = getState();
	 const {user} = getState();
	 if(!user || !select){
		 return Promise.resolve();
	 }
	 dispatch(startLoading());
	 return fetch('/api/'+select.activity+'/'+user.user_info.platform+'/'+user.user_info.username+'/'+user.user_info.character_id)
	 .then(response => response.json())
	 .then(json => {
				dispatch(setActivity(json));
			}
		)
 }
}

const setCharacterList = (result) => {
	let character_list = result;
	return {
		type: 'SET_CHARACTER_LIST',
		character_list
	}
}

const setUser = (platform, username) => {
	return {
		type: 'SET_USER',
		user_info: {
			platform,
			username
		}
	}
}

const getCharacterList = () => {
	return (dispatch, getState) => {
		let username = getState().user.user_info.username;
		let platform = getState().user.user_info.platform;
		return fetch('/api/getCharacterList/'+platform+'/'+username)
		.then(response => response.json())
		.then(json => {
				dispatch(setCharacterList(json));
		})
	}
}

const setCharacterId = (character_id) => {
	return {
		type: 'SET_USER_CHARACTER',
		user_info: {
			character_id
		}
	}
}
const getCharacterId = () => {
	return {
		type: 'GET_USER_CHARACTER'
	}
}

export {findActivity, changeApiUrl, getOptions, getCharacterList, setUser, setAppScreen, getAppScreen, setCharacterId, getCharacterId, resetApp, resetUser, resetSelect, resetActivity};
