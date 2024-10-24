"use client"
import LoadingOverlay from '@/components/Loading';
import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const ApiDocs = () => {
    const [spec, setSpec] = useState(null);

    useEffect(() => {
        const fetchSpec = async () => {
            const response = await fetch('/mechan.json');
            const data = await response.json();
            setSpec(data);
        };

        fetchSpec();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            {spec ? (
                <SwaggerUI spec={spec} />
            ) : (
                <LoadingOverlay />
            )}
        </div>
    );
};

export default ApiDocs;
