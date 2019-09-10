import { h } from 'preact';
import Prismic from 'prismic-javascript';
import { route } from 'preact-router';
import { EN, langs } from './consts';
import { routes } from '../components/app';

export function compareUrlLocale(props){
	const urlLocale = props.path.toString().split('/')[1];
	let _lang = '';

	return langs[props.locale].code === urlLocale ? props.locale : (
		Object.keys(langs).some(el => (langs[el].code === urlLocale) ? (_lang = el, true) : false) ?
			(props.changeLocale(_lang), _lang) : (props.changeLocale(EN), EN)
	);
}
export function getPage(props ={}, urlEng){
	const conditions = props.tag ? [
		Prismic.Predicates.at('document.type', props.type),
		Prismic.Predicates.at('document.tags', [props.tag])
	] : Prismic.Predicates.at('document.type', props.type);

	const lang = compareUrlLocale(props);

	return props.prismicCtx && props.prismicCtx.api.query(
		conditions,
		{ lang }
	).then((response, err) => {
		if (response.results_size > 0){
			const page = response.results[0];
			props.changeLocaleLangs(page.alternate_languages);
			return page;
		}
		props.changeLocale();
		route(urlEng ? urlEng : `/${/\/(.+)/.exec(props.path.substring(1))[1]}`, true);
		return null;
        
	}).catch(e => {
		route(routes.HOME, true);
		return null;
	});
}

export function processPostThumbnailData(rawPost ={}){
	const { data={} } = rawPost;
	let newPostData = {};
	try {
		newPostData = {
			id: rawPost.uid,
			title: data.title[0].text,
			date: data.date,
			link: `/blog/${rawPost.uid}`,
			img: data.thumbnail.url
		};
	}
	catch (e){
		
		newPostData = null;
	}
	if (typeof rawPost.tags !== 'undefined' && rawPost.tags[0] && rawPost.tags[0] === 'featured') {
		newPostData.isFeatured = true;
	}
	return newPostData;
}

export function processRecentPosts(rawPosts){
	return rawPosts.map((rawPost) => processPostThumbnailData(rawPost));
}

function compliteTextWithTags(tags, text){
	let nodes = [];
	(tags && tags.length) && tags.forEach(el => {
		switch (el.type){
			case 'hyperlink':
				nodes.push(text.substring(0, el.start));
				nodes.push(<a href={el.data.url} target="_blank" rel="noopener noreferrer">{text.substring(el.start, el.end)}</a>);
				nodes.push(text.substring(el.end));
				break;
			case 'strong':
				nodes.push(text.substring(0, el.start));
				nodes.push(<strong>{text.substring(el.start, el.end)}</strong>);
				nodes.push(text.substring(el.end));
				break;
			default:
				nodes.push(text);
		}
	});

	return nodes.length ? nodes : text;
}

function processContent(content, tags){
	return compliteTextWithTags(tags, content);
}
function processTagsInText(postData){
	return compliteTextWithTags(postData.spans, postData.text);
}

export function processPostText(postData){
	let prevType = null,
		tmpContent = [],
		_content = null,
		isForClear = false;
    
	const textLen = postData.primary.text.length;

	let serialiseText = (type, content, tags, i) => {
		isForClear && (
			tmpContent = [],
			_content = null,
			isForClear = false
		);
		isForClear = ( prevType === 'o-list-item' && type !== 'o-list-item' );
		isForClear && ( _content = (<ol>{[...tmpContent]}</ol>) );
		prevType = type;

		switch (type) {
			case 'list-item':
				return [_content, <li>{content}</li>];
			case 'o-list-item':
				return (i + 1 === textLen) ? (
					<ol>{[...tmpContent, <li key={i}>{content}</li>]}</ol>
				) : (
					tmpContent.push(<li key={i}>{content}</li>), null
				);
			case 'heading2':
				return [_content, <h2>{content}</h2>];
			case 'heading3':
				return [_content, <h3>{content}</h3>];
			default:
				return [_content, <p>{processContent(content, tags)}</p>];
		}
	};

	return postData.primary.text.map((text, i) => serialiseText(text.type, text.text, text.spans, i));
}


export function processPostImage(postData ={}){
	let imageData = {
		url: postData.primary.image.url
	};
	if (postData.primary.caption.length > 0) {
		imageData.title = postData.primary.caption[0].text;
	}
	return imageData;
}

