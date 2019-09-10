export const consts = {
	PAGE_SIZE: 20,
	MES_HISTORY_SIZE: 10,
	CHAT: 'CHAT',
	CALL: 'CALL',

	USER_INFO_TAB: 'User Info',
	CALL_TAB: 'Call with user',
	CALL_HISTORY_TAB: 'Call history',

	THREAD: {
		IS_CLIENT: 0,
		IS_PRO: 1
	}
};

export const EN = 'en-us',
	RU = 'ru',
	IT = 'it-it',
	ES = 'es-es',
	PL = 'pl',
	AE = 'ar-ae',
	PT = 'pt-br',
	DE = 'de-de';

export const langs = {
	[EN]: {
		code: 'en',
		lang: EN,
		name: 'eng',
		emoji: '🇬🇧'
	},
	[RU]: {
		code: 'ru',
		lang: RU,
		name: 'рус',
		emoji: '🇷🇺'
	},
	[IT]: {
		code: 'it',
		lang: IT,
		name: 'ita',
		emoji: '🇮🇹'
	},
	[ES]: {
		code: 'es',
		lang: ES,
		name: 'esp',
		emoji: '🇪🇸'
	},
	[PL]: {
		code: 'pl',
		lang: PL,
		name: 'pol',
		emoji: '🇵🇱'
	},
	[AE]: {
		code: 'ar',
		lang: AE,
		name: 'ar',
		emoji: '🇦🇪'
	},
	[PT]: {
		code: 'pt',
		lang: PT,
		name: 'pt',
		emoji: '🇧🇷'
	},
	[DE]: {
		code: 'de',
		lang: DE,
		name: 'de',
		emoji: '🇩🇪'
	}
};

export const labelsGA = {
	downloadAppClick: 'Clicked Download App'
};

export const activityTypes = {
	c: 'RECEIVED CALL',
	mc: 'MISSED CALL',
	fc: 'FAILED CALL',
	im: 'READ message',
	uim: 'NEW message',
	om: 'OUTGOING message',
	s: 'SHORTLISTED'
};