class Page {
	static async fetch(pageName, pageUrl){
		var pageRawData = await fetch(pageUrl);
		var pageData = await pageRawData.text();
		return new Page(pageName, pageData);
	}
	constructor(pageName, pageData){
		this.name = pageName;
		this.content = pageData;
	}
}

class Document {
	constructor(div, fpn, pages){
		this.div = div;
		this.pages = pages;
		var idx = pages.findIndex(p => p.name == fpn);
		if(idx == -1){
			throw new Error('The page you requested cannot be accessed.');
		}else{
			this.div.innerHTML = pages[idx].content;
		}
	}
	goto(pageName){
		var idx = this.pages.findIndex(p => p.name == pageName);
		if(idx == -1){
			throw new Error('The page you requested cannot be accessed.');
		}else{
			this.div.innerHTML = this.pages[idx].content;
		}
	}
}
