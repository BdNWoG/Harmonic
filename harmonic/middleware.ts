import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes:["/api/uploadthing"]
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(["/api/uploadthing"]);

// export default clerkMiddleware((auth, request) => {
//     if(!isPublicRoute(request)) {
//         auth().protect();
//     }
// });