export function processPostQuote(postData){
	try {
		return {
			text: postData.primary.quote[0].text,
			author: postData.primary.author[0] ? postData.primary.author[0].text : ''
		};
	}
	catch (e){
		return {
			text: '',
			author: ''
		};
	}
}
export function processAuthorInfo(postData){
	try {
		return {
			title: postData.primary.section_title[0].text,
			aName: postData.primary.author_name[0].text,
			aDescription: postData.primary.author_description[0].text,
			aAvatar: postData.primary.author_avatar.url
		};
	}
	catch (e){
		return null;
	}
}

export function processBlogBtn(postData){
	try {
		let link = postData.primary.button_link;
		return {
			text: postData.primary.button_text[0].text,
			link,
			isExternal: (link.indexOf('http://') === 0) || (link.indexOf('https://') === 0)
		};
	}
	catch (e){
		
		return {};
	}
}

const processDate = (date, locale = 'en-us') => {
	let dateObj = new Date(date);
    
	return dateObj.toLocaleString(locale, { month: 'long', day: 'numeric', year: 'numeric' });

};
export function processPostData(rawData ={}, locale){
	try {
		return {
			title: rawData.title[0].text,
			date: processDate(rawData.date, locale),
			body: rawData.body
		};
	}
	catch (e){
		
		return {
			title: '',
			date: null,
			body: []
		};
	}
}
const getExperts = (data) => {
	let side1 = [],
		side2 = [];
	try {
		data.featured_experts.forEach((expert, index) => {
			let expertData = {
				id: parseInt(expert.id[0].text, 10),
				name: expert.name[0].text,
				img: expert.photo.url,
				serviceName: expert.proffesion[0].text,
				price: expert.price[0].text,
				time: 'min'
			};
			if (expert.photo.dimensions.height < 600) {
				expertData.isSmall = true;
			}
			if (index <= 1) {
				side1.push(expertData);
			}
			else {
				side2.push(expertData);
			}
		});
    
		side2.splice(1, 0 , {
			id: 4,
			isSmall: true,
			isStat: true,
			minutes: data.amount_of_minutes
		});
		side2 = [[side2[0], side2[1]],[side2[2], side2[3]]];
		return  {
			side1, side2
		};
	}
	catch (e){
		
		return { side1: [], side2: [] };
	}
};

const getServices = (data) => {
	try {
		return data.services.map((service) => ({
			link: service.link[0] ? service.link[0].text : '',
			earnBtnText: service.earning_btn_text,
			linkLearn: service.link_learning[0] ? service.link_learning[0].text : '',
			learnBtnText: service.learning_btn_text,
			background: service.image.url,
			serviceName: service.title1[0].text,
			description: service.description[0] && service.description[0].text
		}));
	}
	catch (e){
		
		return [];
	}
    
};

const getFAQs = (faqData) => {
	let allFaqs = {},
		getFAQ = (name) => {
			try {
				return faqData[name].map((faq) => ({
					question: faq.question[0].text,
					answer: processTagsInText(faq.answer[0])
				}));
			}
			catch (e){
				
				return [];
			}
		};

	allFaqs.generalQuestions = getFAQ('general_faqs');
	allFaqs.customersQuestions = getFAQ('customer_faqs');
	allFaqs.expertsQuestions = getFAQ('experts_faqs');
	allFaqs.paymentsQuestions = getFAQ('payments_faqs');

	return (allFaqs.generalQuestions.length === 0
        && allFaqs.customersQuestions.length === 0
        && allFaqs.expertsQuestions.length === 0
        && allFaqs.paymentsQuestions.length === 0 ) ? null : allFaqs;
};

