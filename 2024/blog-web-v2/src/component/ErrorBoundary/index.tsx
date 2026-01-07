import React, { ErrorInfo, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
    const navigate = useNavigate();
    const [hasError, setHasError] = React.useState(false);

    useEffect(() => {
        if (hasError) {
            // 在发生异常后重定向到404页面或其他页面
            navigate('/404');
        }
    }, [hasError, navigate]);

    const componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
        // 可以在这里进行错误日志记录或其他操作
        console.error(error, errorInfo);
        setHasError(true);
    };

    if (hasError) {
        return null; // 渲染为空或其他错误页面
    }

    return <>{children}</>;
};

export default ErrorBoundary;