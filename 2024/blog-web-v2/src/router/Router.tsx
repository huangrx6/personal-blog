import React, {ReactElement} from 'react';
import Home from "../page/Home";
import BlogArticleCategory from "../page/ArticleCategory/BlogArticleCategory";
import BlogArticle from "../page/Article/BlogArticle";
import Daily from "../page/Daily";
import About from "../page/About";

interface Route {
    path: string;
    element: ReactElement;
    children?: Route[];
}

const loadingComponent = (component: React.ReactElement) => {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            {component}
        </React.Suspense>
    );
}

const routers: Route[] = [
    {
        path: "/",
        element: loadingComponent(<Home/>)
    },
    {
        path: '/blogs/article/:id',
        element: loadingComponent(<BlogArticle/>)
    },
    {
        path: '/blogs/category/:category',
        element: loadingComponent(<BlogArticleCategory/>)
    },
    {
        path: '/daily',
        element: loadingComponent(<Daily/>)
    },
    {
        path: '/about',
        element: loadingComponent(<About/>)
    }
]

export default routers;
