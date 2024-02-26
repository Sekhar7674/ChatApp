import cookie from "js-cookie";
import Router from "next/router";

export const handleLogin = (t, routeNext) => {
	cookie.set("user_token", t);
	if (routeNext && routeNext.query && routeNext.query.next) {
		Router.push(routeNext.query.next);
	} else {
		Router.push("/");
	}
};

export const handleLogout = () => {
	cookie.remove("user_token");
	localStorage.clear();
	Router.push("/");
};

export const destroyCookie = () => {
	cookie.remove("user_token");
	Router.reload("/");
};

export const redirectUser = (ctx, location) => {
	if (ctx.req) {
		ctx.res.writeHead(302, { Location: location });
		ctx.res.end();
	} else {
		Router.push({ pathname: location, query: { next: ctx.pathname } });
	}
};

export const slugify = (string) => {
	return string
		.toString()
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
};