export function processHomepageData(data = {}){
	let processedData = {};

	try {
		processedData.mainSection = {
			title: data.title[0].text,
			subTitle: data.sub_title[0].text,
			typedWords: data.typed_words[0].text,
			btnText: data.buttom_title[0] && data.buttom_title[0].text,
			btnLink: data.button_link.url
		};
	}
	catch (e){
		
		processedData.mainSection = null;
	}

	processedData.experts = getExperts(data);

	try {
		processedData.howItWorks = {
			title: data.how_it_works_title[0].text,
			text: data.how_it_works[0].text,
			videoID: data.how_it_works_video.video_id,
			btnText: data.buttom_title[0] && data.buttom_title[0].text,
			btnLink: data.button_link.url
		};
	}
	catch (e){
		
		processedData.howItWorks = null;
	}
    
	try {
		processedData.servicesTitle = data.featured_services_title[0].text;
	}
	catch (e){
		
		processedData.servicesTitle = '';
	}
    
	processedData.services = getServices(data);

	try {
		processedData.app = {
			title: data.app_title[0].text,
			text: data.app_text[0] ? data.app_text[0].text : '',
			img: data.app_image.url,
			btnLink: data.button_link.url
		};
	}
	catch (e){
		
		processedData.app = null;
	}
    

	processedData.faqs = getFAQs(data);

	try {
		processedData.becomePro = {
			title: data.earn_more_title[0].text,
			text: data.earn_more_text[0].text,
			btnText: data.buttom_title[0] && data.buttom_title[0].text,
			btnLink: data.button_link.url
		};
	}
	catch (e){
		
		processedData.becomePro = null;
	}

	return processedData;
}

const getSteps = (data) => {
	try {
		return data.work_steps.map((step) => ({
			id: step.id[0].text,
			title: step.step_title[0].text,
			text: step.step_text[0].text,
			icon: step.step_icon.url
		}));
	}
	catch (e){
		
		return [];
	}
    
};

const getReasons = (data) => {
	try {
		return data.reasons.map((reason) => ({
			icon: reason.reason_icon.url,
			title: reason.reason_title[0].text,
			text: reason.reason_text[0].text
		}));
	}
	catch (e){
		
		return [];
	}
};

const getReviews = (data) => {
	try {
		return data.reviews.map((review) => ({
			avatar: review.avatar.url,
			name: review.name[0].text,
			title: review.review_title[0].text,
			text: review.review_text[0].text
		}));
	}
	catch (e){
		
		return [];
	}
};

const getInfo = (data) => {
	try {
		return data.info_section.map((infotext) => ({
			id: infotext.section_id,
			img: infotext.section_image.url,
			img_height: infotext.section_image.dimensions.height,
			img_width: infotext.section_image.dimensions.width,
			title: infotext.section_title[0].text,
			text: infotext.section_text[0].text,
			right: infotext.is_right_position,
			animated: infotext.is_animated
		}));
	}
	catch (e){
		
		return [];
	}
};

export function processTextPageData(data){
	let processedData = {};
	let btnLink, btnText;

	try {
		btnLink = data.button_link.url;
		btnText = data.button_title[0] && data.button_title[0].text;
	}
	catch (e){
		
		btnLink = '';
		btnText = '';
	}
	//processedData = { ...data };
	processedData.downloadBtn = {
		btnLink,
		btnText
	};

	try {
		processedData.becomePro = {
			img: data.earn_money_image.url,
			title: data.earn_money_title[0].text,
			emphasized: data.emphasize_title_part[0].text,
			text: data.earn_money_text[0].text
		};
	}
	catch (e){
		
		processedData.becomePro = {
			img: '',
			title: '',
			emphasized: '',
			text: ''
		};
	}
    

	processedData.info = getInfo(data);
	processedData.steps = getSteps(data);
	processedData.reasons = getReasons(data);
	//processedData.reviews = getReviews(data);

	try {
		processedData.titles = {
			how_works_title: data.how_works_title[0].text,
			choose_us_title: data.choose_us_title[0].text
		};
	}
	catch (e){
		
		processedData.titles = {
			how_works_title: '',
			choose_us_title: ''
		};
	}
    
	try {
		processedData.app = {
			title: data.app_title[0] ? data.app_title[0].text : '',
			text: data.app_text[0] ? data.app_text[0].text : '',
			img: data.app_image.url,
			btnLink
		};
	}
	catch (e){
		
		processedData.app = {
			title: '',
			text: '',
			img: ''
		};
	}
    
	return processedData;
}
export function processReviewsData(data){
	return getReviews(data);
}

export function processFAQPageData(data){
	let processedData = {};

	processedData.faqs = getFAQs(data);

	try {
		processedData.mainQuestion = {
			question: data.telmie_question[0].text,
			answer: processTagsInText(data.telmie_answer[0])
		};
	}
	catch (e){
		
	}

	return processedData;
}

export function processGlobalMessage(data){
	let mes = '';
	try {
		mes = processTagsInText(data.message[0]);
	}
	catch (e){
		
		return '';
	}
	return mes;
}


// WEBPACK FOOTER //
// ./utils/prismic-middleware.js