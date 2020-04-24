import Router from "next/router";
import nextCookie from "next-cookies";
const auth = ctx => {
    const { token } = nextCookie(ctx)

    if (ctx.req && !token) {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
      return
    }

    if (!token) {
      Router.push('/login')
    }

  return "";
};

export default auth;
